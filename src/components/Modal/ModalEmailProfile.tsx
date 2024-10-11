import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import * as Yup from "yup";
import axiosClient from "../../api/axiosClient";
import { fetchAllUsersProfile } from "../../store/slices/allUserProfile-slice";
import { fetchUsersProfile } from "../../store/slices/userProfile-slice";

interface UpdateEmailModalProps {
  open: boolean;
  onClose: () => void;
  user: { id: string; email: string }; // Thêm email hiện tại
}

const UpdateEmailModal: React.FC<UpdateEmailModalProps> = ({
  open,
  onClose,
  user,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchUsersProfile(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    dispatch(fetchAllUsersProfile());
  }, [dispatch]);

  const allUser = useSelector(
    (state: any) => state.userAllProfileState.allUsersProfile
  );

  const validationSchema = Yup.object({
    newEmail: Yup.string()
      .email("Invalid email format")
      .required("Required")
      .test(
        "is-different",
        "The email already exists or is identical to the current email",
        (value) =>
          value !== user.email && // Kiểm tra email mới khác với email hiện tại
          !allUser.some((u: any) => u.email === value) // Kiểm tra email mới không trùng với bất kỳ email nào trong danh sách allUser
      ),
  });

  const handleSubmit = async (values: { newEmail: string }) => {
    try {
      const updatedUser = { email: values.newEmail };

      await axiosClient.patch(`/users/${user?.id}`, updatedUser);

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        parsedUser.email = values.newEmail;
        localStorage.setItem("user", JSON.stringify(parsedUser));
      }

      Swal.fire({
        icon: "success",
        title: "Email updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch(fetchUsersProfile(user?.id));
      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error updating email",
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
          UPDATE MY EMAIL
        </Typography>
      </DialogTitle>
      <Formik
        initialValues={{ newEmail: "", confirmEmail: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <DialogContent>
              <label>new email:</label>
              <Field
                as={TextField}
                name="newEmail"
                variant="outlined"
                fullWidth
                margin="dense"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                    backgroundColor: "#F4F4F4",
                  },
                }}
                error={touched.newEmail && Boolean(errors.newEmail)}
                helperText={<ErrorMessage name="newEmail" />}
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
                UPDATE EMAIL
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default UpdateEmailModal;
