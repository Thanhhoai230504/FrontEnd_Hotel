import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SpeedIcon from "@mui/icons-material/Speed";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Card,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrderUser } from "../../store/slices/orderUser-slice";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { ReceiptOutlined } from "@mui/icons-material";
import RecentlyViewed from "../Home/components/Carousel";
import "../../assets/font/index.css";
import { autoBatchEnhancer } from "@reduxjs/toolkit";
const OrderCard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const orderUserList =
    useSelector((state: any) => state.orderUserState.oderUser) || [];
  const loading = useSelector((state: any) => state.orderUserState.loading);
  useEffect(() => {
    if (!user?.id) {
      console.error("User not logged in or invalid user data");
      navigate("/login");
      return;
    }
    dispatch(fetchOrderUser(user.id));
  }, [dispatch, user?.id]);
  if (loading) {
    return (
      <Box>
        <Header />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          <CircularProgress disableShrink sx={{ color: "black" }} />
        </Box>
      </Box>
    );
  }
  return (
    <Box>
      <Header />
      <Box sx={{ margin: "20px 50px" }}>
        <Box
          sx={{ display: "flex", alignItems: "center", ml: 2, mt: 8, mb: 2 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Giants",
              fontSize: "2rem",
              mr: 1,
              letterSpacing: "0.1rem",
            }}
          >
            ORDERS
          </Typography>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            {/* Biểu tượng hóa đơn */}
            <ReceiptOutlined fontSize="large" />
            {/* Số lượng đơn hàng nằm trên đầu biểu tượng */}
            <Box
              sx={{
                position: "absolute",
                top: "-10px", // Đẩy lên trên biểu tượng
                right: "-10px", // Đẩy sang phải biểu tượng
                backgroundColor: "red", // Màu nền cho số
                color: "white", // Màu chữ
                fontSize: "12px",
                fontWeight: "bold",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {orderUserList.length}
            </Box>
          </Box>
        </Box>
        {user && orderUserList.length > 0 ? (
          <Card sx={{ p: 2, mb: 3, mt: 2, bgcolor: "whitesmoke" }}>
            {orderUserList.map((order: any) => (
              <Box key={order.id} mb={2}>
                <Divider sx={{ mb: 2 }} />

                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Grid item>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Order #{order.id}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Chip
                      label="Paid"
                      color="success"
                      icon={<CheckCircleIcon />}
                      sx={{ fontWeight: "bold", color: "white" }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      ฿{order.totalAmount.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>

                {/* Order Date and Shipping */}
                <Box mt={1} mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(order.createdAt).toLocaleString()}
                  </Typography>
                  <Link href="#" underline="hover" sx={{ color: "#00eb10" }}>
                    Shipping No: 61833014105
                  </Link>
                </Box>

                <Divider />

                {/* Order Status */}
                <Grid container alignItems="center" spacing={24} paddingTop={2}>
                  <Grid item>
                    <Chip
                      label="Unfinished"
                      icon={<AccessTimeIcon />}
                      variant="outlined"
                      color="warning"
                    />
                  </Grid>
                  <Grid item>
                    <Chip
                      label="Speedy"
                      icon={<SpeedIcon />}
                      color="error"
                      sx={{ color: "white" }}
                    />
                  </Grid>
                </Grid>

                {/* Product Info */}
                <Box mt={2}>
                  {order.products.map((product: any, index: number) => (
                    <Grid
                      container
                      alignItems="center"
                      key={index}
                      sx={{ mb: 3 }}
                      gap={6}
                    >
                      <img
                        src={product.img}
                        alt={product.name}
                        style={{
                          width: "200px",
                          height: "auto",
                          marginRight: 7,
                          marginBottom: 4,
                        }}
                      />
                      <Box
                        display={"flex"}
                        flexDirection={"column"}
                        gap={1}
                        sx={{ ml: 6 }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "600",
                            letterSpacing: "0.07rem",
                          }}
                        >
                          {product.name}
                        </Typography>
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          {product.description}
                        </Typography>
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          Price: ฿ {product.price}
                        </Typography>
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          Quantity: {product.quantity}
                        </Typography>
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          Size: {product.size}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                          <Typography
                            sx={{
                              bgcolor: "#fce4ec",
                              color: "#d32f2f",
                              fontSize: "0.75rem",
                              padding: "4px 8px",
                              borderRadius: "4px",
                            }}
                          >
                            Your order will be delivered to you within the next
                            48 hours!
                          </Typography>
                        </Box>
                        <Box mt={2}>
                          <Button
                            variant="outlined"
                            sx={{
                              mt: 2,
                              bgcolor: "black",
                              color: "white",
                              borderColor: "black",
                              borderRadius: 0,
                              "&:hover": {
                                bgcolor: "white",
                                color: "black",
                              },
                            }}
                            onClick={() =>
                              navigate(`/shop/detail/${product.productId}`)
                            }
                          >
                            View Details
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Box>
              </Box>
            ))}
          </Card>
        ) : (
          <Box sx={{ height: "auto" }}>
            <Typography variant="body1" sx={{ ml: 3, fontSize: "0.9rem" }}>
              {user
                ? "Your shopping orders are empty. Start shopping and check out our new arrivals."
                : "Please log in to view your orders."}
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/shop")}
              sx={{
                mt: 3,
                width: "150px",
                marginLeft: "20px",
                bgcolor: "black",
                color: "white",
                borderColor: "black",
                borderRadius: 0,
                "&:hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
            >
              View All
            </Button>
            <Box
              mt={8}
              sx={{
                border: "1px solid #e0e0e0  ",
                p: 2,
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <RecentlyViewed />
            </Box>
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default OrderCard;
