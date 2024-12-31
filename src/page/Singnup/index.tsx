import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { signupRequest } from "../../api/auth/auth.request";
import withPublicRoute from "../../components/hocs/withPublicRoute";
import Header from "../../layout/Header/components/Header";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("This field is required"),
      email: Yup.string()
        .email("Please enter a valid email")
        .required("This field is required"),
      password: Yup.string()
        .required("This field is required")
        .min(8, "Password must be 8 or more characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("This field is required"),
    }),
    onSubmit: async (values) => {
      const result = await signupRequest(values);
      if (!result || !result.success) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Signup failed! Please try again.",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Signup successfully!",
      });

      navigate("/Login");
    },
  });

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "url(https://images5.alphacoders.com/515/thumb-1920-515366.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          mt: "54px",
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={24}
            sx={{
              padding: 4,
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                color: "#8B7355",
                textAlign: "center",
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              Create Account
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                margin="normal"
                variant="filled"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 1,
                  input: { color: "white" },
                  label: { color: "rgba(255, 255, 255, 0.7)" },
                  "& .MuiFilledInput-root": {
                    "&:before, &:after": {
                      borderBottomColor: "rgba(255, 255, 255, 0.7)",
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                margin="normal"
                variant="filled"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 1,
                  input: { color: "white" },
                  label: { color: "rgba(255, 255, 255, 0.7)" },
                  "& .MuiFilledInput-root": {
                    "&:before, &:after": {
                      borderBottomColor: "rgba(255, 255, 255, 0.7)",
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                margin="normal"
                variant="filled"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 1,
                  input: { color: "white" },
                  label: { color: "rgba(255, 255, 255, 0.7)" },
                  "& .MuiFilledInput-root": {
                    "&:before, &:after": {
                      borderBottomColor: "rgba(255, 255, 255, 0.7)",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        sx={{ color: "white" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                margin="normal"
                variant="filled"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 1,
                  input: { color: "white" },
                  label: { color: "rgba(255, 255, 255, 0.7)" },
                  "& .MuiFilledInput-root": {
                    "&:before, &:after": {
                      borderBottomColor: "rgba(255, 255, 255, 0.7)",
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 4,
                  mb: 2,
                  py: 1.5,
                }}
              >
                Sign Up
              </Button>

              <Button
                fullWidth
                onClick={() => navigate("/Login")}
                sx={{
                  color: "#8B7355",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#8B7355",
                  },
                }}
              >
                Already have an account? Login
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default withPublicRoute(SignupForm);
