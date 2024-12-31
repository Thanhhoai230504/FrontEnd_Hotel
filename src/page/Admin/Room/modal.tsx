import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  Chip,
  InputAdornment,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Swal from "sweetalert2";
import { Room } from "../../../Types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import axiosClient from "../../../api/axiosClient";
import { fetchAllRooms } from "../../../store/slice/roomAdmin";

interface RoomModalProps {
  open: boolean;
  onClose: () => void;
  room?: Room;
  title: string;
}

const validationSchema = Yup.object().shape({
  type: Yup.string().required("Room type is required"),
  number: Yup.string().required("Room number is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be positive"),
  capacity: Yup.number()
    .required("Capacity is required")
    .min(1, "Capacity must be at least 1"),
  description: Yup.string().required("Description is required"),
  amenities: Yup.array()
    .of(Yup.string())
    .min(1, "At least one amenity is required"),
  images: Yup.array()
    .of(Yup.string().required("Image URL is required"))
    .min(2, "Two images are required")
    .max(2, "Maximum two images allowed"),
  isAvailable: Yup.boolean(),
});

const RoomModal: React.FC<RoomModalProps> = ({
  open,
  onClose,
  room,
  title,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const formikRef = React.useRef<any>(null);
  const [amenityInput, setAmenityInput] = React.useState("");

  const initialValues = React.useMemo(
    () => ({
      type: room?.type || "",
      number: room?.number || "",
      price: room?.price || 0,
      capacity: room?.capacity || 1,
      description: room?.description || "",
      amenities: room?.amenities || [],
      images: room?.images || ["", ""],
      isAvailable: room?.isAvailable ?? true,
    }),
    [room]
  );

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const payload = {
        ...values,
        amenities: values.amenities || [],
        images: values.images.filter(url => url.trim() !== ""),
      };

      console.log("Submitting payload:", payload);

      if (room?._id) {
        await axiosClient.put(`/rooms/${room._id}`, payload);

        await Swal.fire({
          icon: "success",
          title: "Room updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await axiosClient.post("/rooms", payload);

        await Swal.fire({
          icon: "success",
          title: "Room added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }

       dispatch(fetchAllRooms({page: 1, _limit: 5}));
      onClose();
    } catch (error: any) {
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      await Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  const handleAddAmenity = (values: any, setFieldValue: any) => {
    if (amenityInput.trim()) {
      const currentAmenities = values.amenities || [];
      const newAmenities = [...currentAmenities, amenityInput.trim()];
      setFieldValue("amenities", newAmenities);
      setAmenityInput("");
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
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
          maxHeight: "90vh",
          overflowY: "auto",
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
          innerRef={formikRef}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Room Type"
                    name="type"
                    error={touched.type && Boolean(errors.type)}
                    helperText={touched.type && errors.type}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Room Number"
                    name="number"
                    error={touched.number && Boolean(errors.number)}
                    helperText={touched.number && errors.number}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₫</InputAdornment>
                      ),
                    }}
                    error={touched.price && Boolean(errors.price)}
                    helperText={touched.price && errors.price}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Capacity"
                    name="capacity"
                    type="number"
                    error={touched.capacity && Boolean(errors.capacity)}
                    helperText={touched.capacity && errors.capacity}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={3}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Grid>

                {/* Amenities Field */}
                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      label="Add Amenity"
                      value={amenityInput}
                      onChange={(e) => setAmenityInput(e.target.value)}
                      error={touched.amenities && Boolean(errors.amenities)}
                      helperText={touched.amenities && errors.amenities}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddAmenity(values, setFieldValue);
                        }
                      }}
                    />
                    <Button
                      variant="text"
                      onClick={() => handleAddAmenity(values, setFieldValue)}
                      sx={{ mt: 1 }}
                    >
                      Add Amenity
                    </Button>
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                      }}
                    >
                      {(values.amenities || []).map((amenity, index) => (
                        <Chip
                          key={index}
                          label={amenity}
                          onDelete={() => {
                            const newAmenities = values.amenities.filter(
                              (_, i) => i !== index
                            );
                            setFieldValue("amenities", newAmenities);
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>

                {/* Images Fields */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Room Images
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Image URL 1"
                        value={values.images[0]}
                        onChange={(e) => {
                          const newImages = [...values.images];
                          newImages[0] = e.target.value;
                          setFieldValue("images", newImages);
                        }}
                        error={touched.images && Boolean(errors.images)}
                        helperText={
                          touched.images && errors.images
                            ? Array.isArray(errors.images)
                              ? errors.images[0]
                              : errors.images
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Image URL 2"
                        value={values.images[1]}
                        onChange={(e) => {
                          const newImages = [...values.images];
                          newImages[1] = e.target.value;
                          setFieldValue("images", newImages);
                        }}
                        error={touched.images && Boolean(errors.images)}
                        helperText={
                          touched.images && errors.images
                            ? Array.isArray(errors.images)
                              ? errors.images[1]
                              : errors.images
                            : ""
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Field as={Switch} name="isAvailable" type="checkbox" />
                    }
                    label="Available"
                  />
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

export default RoomModal;