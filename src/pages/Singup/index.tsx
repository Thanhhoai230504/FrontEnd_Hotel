import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { SingnUpRequest } from "../../api/auth/authSingnUpRequest";
import axiosClient from "../../api/axiosClient";
import HeaderLogin from "../Login/components/header";
import "./SingnUp.css";
import Footer from "../../layout/Footer";
const SignUpForm = () => {
  const navigate = useNavigate();
  // Formik setup
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
    validationSchema: Yup.object().shape({
      userName: Yup.string().required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const result = await SingnUpRequest(values);
      if (!result) {
        alert(
          "Email hoặc username đã tồn tại. Vui lòng nhập email hoặc username khác"
        );
        return;
      }
      try {
        await axiosClient.post("/users", values);
        navigate("/login");
      } catch (error) {
        alert("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box className="container-fluid">
      <HeaderLogin />
      <Box className="singnUp-container">
        <Box className="singnUp-image"></Box>
        <Box className="login-form-container">
          <Box>
            <Typography variant="h5" component="h1" gutterBottom>
              CREATE ACCOUNT
            </Typography>

            <form className="singnUp-form" onSubmit={formik.handleSubmit}>
              {/* First Name */}
              <TextField
                fullWidth
                id="userName"
                name="userName"
                label="User Name "
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.userName && Boolean(formik.errors.userName)
                }
                helperText={formik.touched.userName && formik.errors.userName}
                margin="dense"
                sx={{ maxWidth: 556 }}
              />
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                margin="dense"
                sx={{ maxWidth: 556 }}
              />

              {/* Last Name */}
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                margin="dense"
                sx={{ maxWidth: 556 }}
              />

              {/* Email */}
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
                sx={{ maxWidth: 556 }}
              />

              {/* Password */}
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"} // Thay đổi type dựa trên trạng thái
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                margin="dense"
                sx={{ maxWidth: 556 }}
                InputProps={{
                  // Nút ẩn/hiện mật khẩu
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword} // Gọi hàm khi nhấn vào nút
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Confirm Password */}
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? "text" : "password"} // Thay đổi type dựa trên trạng thái
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                margin="dense"
                sx={{ maxWidth: 556 }}
                InputProps={{
                  // Nút ẩn/hiện mật khẩu
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowPassword} // Gọi hàm khi nhấn vào nút
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Consent Section */}

              <Typography
                sx={{ mt: 2 }}
                variant="h6"
                component="h2"
                gutterBottom
              >
                CONSENT TO PERSONAL DATA PROCESSING
              </Typography>
              <FormControlLabel
                sx={{ maxWidth: 556 }}
                control={
                  <Checkbox
                    id="profilingConsent"
                    name="profilingConsent"
                    checked={formik.values.profilingConsent}
                    onChange={formik.handleChange}
                  />
                }
                label="I agree to the collection, disclosure or processing of my personal data for profiling purposes."
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{
                  maxWidth: 556,
                  mt: 2,
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
                AGREE AND CONTINUE
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default SignUpForm;
