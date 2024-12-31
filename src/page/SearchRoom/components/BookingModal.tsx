import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Bath, Fan, Tv, Wifi, Wine, X } from "lucide-react";
import React from "react";
import { FaRegIdBadge } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { bookingRequest } from "../../../api/auth/booking.request";
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

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return 0;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleBooking = async () => {
    const bookingData = {
      roomId: room._id,
      checkIn: checkIn,
      checkOut: checkOut,
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
  };

  const nights = calculateNights(checkIn, checkOut);
  const totalPrice = room.price * nights;

  // Format dates for display
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
          gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
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

          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Thông tin phòng
            </Typography>
            <Typography variant="body2" color="textSecondary" mt={1}>
              {formatDate(checkIn)} - {formatDate(checkOut)} ({nights} đêm)
            </Typography>
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
                variant="contained"
                fullWidth
                size="large"
                onClick={handleBooking}
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
