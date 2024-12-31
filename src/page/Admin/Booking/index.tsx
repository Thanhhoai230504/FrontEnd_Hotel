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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
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
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosClient.delete(`/bookings/${id}`);
        await Swal.fire({
          title: "Deleted!",
          text: "Booking has been deleted.",
          icon: "success",
        });
        dispatch(fetchAllBookings({ page: 1, _limit: limit }));
      } catch (error) {
        await Swal.fire({
          title: "Error deleting booking",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getPaymentStatusColor = (status: string) => {
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
              sx={{ maxWidth: 1200, margin: "0 auto" }}
            >
              <Box sx={{ p: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold",color: "#8B7355" }}>
                  Booking Management
                </Typography>
              </Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Guest Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Room</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Check In</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Check Out</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Total Price
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Payment</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allBookings.map((booking: any) => (
                    <TableRow key={booking._id} hover>
                      <TableCell>{booking.user?.name}</TableCell>
                      <TableCell>{booking.user.email}</TableCell>
                      <TableCell>
                        {booking.room.type} - {booking.room.number}
                      </TableCell>

                      <TableCell>{formatDate(booking.checkIn)}</TableCell>
                      <TableCell>{formatDate(booking.checkOut)}</TableCell>
                      <TableCell>{formatPrice(booking.totalPrice)}</TableCell>
                      <TableCell>
                        <Chip
                          label={booking.status}
                          color={getStatusColor(booking.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={booking.paymentStatus}
                          color={getPaymentStatusColor(booking.paymentStatus)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => handleEdit(booking)}
                          sx={{ mr: 1 }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDelete(booking._id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
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
        }}
        booking={selectedBooking}
        title={modalTitle}
      />
    </Box>
  );
};

export default withAdminRoute(BookingTable);
