import React, { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Chip,
  Grid,
  Paper,
  IconButton,
  styled,
  Button,
} from "@mui/material";
import { Wifi, Tv, Bath, Wine, Fan } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { Room } from "../../../Types";
import { FaRegIdBadge } from "react-icons/fa";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import BookingModal from "../../SearchRoom/components/BookingModal";
import "dayjs/locale/vi";
import ImageModal from "../../PhotoLibrary/ImageModal";
dayjs.locale("vi");

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 1200,
  marginTop: "30px",
  backgroundColor: "#fff",
  borderRadius: theme.spacing(2),
  boxShadow: "0 5px 10px rgba(0,0,0,0.12)",
}));

const ImageContainer = styled(Box)({
  position: "relative",
  height: 400,
  overflow: "hidden",
});

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

interface BookingFormValues {
  checkIn: string;
  checkOut: string;
}

const RoomDetailComponent: React.FC<{ room: Room | null }> = ({ room }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDates, setBookingDates] = useState<BookingFormValues>({
    checkIn: "",
    checkOut: "",
  });
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const validateDates = (values: BookingFormValues) => {
    const errors: Partial<BookingFormValues> = {};
    const today = dayjs();
    const checkInDate = dayjs(values.checkIn);
    const checkOutDate = dayjs(values.checkOut);

    if (!values.checkIn) {
      errors.checkIn = "Vui lòng chọn ngày nhận phòng";
    } else if (checkInDate.isBefore(today, "day")) {
      errors.checkIn = "Ngày nhận phòng không thể là ngày trong quá khứ";
    }

    if (!values.checkOut) {
      errors.checkOut = "Vui lòng chọn ngày trả phòng";
    } else if (checkOutDate.isBefore(checkInDate)) {
      errors.checkOut = "Ngày trả phòng phải sau ngày nhận phòng";
    }

    return errors;
  };

  const handleSubmit = (values: BookingFormValues) => {
    if (!user) {
      navigate("/Login");
      return;
    }

    // Kiểm tra giá trị thực tế của values.checkIn và values.checkOut
    if (!values.checkIn || !values.checkOut) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng nhập đầy đủ ngày nhận phòng và ngày trả phòng",
      });
      return;
    }

    setBookingDates(values);
    setIsModalOpen(true);
  };
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };
  if (!room) {
    return (
      <Typography variant="h6" color="textSecondary" align="center">
        Đang tải dữ liệu phòng...
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h5" align="center" mb={4} color="#8B7355"mt={12}>
        CHI TIẾT  PHÒNG
      </Typography>
      <Box mt={-4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
        >
          Quay lại
        </Button>
      </Box>
      <StyledCard>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ImageContainer>
              <CardMedia
                component="img"
                height="400"
                image={room.images?.[0] || "/placeholder-image.jpg"}
                alt={room.type || "Room Image"}
                sx={{
                  objectFit: "cover",
                  height: "100%",
                  borderRadius: 2,
                }}
              />
            </ImageContainer>
            <Box display="flex" gap={2} padding={2}>
              {Array.isArray(room.images) && room.images.length > 0 ? (
                room.images.map((image, index) => (
                  <IconButton
                    onClick={() => handleImageClick(image)}
                    key={index}
                    sx={{
                      width: 80,
                      height: 80,
                      p: 0,
                      overflow: "hidden",
                      borderRadius: 1,
                    }}
                  >
                    <img
                      src={image}
                      alt={`Room view ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </IconButton>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Không có ảnh nào để hiển thị.
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box p={4}>
              <Typography variant="h4" component="h1" gutterBottom>
                {room.type}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                Phòng {room.number}
              </Typography>
              <Typography variant="h5" color="error" gutterBottom>
                {formatCurrency(room.price)} /Đêm
              </Typography>

              <Box my={3}>
                <Typography variant="body1" paragraph>
                  {room.description}
                </Typography>
              </Box>

              <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Sức chứa: {room.capacity} người
                </Typography>
              </Paper>

              <Typography variant="h6" gutterBottom>
                Tiện nghi
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
                {Array.isArray(room.amenities) ? (
                  room.amenities.map((amenity) => (
                    <Chip
                      key={amenity}
                      icon={<AmenityIcon type={amenity} />}
                      label={amenity}
                      variant="outlined"
                      sx={{ m: 0.5 }}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    Không có tiện nghi nào.
                  </Typography>
                )}
              </Box>

              <Formik
                initialValues={{
                  checkIn: "",
                  checkOut: "",
                }}
                validate={validateDates}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, setFieldValue, handleSubmit }) => (
                  <Form>
                    <Box display="flex" gap={2} alignItems="center">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Ngày nhận phòng"
                          value={values.checkIn ? dayjs(values.checkIn) : null}
                          format="DD/MM/YYYY"
                          onChange={(newValue) => {
                            setFieldValue(
                              "checkIn",
                              newValue ? newValue.format("YYYY-MM-DD") : ""
                            );
                          }}
                          disablePast
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: touched.checkIn && Boolean(errors.checkIn),
                              helperText: touched.checkIn && errors.checkIn,
                            },
                          }}
                        />
                        <DatePicker
                          label="Ngày trả phòng"
                          value={
                            values.checkOut ? dayjs(values.checkOut) : null
                          }
                          format="DD/MM/YYYY"
                          onChange={(newValue) => {
                            setFieldValue(
                              "checkOut",
                              newValue ? newValue.format("YYYY-MM-DD") : ""
                            );
                          }}
                          disablePast
                          minDate={
                            values.checkIn
                              ? dayjs(values.checkIn).add(1, "day")
                              : undefined
                          }
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error:
                                touched.checkOut && Boolean(errors.checkOut),
                              helperText: touched.checkOut && errors.checkOut,
                            },
                          }}
                        />
                      </LocalizationProvider>
                      <Button
                        sx={{ width: "300px", padding: "13px 20px" }}
                        variant="contained"
                        color={room.isAvailable ? "primary" : "inherit"}
                        disabled={!room.isAvailable}
                        onClick={() => handleSubmit()}
                        type="submit"
                      >
                        {room.isAvailable ? "Đặt phòng" : "Hết phòng"}
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          room={room}
          hotelName="Thanh Hoai Hotel"
          checkIn={bookingDates.checkIn}
          checkOut={bookingDates.checkOut}
        />
        <ImageModal
          open={isImageModalOpen}
          imageUrl={selectedImage}
          onClose={() => setIsImageModalOpen(false)}
        />
      </StyledCard>
    </>
  );
};

export default RoomDetailComponent;
