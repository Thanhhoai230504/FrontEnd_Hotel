import HomeIcon from "@mui/icons-material/Home";
import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import axiosClient from "../../api/axiosClient";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { fetchCarts } from "../../store/slices/carts-slice";
import { CartItem, Product } from "../../store/slices/product-slice";
import { useAppDispatch } from "../../store/store";

const Orders = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const countries: string[] = [
    "Vietnam",
    "China",
    "USA",
    "Canada",
    "Germany",
    "France",
  ];

  const addresstype: string[] = ["Home", "Work"];
  const carts = useSelector((state: any) => state.cartsState.carts) || [];

  useEffect(() => {
    if (!user?.id) {
      console.error("User not logged in or invalid user data");
      navigate("/login");
      return;
    }
    dispatch(fetchCarts(user.id));
  }, [dispatch, user?.id]);

  const calculateTotal = () => {
    return carts.reduce((acc: number, cart: CartItem) => {
      const product = cart?.product as Product;
      return product ? acc + product?.price * cart?.quantity : acc;
    }, 0);
  };

  const calculateVAT = (total: number) => {
    return total * 0.21;
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      company: "",
      address: "",
      aptSuite: "",
      city: "",
      country: "",
      postalCode: "",
      telephone: "",
      discountCode: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
      postalCode: Yup.string().required("Required"),
      telephone: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const deleteCartUser = async (carts: CartItem[]) => {
    try {
      const result = await Promise.all(
        carts.map(
          async (cart: CartItem) =>
            await axiosClient.delete(`/carts/${cart.id}`)
        )
      );
      console.log(result);
    } catch (error) {}
  };
  const handleCheckout = async () => {
    const errors = await formik.validateForm();
    formik.setTouched({
      firstName: true,
      lastName: true,
      address: true,
      city: true,
      country: true,
      postalCode: true,
      telephone: true,
    });

    if (Object.keys(errors).length > 0) {
      console.error("Form validation errors:", errors);
      return;
    }

    const orderData = {
      ...formik.values,
      products: carts.map((cart: any) => ({
        productId: cart.productId,
        size: cart.size,
        quantity: cart.quantity,
      })),
      userId: user.id,
      totalAmount: total + VAT,
      createdAt: new Date().toISOString(),
    };
    console.log(orderData);

    try {
      await axiosClient.post("/orders", orderData);
      await Swal.fire({
        title: "ORDER SUCCESSFUL!",
        text: "Order placed successfully!",
        icon: "success",
      });
      deleteCartUser(carts);
      dispatch(fetchCarts(user.id));
      navigate("/");
    } catch (error) {
      console.error("Error placing order:", error);
      await Swal.fire({
        title: "Error!",
        text: "There was an error placing your order.",
        icon: "error",
      });
    }
  };
  const total = calculateTotal();
  const VAT = calculateVAT(total);

  return (
    <Box>
      <Header />
      <Grid
        container
        sx={{ mt: 4, p: 2 }}
        spacing={4}
        justifyContent="space-between"
      >
        <Grid item xs={12} md={7}>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", letterSpacing: "0.9px" }}
            >
              ENTER SHIPPING ADDRESS <HomeIcon />
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
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
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} md={6}>
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
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  label="Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  id="company"
                  name="company"
                  label="Company (Optional)"
                  value={formik.values.company}
                  onChange={formik.handleChange}
                  margin="normal"
                >
                  {addresstype.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="city"
                  name="city"
                  label="City"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  id="country"
                  name="country"
                  label="Country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                  helperText={formik.touched.country && formik.errors.country}
                  margin="normal"
                >
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="postalCode"
                  name="postalCode"
                  label="Postal Code"
                  value={formik.values.postalCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.postalCode &&
                    Boolean(formik.errors.postalCode)
                  }
                  helperText={
                    formik.touched.postalCode && formik.errors.postalCode
                  }
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="telephone"
                  name="telephone"
                  label="Telephone"
                  value={formik.values.telephone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.telephone && Boolean(formik.errors.telephone)
                  }
                  helperText={
                    formik.touched.telephone && formik.errors.telephone
                  }
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", letterSpacing: "0.9px", mb: 2 }}
          >
            ORDER SUMMARY
          </Typography>
          <Box
            sx={{
              backgroundColor: "#f9f9f9",
              p: 2,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            {carts.map((cart: CartItem) => {
              const product = cart.product;

              return product ? (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mb={3}
                  key={cart.productId}
                >
                  <Box display="flex">
                    <img
                      src={product.image}
                      alt={product.name}
                      width={90}
                      style={{
                        marginRight: "10px",
                        maxHeight: "100px",
                      }}
                    />
                    <Box ml={2}>
                      <Typography
                        sx={{ fontSize: "0.8rem", marginBottom: "5px" }}
                      >
                        {" "}
                        {product.name}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "0.8rem", marginBottom: "5px" }}
                      >
                        {" "}
                        {product.brand}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "0.8rem", marginBottom: "5px" }}
                      >
                        Price:{product.price.toFixed(2)} ฿
                      </Typography>
                      <Typography
                        sx={{ fontSize: "0.8rem", marginBottom: "5px" }}
                      >
                        Quantity: {cart.quantity}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ) : null;
            })}

            <Divider sx={{ mb: 2 }} />
            {/* Price Breakdown */}
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography sx={{ fontWeight: "bold" }}>Item Subtotal</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {total.toFixed(2)} ฿
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              mb={1}
              sx={{ fontWeight: "bold" }}
            >
              <Typography sx={{ fontWeight: "bold" }}>VAT (21%)</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {VAT.toFixed(2)} ฿
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography sx={{ fontWeight: "bold" }}>Shipping</Typography>
              <Typography sx={{ fontWeight: "bold" }}>0,00 ฿</Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Total */}
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Total
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {(total + VAT).toFixed(2)} ฿
              </Typography>
            </Box>
            <Button
              variant="outlined"
              fullWidth
              type="submit"
              sx={{
                bgcolor: "black",
                color: "white",
                borderColor: "black",
                borderRadius: 0,
                "&:hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              onClick={handleCheckout}
            >
              PROCEED TO CHECKOUT
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};

export default Orders;
