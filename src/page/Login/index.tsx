import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { loginRequest } from "../../api/auth/auth.request";
import withPublicRoute from "../../components/hocs/withPublicRoute";
import Header from "../../layout/Header/components/Header";
import backgroundLogin from "../../asset/svg/pexels-pixabay-260922.jpg";
const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter a valid email")
        .required("This field is required"),
      password: Yup.string()
        .required("This field is required")
        .min(8, "Pasword must be 8 or more characters")
        .required(""),
    }),
    onSubmit: async (values) => {
      const result = await loginRequest(values);

      // Kiểm tra nếu không có kết quả hoặc đăng nhập thất bại
      if (!result || !result.token || !result.user) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Invalid email or password!",
        });
        return;
      }

      const { token, user } = result;

      // Lưu token và thông tin người dùng vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      // Hiển thị thông báo thành công
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Login successfully!",
      });

      if (user.role === "admin") {
        navigate("/Admin/Rooms");
        return;
      }
      navigate("/");
    },
  });

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: "100vh",
          background: {
            xs: `url(${backgroundLogin})`,
            sm: `url(${backgroundLogin})`,
            md: `url(${backgroundLogin})`,
            lg: `url(${backgroundLogin})`,
            xl: `url(${backgroundLogin})`,
          },
          backgroundSize: "contain", // Hiển thị toàn bộ hình ảnh trong khung
          backgroundRepeat: "no-repeat", // Không lặp lại hình ảnh
          backgroundPosition: "center", // Căn giữa hình ảnh
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
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
              Hotel inn Login
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Username"
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
                Login
              </Button>

              <Button
                fullWidth
                onClick={() => navigate("/SingnUp")}
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

export default withPublicRoute(LoginForm);
