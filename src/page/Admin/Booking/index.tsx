import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Typography,
  Box,
  Grid,
  Stack,
  Pagination,
  Tooltip,
  Button,
} from "@mui/material";
import {
  Edit,
  Delete,
  CheckCircle,
  Login,
  Logout,
  PersonOff,
} from "@mui/icons-material";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import Header from "../../../layout/Header/components/Header";
import axiosClient from "../../../api/axiosClient";
import Swal from "sweetalert2";
import BookingModal from "./modal";
import Sidebar from "../Components/Sidebar";
import { fetchAllBookings } from "../../../store/slice/allBooking";
import withAdminRoute from "../../../components/hocs/withAdminRoute ";
import Loading from "../../../components/Loading";

const BookingTable: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedBooking, setSelectedBooking] = React.useState<any>();
  const [modalTitle, setModalTitle] = React.useState("");
  const [page, setPage] = useState(1);
  const limit = 5;
  const dispatch = useDispatch<AppDispatch>();
  const { allBookings, loading } = useSelector(
    (state: RootState) => state.bookingState
  );

  useEffect(() => {
    const payload = {
      page,
      _limit: limit,
    };
    dispatch(fetchAllBookings(payload));
  }, [dispatch, page, limit]);

  const formatDate = (date: string) => {
    return format(new Date(date), "dd/MM/yyyy");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleEdit = (booking: any) => {
    setSelectedBooking(booking);
    setModalTitle("Edit Booking");
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        await axiosClient.delete(`/bookings/${id}`);
        await Swal.fire({
          title: "Đã xóa!",
          text: "Booking đã được xóa thành công.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        dispatch(fetchAllBookings({ page, _limit: limit }));
      } catch (error) {
        await Swal.fire({
          title: "Lỗi",
          text: "Có lỗi xảy ra. Vui lòng thử lại.",
          icon: "error",
        });
      }
    }
  };

  // Action handlers for booking workflow
  const handleAction = async (
    id: string,
    action: string,
    actionLabel: string
  ) => {
    const result = await Swal.fire({
      title: `Xác nhận ${actionLabel}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#8B7355",
      cancelButtonColor: "#999",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        await axiosClient.patch(`/bookings/${id}/${action}`);
        await Swal.fire({
          title: "Thành công!",
          text: `${actionLabel} thành công.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        dispatch(fetchAllBookings({ page, _limit: limit }));
      } catch (error: any) {
        await Swal.fire({
          title: "Lỗi",
          text: error?.message || "Có lỗi xảy ra. Vui lòng thử lại.",
          icon: "error",
        });
      }
    }
  };

  const getStatusColor = (
    status: string
  ): "success" | "warning" | "error" | "info" | "default" | "primary" | "secondary" => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "primary";
      case "pending":
        return "warning";
      case "checked_in":
        return "info";
      case "checked_out":
        return "success";
      case "cancelled":
        return "error";
      case "no_show":
        return "default";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "Chờ xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "checked_in":
        return "Đã nhận phòng";
      case "checked_out":
        return "Đã trả phòng";
      case "cancelled":
        return "Đã hủy";
      case "no_show":
        return "Không đến";
      default:
        return status;
    }
  };

  const getPaymentStatusColor = (
    status: string
  ): "success" | "warning" | "error" | "default" => {
    switch (status.toLowerCase()) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  const getPaymentStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "Đã thanh toán";
      case "pending":
        return "Chờ thanh toán";
      case "failed":
        return "Thất bại";
      default:
        return status;
    }
  };

  // Render action buttons based on current booking status
  const renderActionButtons = (booking: any) => {
    const status = booking.status?.toLowerCase();

    return (
      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", justifyContent: "center" }}>
        {/* Confirm: only for pending */}
        {status === "pending" && (
          <Tooltip title="Xác nhận booking">
            <IconButton
              size="small"
              sx={{ color: "#2196f3" }}
              onClick={() =>
                handleAction(booking._id, "confirm", "Xác nhận booking")
              }
            >
              <CheckCircle fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        {/* Check-in: only for confirmed */}
        {status === "confirmed" && (
          <Tooltip title="Check-in">
            <IconButton
              size="small"
              sx={{ color: "#00bcd4" }}
              onClick={() =>
                handleAction(booking._id, "check-in", "Check-in")
              }
            >
              <Login fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        {/* Check-out: only for checked_in */}
        {status === "checked_in" && (
          <Tooltip title="Check-out">
            <IconButton
              size="small"
              sx={{ color: "#4caf50" }}
              onClick={() =>
                handleAction(booking._id, "check-out", "Check-out")
              }
            >
              <Logout fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        {/* No-show: for pending or confirmed */}
        {(status === "pending" || status === "confirmed") && (
          <Tooltip title="Đánh dấu không đến">
            <IconButton
              size="small"
              sx={{ color: "#9e9e9e" }}
              onClick={() =>
                handleAction(booking._id, "no-show", "Đánh dấu không đến")
              }
            >
              <PersonOff fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        {/* Edit: always available */}
        <Tooltip title="Chỉnh sửa">
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleEdit(booking)}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Delete: always available */}
        <Tooltip title="Xóa">
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDelete(booking._id)}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    );
  };

  if (!Array.isArray(allBookings)) {
    return <div>No bookings available</div>;
  }

  return (
    <Box sx={{ backgroundColor: "#F9F7F2", minHeight: "100vh" }}>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <Grid container sx={{ mt: 15 }}>
          <Sidebar />
          <Grid item xs={12} md={10} pt={3}>
            <TableContainer
              component={Paper}
              sx={{ maxWidth: 1350, margin: "0 auto" }}
            >
              <Box sx={{ p: 2 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#8B7355" }}
                >
                  Quản Lý Đặt Phòng
                </Typography>
              </Box>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f0eb" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Khách</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>SĐT</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Phòng</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Số khách</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Check In</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Check Out</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Tổng tiền</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Trạng thái</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Thanh toán</TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allBookings.map((booking: any) => (
                    <TableRow key={booking._id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {booking.fullName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {booking.email}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{booking.phoneNumber}</TableCell>
                      <TableCell>
                        {booking.room?.type} - {booking.room?.number}
                      </TableCell>
                      <TableCell align="center">
                        {booking.guests || 1}
                      </TableCell>
                      <TableCell>{formatDate(booking.checkIn)}</TableCell>
                      <TableCell>{formatDate(booking.checkOut)}</TableCell>
                      <TableCell>{formatPrice(booking.totalPrice)}</TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(booking.status)}
                          color={getStatusColor(booking.status)}
                          size="small"
                          sx={{ fontWeight: "bold", fontSize: "0.7rem" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getPaymentStatusLabel(booking.paymentStatus)}
                          color={getPaymentStatusColor(booking.paymentStatus)}
                          size="small"
                          sx={{ fontWeight: "bold", fontSize: "0.7rem" }}
                        />
                      </TableCell>
                      <TableCell>{renderActionButtons(booking)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack spacing={2} sx={{ alignItems: "center", marginTop: 2 }}>
              <Pagination
                count={10}
                page={page}
                onChange={(event, value) => setPage(value)}
                variant="outlined"
                shape="rounded"
                sx={{
                  "& .MuiPaginationItem-root": {
                    "&:hover": {
                      backgroundColor: "#8B7355",
                      color: "white",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#8B7355",
                      color: "white",
                    },
                  },
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      )}
      <BookingModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedBooking(undefined);
          dispatch(fetchAllBookings({ page, _limit: limit }));
        }}
        booking={selectedBooking}
        title={modalTitle}
      />
    </Box>
  );
};

export default withAdminRoute(BookingTable);
