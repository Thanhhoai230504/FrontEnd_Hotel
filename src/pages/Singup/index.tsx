import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import HeaderLogin from "../Login/components/header";
import "./SingnUp.css";
const SignUpForm = () => {
  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      marketingConsent: false,
      profilingConsent: false,
    },
    validationSchema: Yup.object({
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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="container-fluid">
      <HeaderLogin />
      <div className="login-container">
        <div className="login-image"></div>
        <Box sx={{ maxWidth: 700, mx: "auto", mt: 5 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            CREATE ACCOUNT
          </Typography>

          <form className="singnUp-form" onSubmit={formik.handleSubmit}>
            {/* First Name */}
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
              margin="normal"
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
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              margin="normal"
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
              margin="normal"
            />

            {/* Password */}
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
              margin="normal"
            />

            {/* Confirm Password */}
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
              margin="normal"
            />

            {/* Consent Section */}

            <Typography sx={{ mt: 2 }} variant="h6" component="h2" gutterBottom>
              CONSENT TO PERSONAL DATA PROCESSING
            </Typography>
            <FormControlLabel
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
      </div>
      <div />
    </div>
  );
};

export default SignUpForm;
