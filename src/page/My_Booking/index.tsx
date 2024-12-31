import {
  AttachMoney,
  CalendarMonth,
  CancelOutlined,
  CheckCircle,
  PendingActions,
  Person,
} from "@mui/icons-material";
import {
  Badge,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBookings } from "../../store/slice/myBookings";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header/components/Header";
import { FaRegIdBadge } from "react-icons/fa";
import { Wifi, Tv, Bath, Wine, Fan } from "lucide-react";
import Loading from "../../components/Loading";
import NotFoundSearchRoom from "../../asset/svg/NotFoundSearchRoom.png";
interface Booking {
  _id: string;
  user: {
    _id: string;
    email: string;
  };
  room: {
    _id: string;
    type: string;
    number: string;
    price: number;
    capacity: number;
    description: string;
    amenities: string[];
    isAvailable: boolean;
    images: string[];
    createdAt: string;
    updatedAt: string;
  };
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

interface StatusConfig {
  color: "success" | "warning" | "error" | "default";
  icon: React.ReactElement;
}

const getStatusConfig = (status: string): StatusConfig => {
  const configs: Record<string, StatusConfig> = {
    confirmed: { color: "success", icon: <CheckCircle /> },
    pending: { color: "warning", icon: <PendingActions /> },
    cancelled: { color: "error", icon: <CancelOutlined /> },
  };
  return configs[status] || { color: "default", icon: <PendingActions /> };
};

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const formatDate = (date: string): string =>
  format(new Date(date), "dd MMM yyyy");

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
const MyBookings = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state: any) => state.myBookingState.bookings);
  const loading = useSelector((state: any) => state.myBookingState.loading);

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  return (
    <>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <Container maxWidth="lg" sx={{ py: 4, mt: 12 }}>
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <Badge
              badgeContent={bookings?.length || 0}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  right: -13,
                  top: 13,
                },
              }}
            >
              <Typography color="#8B7355" variant="h5" align="center" mb={4}>
                ĐẶT CHỖ CỦA TÔI
              </Typography>
            </Badge>
          </Box>

          {bookings.length === 0 ? (
            <Container maxWidth="lg">
              <Typography
                variant="body1"
                sx={{ ml: 3, fontSize: "1.1rem", mb: 2 }}
              >
                Bạn chưa đặt phòng nào
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "center",
                  p: 4,
                }}
              >
                <img
                  src={NotFoundSearchRoom}
                  alt="No products in the shopping bag"
                  style={{ width: "400px", height: "auto" }}
                />
              </Box>
            </Container>
          ) : (
            <Grid container spacing={3}>
              {bookings?.map((booking: Booking) => {
                const statusConfig = getStatusConfig(booking.status);
                return (
                  <Grid item xs={12} key={booking._id}>
                    <Card>
                      <Grid container>
                        <Grid item xs={12} md={4}>
                          <CardMedia
                            component="img"
                            height="250"
                            image={
                              booking.room.images[0] ||
                              "https://via.placeholder.com/470x250"
                            }
                            alt={booking.room.type || "Room Image"}
                            sx={{ objectFit: "cover" }}
                          />
                          <Box display="flex" gap={2} padding={2}>
                            {Array.isArray(booking.room.images) &&
                            booking.room.images.length > 0 ? (
                              booking.room.images.map((imageUrl, index) => (
                                <IconButton
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
                                    src={imageUrl} // Thay 'image' bằng 'imageUrl'
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

                        <Grid item xs={12} md={8} paddingLeft={4}>
                          <CardContent>
                            <Box sx={{ mb: 2 }}>
                              <Typography
                                variant="h5"
                                component="h2"
                                gutterBottom
                              >
                                {booking.room.type} - Room {booking.room.number}
                              </Typography>
                              <Chip
                                icon={statusConfig.icon}
                                label={booking.status.toUpperCase()}
                                color={statusConfig.color}
                                sx={{ mr: 1 }}
                              />
                              <Chip
                                label={`Payment: ${booking.paymentStatus.toUpperCase()}`}
                                color={
                                  booking.paymentStatus === "completed"
                                    ? "success"
                                    : "warning"
                                }
                              />
                            </Box>
                            <Stack spacing={2}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <CalendarMonth color="primary" />
                                <Typography>
                                  {formatDate(booking.checkIn)} -{" "}
                                  {formatDate(booking.checkOut)}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Person color="primary" />
                                <Typography>
                                  Số người: {booking.room.capacity} người
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <AttachMoney color="primary" />
                                <Typography>
                                  Tổng tiền : {formatPrice(booking.totalPrice)}
                                </Typography>
                              </Box>
                              <Divider />
                              <Box>
                                <Typography
                                  variant="subtitle2"
                                  color="text.secondary"
                                  gutterBottom
                                >
                                  Tiện nghi:
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                  }}
                                >
                                  {booking.room.amenities.map(
                                    (amenity, index) => (
                                      <Chip
                                        key={index}
                                        label={amenity}
                                        icon={<AmenityIcon type={amenity} />}
                                        size="small"
                                        variant="outlined"
                                      />
                                    )
                                  )}
                                </Box>
                              </Box>
                            </Stack>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Container>
      )}

      <Footer />
    </>
  );
};
export default MyBookings;
