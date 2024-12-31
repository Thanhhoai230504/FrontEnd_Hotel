import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import axiosClient from "../../../api/axiosClient";
import { fetchAllBookings } from "../../../store/slice/allBooking";


interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  booking?: any;
  title: string;
}

const validationSchema = Yup.object().shape({
  status: Yup.string().required("Status is required"),
  paymentStatus: Yup.string().required("Payment status is required"),
  checkIn: Yup.date().required("Check-in date is required"),
  checkOut: Yup.date()
    .required("Check-out date is required")
    .min(Yup.ref("checkIn"), "Check-out date must be after check-in date"),
});

const BookingModal: React.FC<BookingModalProps> = ({
  open,
  onClose,
  booking,
  title,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = React.useMemo(
    () => ({
      status: booking?.status || "pending",
      paymentStatus: booking?.paymentStatus || "pending",
      checkIn: booking ? format(new Date(booking.checkIn), "yyyy-MM-dd") : "",
      checkOut: booking ? format(new Date(booking.checkOut), "yyyy-MM-dd") : "",
    }),
    [booking]
  );

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      if (!booking?._id) {
        throw new Error("No booking selected");
      }

      await axiosClient.put(`/bookings/${booking._id}`, {
        ...values,
        checkIn: new Date(values.checkIn).toISOString(),
        checkOut: new Date(values.checkOut).toISOString(),
      });

      await Swal.fire({
        icon: "success",
        title: "Booking updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch(fetchAllBookings({ page: 1, _limit: 5 }));
      onClose();
    } catch (error: any) {
      console.error("Error details:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
          {title}
        </Typography>

        {booking && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Guest: {booking.user.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Room: {booking.room.type} - {booking.room.number}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Total Price: {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(booking.totalPrice)}
            </Typography>
          </Box>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field name="status">
                    {({ field }: any) => (
                      <FormControl fullWidth error={touched.status && Boolean(errors.status)}>
                        <InputLabel>Status</InputLabel>
                        <Select {...field} label="Status">
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="confirmed">Confirmed</MenuItem>
                          <MenuItem value="cancelled">Cancelled</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field name="paymentStatus">
                    {({ field }: any) => (
                      <FormControl fullWidth error={touched.paymentStatus && Boolean(errors.paymentStatus)}>
                        <InputLabel>Payment Status</InputLabel>
                        <Select {...field} label="Payment Status">
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="paid">Paid</MenuItem>
                          <MenuItem value="failed">Failed</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Check In"
                    name="checkIn"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={touched.checkIn && Boolean(errors.checkIn)}
                    helperText={touched.checkIn && errors.checkIn}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Check Out"
                    name="checkOut"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={touched.checkOut && Boolean(errors.checkOut)}
                    helperText={touched.checkOut && errors.checkOut}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-start" }}>
                <Button variant="contained" type="submit" sx={{ mr: 1 }}>
                  Save Changes
                </Button>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default BookingModal;