import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosClient from "../../api/axiosClient";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { fetchUsersProfile } from "../../store/slices/userProfile-slice";
import { useSelector } from "react-redux";

interface UpdatePasswordModalProps {
  open: boolean;
  onClose: () => void;
  user: { id: string; password: string };
}

const UpdatePasswordModal: React.FC<UpdatePasswordModalProps> = ({
  open,
  onClose,
  user,
}) => {
  const dispatch = useDispatch();
  const userProfile = useSelector(
    (state: any) => state.userProfileState.usersProfile
  );
  const profile = userProfile.length > 0 ? userProfile[0] : null;

  useEffect(() => {
    if (user) {
      dispatch(fetchUsersProfile(user.id));
    }
  }, [dispatch, user?.id]);

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .required("Current password is required")
      .test(
        "is-correct",
        "Current password is incorrect",
        (value) => value === profile.password // Kiểm tra mật khẩu hiện tại
      ),
    newPassword: Yup.string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters")
      .notOneOf(
        [Yup.ref("currentPassword")],
        "New password must be different from current password"
      ), // Mật khẩu mới phải khác mật khẩu hiện tại
    verifyNewPassword: Yup.string()
      .required("Please confirm your new password")
      .oneOf([Yup.ref("newPassword")], "Passwords do not match"), // Xác nhận mật khẩu phải khớp
  });

  const handleSubmit = async (values: {
    currentPassword: string;
    newPassword: string;
    verifyNewPassword: string;
  }) => {
    try {
      const updatedUser = { password: values.newPassword };

      // Gửi request đến API để cập nhật mật khẩu
      await axiosClient.patch(`/users/${user?.id}`, updatedUser);

      Swal.fire({
        icon: "success",
        title: "Password updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch(fetchUsersProfile(user?.id));
      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error updating password",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography
          style={{
            letterSpacing: "1.2px",
            fontWeight: "600",
            fontSize: "1.4rem",
          }}
        >
          UPDATE MY PASSWORD
        </Typography>
      </DialogTitle>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          verifyNewPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <DialogContent>
              <label>Current Password:</label>
              <Field
                as={TextField}
                name="currentPassword"
                type="password"
                variant="outlined"
                fullWidth
                margin="dense"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                    backgroundColor: "#F4F4F4",
                  },
                }}
                error={
                  touched.currentPassword && Boolean(errors.currentPassword)
                }
                helperText={<ErrorMessage name="currentPassword" />}
              />

              <label>New Password:</label>
              <Field
                as={TextField}
                name="newPassword"
                type="password"
                variant="outlined"
                fullWidth
                margin="dense"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                    backgroundColor: "#F4F4F4",
                  },
                }}
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={<ErrorMessage name="newPassword" />}
              />

              <label>Verify New Password:</label>
              <Field
                as={TextField}
                name="verifyNewPassword"
                type="password"
                variant="outlined"
                fullWidth
                margin="dense"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                    backgroundColor: "#F4F4F4",
                  },
                }}
                error={
                  touched.verifyNewPassword && Boolean(errors.verifyNewPassword)
                }
                helperText={<ErrorMessage name="verifyNewPassword" />}
              />
            </DialogContent>
            <DialogActions style={{ justifyContent: "center" }}>
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: 0,
                  width: "550px",
                  marginBottom: "20px",
                  fontWeight: "600",
                  letterSpacing: "1.2px",
                  fontSize: "0.9rem",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid black",
                  },
                }}
              >
                UPDATE PASSWORD
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default UpdatePasswordModal;
