import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
} from "@mui/material";
import { Bath, Fan, Tv, Wifi, Wine, X } from "lucide-react";
import React from "react";
import { FaRegIdBadge } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { bookingRequest } from "../../../api/auth/booking.request";
import { useFormik } from "formik";
import * as Yup from "yup";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: {
    type: string;
    price: number;
    images: string[];
    capacity: number;
    amenities: string[];
    description: string;
    isAvailable: boolean;
    number: string;
    _id: string;
  };
  hotelName: string;
  checkIn: string;
  checkOut: string;
}

const AmenityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "WiFi":
      return <Wifi />;
    case "Tivi":
      return <Tv />;
    case "Bồn tắm":
      return <Bath />;
    case "Mini Bar":
      return <Wine />;
    case "Điều hòa":
      return <Fan />;
    case "Tủ lạnh":
      return <FaRegIdBadge />;
    default:
      return null;
  }
};

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  room,
  hotelName,
  checkIn,
  checkOut,
}) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Vui lòng nhập họ tên"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
      .min(10, "Số điện thoại phải có ít nhất 10 số")
      .required("Vui lòng nhập số điện thoại"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    notes: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      notes: "",
    },
    validationSchema,
    onSubmit: handleBooking,
  });

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return 0;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  async function handleBooking(values: any) {
    const bookingData = {
      roomId: room._id,
      checkIn: checkIn,
      checkOut: checkOut,
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      notes: values.notes,
    };

    try {
      const response = await bookingRequest(bookingData);
      onClose();
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Đặt phòng thành công!",
          text: `Bạn đã đặt phòng ${room.type} tại ${hotelName} từ ${formatDate(
            checkIn
          )} đến ${formatDate(checkOut)}.`,
          confirmButtonText: "OK",
        }).then(() => onClose());
        navigate(`/MyBookings`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Đặt phòng thất bại!",
          text: "Vui lòng thử lại.",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      onClose();
      console.error("Lỗi đặt phòng:", error);
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra!",
        text: "Vui lòng thử lại sau.",
        confirmButtonText: "OK",
      });
    }
  }

  const nights = calculateNights(checkIn, checkOut);
  const totalPrice = room.price * nights;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Thông tin đặt phòng
          </Typography>
          <Button onClick={onClose} size="small">
            <X size={20} />
          </Button>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr " }}
          gap={4}
        >
          <Box>
            <img
              src={room.images[0]}
              alt={room.type}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            <Box>
              <img
                src={room.images[1]}
                alt={room.type}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "5px",
                  marginTop: "10px",
                }}
              />
            </Box>
          </Box>

          <Box component="form" onSubmit={formik.handleSubmit}>
            <Typography variant="subtitle1" fontWeight="bold">
              Thông tin người đặt phòng
            </Typography>
            
            <TextField
              fullWidth
              id="fullName"
              name="fullName"
              label="Họ và tên"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
              margin="normal"
            />

            <TextField
              fullWidth
              id="phoneNumber"
              name="phoneNumber"
              label="Số điện thoại"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              margin="normal"
            />

            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
            />

            <TextField
              fullWidth
              id="notes"
              name="notes"
              label="Ghi chú"
              multiline
              rows={2}
              value={formik.values.notes}
              onChange={formik.handleChange}
              error={formik.touched.notes && Boolean(formik.errors.notes)}
              helperText={formik.touched.notes && formik.errors.notes}
              margin="normal"
            />

            <Typography variant="subtitle1" fontWeight="bold" mt={2}>
              {hotelName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {room.type}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Số phòng: {room.number}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {room.description}
            </Typography>
            
            <Box display="flex" gap={1} flexWrap="wrap" mb={2} mt={1}>
              {Array.isArray(room.amenities) ? (
                room.amenities.map((amenity) => (
                  <Chip
                    key={amenity}
                    icon={<AmenityIcon type={amenity} />}
                    label={amenity}
                    variant="outlined"
                    sx={{ m: 0.3 }}
                    size="small"
                  />
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Không có tiện nghi nào.
                </Typography>
              )}
            </Box>

            <Box mt={3} borderTop={1} borderColor="divider" pt={2}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Giá phòng mỗi đêm</Typography>
                <Typography>
                  {room.price.toLocaleString("vi-VN")} VND
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography>Tổng cộng ({nights} đêm)</Typography>
                <Typography variant="h6" fontWeight="bold">
                  {totalPrice.toLocaleString("vi-VN")} VND
                </Typography>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: "25px" }}
              >
                ĐẶT NGAY
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;