import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { User } from "../../Types";
import { Eye, EyeOff } from "lucide-react";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  profileData: User;
  onSubmit: (values: Partial<User>) => void;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name should be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .when("password", {
      is: (val: string) => val?.length > 0,
      then: (schema) => schema.required("Confirm Password is required"),
    }),
});

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  open,
  onClose,
  profileData,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const initialValues = {
    name: profileData?.name || "",
    email: profileData?.email || "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: any) => {
    // Remove confirmPassword before submitting
    const { confirmPassword, ...submitValues } = values;
    // Only include password if it was changed
    if (!submitValues.password) {
      delete submitValues.password;
    }
    onSubmit(submitValues);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
          onClose();
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <DialogContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Field
                  name="name"
                  as={TextField}
                  label="Tên đăng nhập"
                  fullWidth
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  name="password"
                  as={TextField}
                  label="Mật khẩu mới"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Field
                  name="confirmPassword"
                  as={TextField}
                  label="Xác nhận mật khẩu mới"
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Save Changes
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditProfileModal;
