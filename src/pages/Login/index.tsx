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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginRequest } from "../../api/auth/auth.request";
import HeaderLogin from "./components/header";
import "./LoginForm.css";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/user-slice";
import Footer from "../../layout/Footer";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      if (!result) {
        alert("Không nhập đúng email, vui lòng thử lại.!");
        return;
      }

      dispatch(login(result));
      navigate("/");
    },
  });

  return (
    <Box className="container-fluid">
      <HeaderLogin />
      <Box className="login-container">
        <Box className="login-image"></Box>
        <Box className="login-form-container">
          <Box>
            <Typography
              sx={{ paddingLeft: "30px" }}
              variant="h5"
              component="h1"
              gutterBottom
            >
              LOGIN
            </Typography>

            <form className="login-form" onSubmit={formik.handleSubmit}>
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
                autoComplete="email"
              />

              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"} // Toggle password visibility
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                autoComplete="current-password" // Thêm thuộc tính này
              />
              <FormControlLabel
                className="check"
                control={
                  <Checkbox
                    id="profilingConsent"
                    name="profilingConsent"
                    onChange={formik.handleChange}
                  />
                }
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{
                  mt: 2,
                  bgcolor: "black",
                  color: "white",
                  "&:hover": {
                    bgcolor: "white",
                    color: "black",
                    borderColor: "black",
                  },
                }}
              >
                Login
              </Button>

              <Button
                type="button"
                fullWidth
                variant="outlined"
                sx={{
                  mt: 2,
                  bgcolor: "black",
                  color: "white",
                  "&:hover": {
                    bgcolor: "white",
                    color: "black",
                    borderColor: "black",
                  },
                }}
                onClick={() => navigate("/singnup")}
              >
                Create Account
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default LoginForm;
