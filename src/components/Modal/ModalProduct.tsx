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
import { fetchAllProduct } from "../../store/slices/allProduct";
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

const ProductSchema = Yup.object().shape({
  image: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  brand: Yup.string().required("Required"),
  color: Yup.string().required("Required"),
  price: Yup.number().required("Required").positive("Must be positive"),
  size: Yup.string().required("Required"),
  quantity: Yup.number().required("Required").min(0, "Must be 0 or more"),
  condition: Yup.string().required("Required"),
});

const ProductModal = ({ open, handleClose, product }: any) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      image: "",
      name: "",
      brand: "",
      color: "",
      price: "",
      size: "",
      quantity: "",
      condition: "",
    },
    validationSchema: ProductSchema,
    onSubmit: async (values) => {
      try {
        if (product) {
          await axiosClient.put(`/products/${product.id}`, values);
          formik.resetForm();
          dispatch(fetchAllProduct({ page: 1, _limit: 12 }));
          Swal.fire({
            icon: "success",
            title: "Product updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          await axiosClient.post("/products", values);
          formik.resetForm();
          dispatch(fetchAllProduct({ page: 1, _limit: 12 }));
          Swal.fire({
            icon: "success",
            title: "Product added successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error adding product",
          text: "Something went wrong. Please try again.",
        });
      } finally {
        handleClose();
        formik.resetForm();
      }
    },
  });
  useEffect(() => {
    if (product) {
      formik.setValues({
        image: product?.image,
        name: product?.name,
        brand: product?.brand,
        color: product?.color,
        price: product?.price,
        size: product?.size,
        quantity: product?.quantity,
        condition: product?.condition,
      });
    }
  }, [product, formik.setValues]);

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
          {product ? "Edit Product" : " Add New Product"}
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="dense"
            size="small"
          />
          <TextField
            fullWidth
            id="brand"
            name="brand"
            label="Brand"
            value={formik.values.brand}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.brand && Boolean(formik.errors.brand)}
            helperText={formik.touched.brand && formik.errors.brand}
            margin="dense"
            size="small"
          />
          <TextField
            fullWidth
            id="color"
            name="color"
            label="Color"
            value={formik.values.color}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.color && Boolean(formik.errors.color)}
            helperText={formik.touched.color && formik.errors.color}
            margin="dense"
            size="small"
          />
          <TextField
            fullWidth
            id="price"
            name="price"
            label="Price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            margin="dense"
            size="small"
          />
          <TextField
            fullWidth
            id="size"
            name="size"
            label="Size"
            value={formik.values.size}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.size && Boolean(formik.errors.size)}
            helperText={formik.touched.size && formik.errors.size}
            margin="dense"
            size="small"
          />
          <TextField
            fullWidth
            id="quantity"
            name="quantity"
            label="Quantity"
            type="number"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
            margin="dense"
            size="small"
          />
          <TextField
            fullWidth
            id="condition"
            name="condition"
            label="Condition"
            value={formik.values.condition}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.condition && Boolean(formik.errors.condition)}
            helperText={formik.touched.condition && formik.errors.condition}
            margin="dense"
            size="small"
          />
          <TextField
            fullWidth
            id="image"
            name="image"
            label="URL"
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.image && Boolean(formik.errors.image)}
            helperText={formik.touched.image && formik.errors.image}
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
              {product ? "Edit" : "Add"}
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

export default ProductModal;
