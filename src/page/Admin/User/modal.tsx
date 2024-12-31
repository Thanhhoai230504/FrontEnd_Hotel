import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { User, UserFormData } from "../../../Types";
import axiosClient from "../../../api/axiosClient";
import { fetchAllUsers } from "../../../store/slice/allUser";
import Swal from "sweetalert2";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  user?: User;
  title: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().when("isEdit", {
    is: false,
    then: (schema) => schema.required("Password is required"),
    otherwise: (schema) => schema.optional(),
  }),
  role: Yup.string().oneOf(["admin", "user"]).required("Role is required"),
});

const UserModal: React.FC<UserModalProps> = ({
  open,
  onClose,
  user,
  title,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: UserFormData & { isEdit: boolean } = {
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    role: user?.role || "user",
    isEdit: !!user,
  };

  const handleSubmit = async (
    values: UserFormData,
    { resetForm }: FormikHelpers<UserFormData & { isEdit: boolean }>
  ) => {
    try {
      if (user) {
        await axiosClient.put(`/users/${user._id}`, values);
        dispatch(fetchAllUsers({ page: 1, _limit: 5 }));
        Swal.fire({
          icon: "success",
          title: "User updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await axiosClient.post("/auth/register", values);
        dispatch(fetchAllUsers({ page: 1, _limit: 5 }));
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
        title: "Error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      onClose();
      resetForm();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
          {title}
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched, handleChange, values }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Name"
                    name="name"
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Field
                      as={Select}
                      labelId="role-label"
                      name="role"
                      label="Role"
                      value={values.role}
                      error={touched.role && Boolean(errors.role)}
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                    </Field>
                  </FormControl>
                </Grid>
              </Grid>
              <Box
                sx={{ mt: 3, display: "flex", justifyContent: "flex-start" }}
              >
                <Button variant="contained" type="submit" sx={{ mr: 1 }}>
                  Save
                </Button>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default UserModal;
