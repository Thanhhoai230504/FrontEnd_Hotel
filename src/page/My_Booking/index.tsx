import {
  AttachMoney,
  CalendarMonth,
  CancelOutlined,
  CheckCircle,
  Email,
  Notes,
  PendingActions,
  Person,
  Phone,
} from "@mui/icons-material";
import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { format } from "date-fns";
import { Bath, Fan, Tv, Wifi, Wine } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { FaRegIdBadge } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import NotFoundSearchRoom from "../../asset/svg/NotFoundSearchRoom.png";
import Loading from "../../components/Loading";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header/components/Header";
import { fetchMyBookings } from "../../store/slice/myBookings";
import ImageModal from "../PhotoLibrary/ImageModal";
import axiosClient from "../../api/axiosClient";
import Swal from "sweetalert2";

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
  fullName: string;
  phoneNumber: string;
  email: string;
  notes: string;
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
  const location = useLocation();
  const bookings = useSelector((state: any) => state.myBookingState.bookings);
  const loading = useSelector((state: any) => state.myBookingState.loading);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning",
  });

  const handleOnlinePayment = async (booking: Booking) => {
    try {
      setIsProcessingPayment(true);

      const paymentData = {
        amount: booking.totalPrice,
        orderId: booking._id,
        description: `Thanh toán đặt phòng ${booking.room.type} - ${booking.room.number}`,
      };

      const response = await axios.post(
        "https://backend-hotel-1-nqtn.onrender.com/api/payments/create-payment",
        paymentData
      );

      if (response.data.success && response.data.data.order_url) {
        localStorage.setItem(
          "lastPaymentTransId",
          response.data.data.app_trans_id
        );
        window.location.href = response.data.data.order_url;
      } else {
        throw new Error("Không nhận được URL thanh toán");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setSnackbar({
        open: true,
        message: "Có lỗi xảy ra khi tạo thanh toán. Vui lòng thử lại sau.",
        severity: "error",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const checkPaymentStatus = useCallback(
    async (app_trans_id: string) => {
      try {
        const response = await axios.post(
          `https://backend-hotel-1-nqtn.onrender.com/api/payments/order-status/${app_trans_id}`
        );

        if (!response?.data) {
          throw new Error("Invalid response data");
        }

        if (!response.data.success) {
          throw new Error(
            response.data.message || "Failed to check payment status"
          );
        }

        const data = response.data.data;

        const returnCode = Number(data.return_code);

        if (isNaN(returnCode)) {
          throw new Error("Invalid return code received");
        }

        switch (returnCode) {
          case 1:
            setSnackbar({
              open: true,
              message: "Thanh toán thành công!",
              severity: "success",
            });
            dispatch(fetchMyBookings());
            break;

          case 2:
            setSnackbar({
              open: true,
              message:
                data.sub_return_message ||
                data.return_message ||
                "Thanh toán thất bại",
              severity: "error",
            });
            dispatch(fetchMyBookings());
            break;

          case 3:
            setSnackbar({
              open: true,
              message: data.is_processing
                ? "Đang xử lý thanh toán, vui lòng đợi..."
                : "Đơn hàng chưa được thanh toán",
              severity: "warning",
            });

            // Only retry if still processing
            if (data.is_processing) {
              setTimeout(() => checkPaymentStatus(app_trans_id), 5000);
            } else {
              dispatch(fetchMyBookings());
            }
            break;

          default:
            console.error(`Unexpected return code: ${returnCode}`);
            setSnackbar({
              open: true,
              message: "Có lỗi xảy ra khi kiểm tra trạng thái thanh toán",
              severity: "error",
            });
            dispatch(fetchMyBookings());
        }
      } catch (error: any) {
        console.error("Error checking payment status:", error);

        // Hiển thị thông báo lỗi chi tiết
        setSnackbar({
          open: true,
          message:
            error.response?.data?.message ||
            error.message ||
            "Lỗi kiểm tra trạng thái thanh toán",
          severity: "error",
        });

        // Log chi tiết lỗi
        if (error.response?.data?.details) {
          console.error("Server error details:", error.response.data.details);
        }
      }
    },
    [dispatch, setSnackbar]
  );
  useEffect(() => {
    dispatch(fetchMyBookings());

    const lastPaymentTransId = localStorage.getItem("lastPaymentTransId");

    if (lastPaymentTransId) {
      checkPaymentStatus(lastPaymentTransId);
      localStorage.removeItem("lastPaymentTransId");
    }

    // const queryParams = new URLSearchParams(location.search);
    // const status = queryParams.get("status");

    // if (status === "1") {
    //   setSnackbar({
    //     open: true,
    //     message: "Thanh toán thành công!",
    //     severity: "success",
    //   });
    // } else if (status === "0") {
    //   setSnackbar({
    //     open: true,
    //     message: "Thanh toán thất bại. Vui lòng thử lại.",
    //     severity: "error",
    //   });
    // }
  }, [dispatch, location, checkPaymentStatus, setSnackbar]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const handleCancelBooking = async (bookingId: string) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn hủy đặt phòng này?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hủy đặt phòng",
      cancelButtonText: "Quay lại",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      setIsCancelling(true);
      const response = await axiosClient.patch(`/bookings/${bookingId}/cancel`);

      if (response.data) {
        dispatch(fetchMyBookings());
        setSnackbar({
          open: true,
          message: response.data.message || "Đã hủy đặt phòng thành công",
          severity: "success",
        });
      } else {
        throw new Error("Failed to cancel booking");
      }
    } catch (error: any) {
      console.error("Error cancelling booking:", error);
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Không thể hủy đặt phòng. Vui lòng thử lại sau.",
        severity: "error",
      });
    } finally {
      setIsCancelling(false);
    }
  };
  return (
    <Box sx={{ backgroundColor: "#F5F5F5" }}>
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
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
              {snackbar.message}
            </Alert>
          </Snackbar>

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
                                  onClick={() => handleImageClick(imageUrl)}
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
                                    src={imageUrl}
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

                        <Grid item xs={12} md={8} paddingLeft={6}>
                          <CardContent>
                            <Box sx={{ mb: 2 }}>
                              <Typography
                                variant="h5"
                                component="h2"
                                gutterBottom
                              >
                                {booking.room.type} - Phòng{" "}
                                {booking.room.number}
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
                                  booking.paymentStatus === "paid"
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
                                <Person color="primary" />
                                <Typography>
                                  Họ và tên: {booking.fullName}
                                </Typography>
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Phone color="primary" />
                                <Typography>
                                  Số điện thoại: {booking.phoneNumber}
                                </Typography>
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Email color="primary" />
                                <Typography>Email: {booking.email}</Typography>
                              </Box>

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
                                  Tổng tiền: {formatPrice(booking.totalPrice)}
                                </Typography>
                              </Box>

                              {booking.notes && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <Notes color="primary" />
                                  <Typography>
                                    Ghi chú: {booking.notes}
                                  </Typography>
                                </Box>
                              )}

                              <Divider />

                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                gutterBottom
                                sx={{ whiteSpace: "nowrap" }} // Đảm bảo văn bản không bị xuống dòng
                              >
                                Tiện nghi:
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center", // Căn giữa theo trục dọc
                                  justifyContent: "space-between", // Nút ở cuối dòng ngang
                                  width: "100%",
                                  gap: 2,
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
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
                                <Box
                                  sx={{
                                    marginLeft: "auto",
                                    display: "flex",
                                    gap: 2,
                                  }}
                                >
                                  {booking.status !== "cancelled" &&
                                    new Date(booking.checkIn) > new Date() && (
                                      <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() =>
                                          handleCancelBooking(booking._id)
                                        }
                                        disabled={
                                          isCancelling ||
                                          booking.paymentStatus === "paid"
                                        }
                                        startIcon={<CancelOutlined />}
                                      >
                                        {isCancelling
                                          ? "Đang hủy..."
                                          : "Hủy đặt phòng"}
                                      </Button>
                                    )}
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleOnlinePayment(booking)}
                                    disabled={
                                      isProcessingPayment ||
                                      booking.paymentStatus === "paid" ||
                                      booking.status === "cancelled"
                                    }
                                  >
                                    {isProcessingPayment
                                      ? "Đang xử lý..."
                                      : booking.paymentStatus === "paid"
                                      ? "Đã thanh toán"
                                      : "Thanh toán online"}
                                  </Button>
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
      <ImageModal
        open={isImageModalOpen}
        imageUrl={selectedImage}
        onClose={() => setIsImageModalOpen(false)}
      />
      <Footer />
    </Box>
  );
};

export default MyBookings;
