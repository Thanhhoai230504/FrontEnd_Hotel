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

const OrderCard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const orderUserList =
    useSelector((state: any) => state.orderUserState.oderUser) || [];

  useEffect(() => {
    if (!user?.id) {
      console.error("User not logged in or invalid user data");
      navigate("/login");
      return;
    }
    dispatch(fetchOrderUser(user.id));
  }, [dispatch, user?.id]);

  return (
    <Box>
      <Header />
      <Box sx={{ margin: "20px 50px" }}>
        <Box
          sx={{ display: "flex", alignItems: "center", ml: 2, mt: 7, mb: 2 }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mr: 1 }}>
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
                      ${order.totalAmount.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>

                {/* Order Date and Shipping */}
                <Box mt={1} mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(order.createdAt).toLocaleString()}
                  </Typography>
                  <Link href="#" underline="hover">
                    Shipping No: 61833014105
                  </Link>
                </Box>

                <Divider />

                {/* Order Status */}
                <Grid container alignItems="center" spacing={6} mt={2}>
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
                      sx={{ mb: 2 }}
                      gap={6}
                    >
                      <Avatar
                        src={`https://via.placeholder.com/50?text=Product+${
                          index + 1
                        }`}
                        alt="Product Image"
                        sx={{ width: 100, height: 100, mr: 2 }}
                      />
                      <Box display={"flex"} flexDirection={"column"} gap={1}>
                        <Typography variant="body1">
                          Product ID: {product.productId}
                        </Typography>
                        <Typography variant="body2">
                          Quantity: {product.quantity}
                        </Typography>
                        <Typography variant="body2">
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
                            variant="text"
                            sx={{
                              color: "black",
                              fontWeight: "300",
                              bgcolor: "whitesmoke",
                              textDecoration: "none",
                              "&:hover": {
                                textDecoration: "underline",
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
          <Box sx={{ textAlign: "center", height: "50vh" }}>
            <Typography
              variant="h4"
              color="error"
              sx={{
                mt: 15,
                ml: 2,
                fontWeight: "bold",
                fontSize: "30px",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {user ? "No orders found." : "Please log in to view your orders."}
            </Typography>
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default OrderCard;
