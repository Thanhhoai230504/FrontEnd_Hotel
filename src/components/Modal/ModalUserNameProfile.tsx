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
import { fetchAllUsersProfile } from "../../store/slices/allUserProfile-slice";
import { useSelector } from "react-redux";

interface UpdateUserNameModalProps {
  open: boolean;
  onClose: () => void;
  user: { id: string; userName: string }; // Thêm userName hiện tại
}

const UpdateUserNameModal: React.FC<UpdateUserNameModalProps> = ({
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
    newUserName: Yup.string()
      .required("User name is required")
      .test(
        "is-different",
        "The user name already exists or is identical to the current user name",
        (value) =>
          value !== user.userName && // Kiểm tra userName mới không trùng với userName hiện tại
          !allUser.some((u: any) => u.userName === value) // Kiểm tra userName không trở với bất kỳ userName nào trong danh sách allUser
      ),
  });

  const handleSubmit = async (values: { newUserName: string }) => {
    try {
      const updatedUser = { userName: values.newUserName };

      // Gửi request đến API để cập nhật userName
      await axiosClient.patch(`/users/${user?.id}`, updatedUser);

      // Cập nhật trong localStorage nếu cần thiết
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        parsedUser.userName = values.newUserName;
        localStorage.setItem("user", JSON.stringify(parsedUser));
      }

      Swal.fire({
        icon: "success",
        title: "User name updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch(fetchUsersProfile(user?.id));
      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error updating user name",
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
          UPDATE MY USER NAME
        </Typography>
      </DialogTitle>
      <Formik
        initialValues={{ newUserName: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <DialogContent>
              <label>New User Name:</label>
              <Field
                as={TextField}
                name="newUserName"
                variant="outlined"
                fullWidth
                margin="dense"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                    backgroundColor: "#F4F4F4",
                  },
                }}
                error={touched.newUserName && Boolean(errors.newUserName)}
                helperText={<ErrorMessage name="newUserName" />}
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
                  fontSize: "0,9rem",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid black",
                  },
                }}
              >
                UPDATE USER NAME
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default UpdateUserNameModal;
