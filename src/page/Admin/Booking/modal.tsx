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
  fullName: Yup.string().required("Full name is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10,}$/, "Invalid phone number format")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  guests: Yup.number().min(1, "Minimum 1 guest").required("Guests is required"),
  notes: Yup.string(),
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
      fullName: booking?.fullName || "",
      phoneNumber: booking?.phoneNumber || "",
      email: booking?.email || "",
      guests: booking?.guests || 1,
      notes: booking?.notes || "",
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
        title: "Cập nhật booking thành công!",
        showConfirmButton: false,
        timer: 1500,
      });

      onClose();
    } catch (error: any) {
      console.error("Error details:", error);
      await Swal.fire({
        icon: "error",
        title: "Lỗi",
        text:
          error?.message ||
          "Có lỗi xảy ra. Vui lòng thử lại.",
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
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 3, color: "#8B7355", fontWeight: "bold" }}>
          {title}
        </Typography>

        {booking && (
          <Box sx={{ mb: 3, p: 2, backgroundColor: "#f5f0eb", borderRadius: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              Phòng: {booking.room?.type} - {booking.room?.number}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Tổng tiền:{" "}
              {new Intl.NumberFormat("vi-VN", {
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
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Họ tên"
                    name="fullName"
                    error={touched.fullName && Boolean(errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Số điện thoại"
                    name="phoneNumber"
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Email"
                    name="email"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Số khách"
                    name="guests"
                    type="number"
                    InputProps={{ inputProps: { min: 1 } }}
                    error={touched.guests && Boolean(errors.guests)}
                    helperText={touched.guests && errors.guests}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Field name="status">
                    {({ field }: any) => (
                      <FormControl
                        fullWidth
                        error={touched.status && Boolean(errors.status)}
                      >
                        <InputLabel>Trạng thái</InputLabel>
                        <Select {...field} label="Trạng thái">
                          <MenuItem value="pending">Chờ xác nhận</MenuItem>
                          <MenuItem value="confirmed">Đã xác nhận</MenuItem>
                          <MenuItem value="checked_in">Đã nhận phòng</MenuItem>
                          <MenuItem value="checked_out">Đã trả phòng</MenuItem>
                          <MenuItem value="cancelled">Đã hủy</MenuItem>
                          <MenuItem value="no_show">Không đến</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Field name="paymentStatus">
                    {({ field }: any) => (
                      <FormControl
                        fullWidth
                        error={
                          touched.paymentStatus && Boolean(errors.paymentStatus)
                        }
                      >
                        <InputLabel>Thanh toán</InputLabel>
                        <Select {...field} label="Thanh toán">
                          <MenuItem value="pending">Chờ thanh toán</MenuItem>
                          <MenuItem value="paid">Đã thanh toán</MenuItem>
                          <MenuItem value="failed">Thất bại</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Ngày nhận phòng"
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
                    label="Ngày trả phòng"
                    name="checkOut"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={touched.checkOut && Boolean(errors.checkOut)}
                    helperText={touched.checkOut && errors.checkOut}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Ghi chú"
                    name="notes"
                    multiline
                    rows={3}
                    error={touched.notes && Boolean(errors.notes)}
                    helperText={touched.notes && errors.notes}
                  />
                </Grid>
              </Grid>

              <Box
                sx={{ mt: 3, display: "flex", justifyContent: "flex-start", gap: 1 }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: "#8B7355",
                    "&:hover": { backgroundColor: "#6d5a43" },
                  }}
                >
                  Lưu thay đổi
                </Button>
                <Button variant="outlined" onClick={onClose}>
                  Hủy
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
