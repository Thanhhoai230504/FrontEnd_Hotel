import React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import HeaderLogin from "./components/header";
import "./LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      // Handle login logic here
    },
  });

  return (
    <div className="container-fluid">
      <HeaderLogin />
      <div className="login-container">
        <div className="login-image"></div>
        <div className="login-form-container">
          <Box>
            <Typography variant="h5" component="h1" gutterBottom>
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
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                margin="normal"
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
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                margin="normal"
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
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
