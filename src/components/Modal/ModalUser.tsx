import React, { useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosClient from "../../api/axiosClient";
import { useDispatch } from "react-redux";
import { fetchAllUsers } from "../../store/slices/allUsers-slice"; // Cập nhật slice nếu cần
import Swal from "sweetalert2";
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  pb: 2,
  pl: 4,
  pr: 4,
  overflowY: "auto",
  borderRadius: 2,
};

// Validation schema for User
const UserSchema = Yup.object().shape({
  userName: Yup.string().required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
  marketingConsent: Yup.boolean(),
  profilingConsent: Yup.boolean(),
});

const UserModal = ({ open, handleClose, user }: any) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      marketingConsent: false,
      profilingConsent: false,
    },
    validationSchema: UserSchema,
    onSubmit: async (values) => {
      try {
        if (user) {
          await axiosClient.put(`/users/${user.id}`, values);
          formik.resetForm();
          dispatch(fetchAllUsers({ page: 1, _limit: 12 }));
          Swal.fire({
            icon: "success",
            title: "User updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          await axiosClient.post("/users", values);
          formik.resetForm();
          dispatch(fetchAllUsers({ page: 1, _limit: 12 }));
          Swal.fire({
            icon: "success",
            title: "User added successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error adding user",
          text: "Something went wrong. Please try again.",
        });
      } finally {
        handleClose();
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        userName: user?.userName,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        password: user?.password,
        confirmPassword: user?.password,
        marketingConsent: user?.marketingConsent,
        profilingConsent: user?.profilingConsent,
      });
    }
  }, [user, formik.setValues]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 16, right: 16 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" component="h2" mb={2}>
          {user ? "Edit User" : "Add New User"}
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="userName"
            name="userName"
            label="Username"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
            margin="dense"
            size="small"
          />
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            margin="dense"
            size="small"
          />
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            margin="dense"
            size="small"
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="dense"
            size="small"
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="dense"
            size="small"
          />
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            margin="dense"
            size="small"
          />
          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                maxWidth: 100,
                mt: 2,
                mb: 3,
                bgcolor: "black",
                color: "white",
                borderColor: "black",
                "&:hover": {
                  color: "black",
                  bgcolor: "white",
                  borderColor: "black",
                },
              }}
            >
              {user ? "Edit" : "Add"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              fullWidth
              sx={{
                maxWidth: 100,
                mt: 2,
                mb: 3,
                bgcolor: "#8B0000",
                color: "white",
                borderColor: "#8B0000",
                "&:hover": {
                  bgcolor: "white",
                  color: "black",
                  borderColor: "#A9A9A9",
                },
              }}
              onClick={() => {
                formik.resetForm();
              }}
            >
              Reset
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UserModal;
