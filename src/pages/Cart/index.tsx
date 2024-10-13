import { ShoppingCartOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosClient from "../../api/axiosClient";
import "../../assets/font/index.css";
import cart from "../../assets/svg/cart.png";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { CartItem, fetchCarts } from "../../store/slices/carts-slice";
import { useAppDispatch } from "../../store/store";
const ShoppingCart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const carts = useSelector((state: any) => state.cartsState.carts) || [];
  const loading = useSelector((state: any) => state.cartsState.loading);
  const handleDelete = async (id: string) => {
    try {
      await axiosClient.delete(`/carts/${id}`);
      dispatch(fetchCarts(user.id));
      Swal.fire({
        icon: "success",
        title: "Product deleted successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error deleting product",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  useEffect(() => {
    if (!user?.id) {
      console.error("User not logged in or invalid user data");
      navigate("/login");
      return;
    }
    dispatch(fetchCarts(user.id));
  }, [dispatch, user?.id]);

  const handleBuyNow = async () => {
    try {
      navigate("/Orders");
    } catch (error) {
      console.error("Error buying products:", error);
    }
  };
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

  if (carts.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
          position: "relative",
        }}
      >
        <Header />
        <Box
          sx={{
            position: "absolute",
            top: "150px",
            left: "20px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", ml: 2, mt: 2, mb: 2 }}
          >
            <Typography
              variant="h5"
              sx={{ mr: 1, fontFamily: "Giants", fontSize: "2rem" }}
            >
              SHOPPING BAG
            </Typography>
            <Box sx={{ position: "relative", display: "inline-block" }}>
              {/* Biểu tượng hóa đơn */}
              <ShoppingCartOutlined fontSize="large" />
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
                {carts.length}
              </Box>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ ml: 3, fontSize: "0.9rem", mb: 2 }}>
            {user
              ? "Your shopping bag are empty. Start shopping and check out our new arrivals."
              : "Please log in to view your orders."}
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate("/shop")}
            sx={{
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
        </Box>
        <Box
          sx={{
            p: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={cart}
            alt="No products in the shopping bag"
            style={{ width: "400px", height: "auto" }}
          />
        </Box>
      </Box>
    );
  }
  return (
    <Box>
      <Header />
      <Box sx={{ p: 6 }}>
        <Box
          sx={{ display: "flex", alignItems: "center", ml: 2, mt: 5, mb: 2 }}
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
            SHOPPING BAG
          </Typography>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            {/* Biểu tượng hóa đơn */}
            <ShoppingCartOutlined fontSize="large" />
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
              {carts.length}
            </Box>
          </Box>
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            backgroundColor: "whitesmoke",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="shopping cart table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "bold", letterSpacing: "0.07rem" }}
                >
                  ITEM
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", letterSpacing: "0.07rem" }}
                >
                  PRICE
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carts.map((cart: CartItem) => {
                const product = cart.product;

                return (
                  <TableRow key={cart.id}>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        {product ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{
                              width: "200px",
                            }}
                          />
                        ) : (
                          <Typography>No Image</Typography>
                        )}
                        <Box sx={{ marginLeft: "120px" }}>
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-start"
                            gap={2}
                            paddingBottom={7}
                          >
                            <Typography
                              sx={{
                                fontWeight: "600",
                                letterSpacing: "0.07rem",
                              }}
                            >
                              {product ? product.name : "Product not found"}
                            </Typography>
                            <Typography
                              sx={{
                                fontWeight: "500",
                                fontSize: "0.9rem",
                              }}
                            >
                              {product ? product.brand : "N/A"}
                            </Typography>
                            <Typography
                              sx={{
                                fontWeight: "400",
                                fontSize: "0.9rem",
                                lineHeight: "1.8", // Điều chỉnh khoảng cách giữa các dòng
                              }}
                            >
                              <span
                                style={{
                                  letterSpacing: "0.07rem",
                                  fontSize: "0.9rem",
                                  marginBottom: "8px",
                                  display: "inline-block",
                                }}
                              >
                                Size:
                              </span>{" "}
                              {cart.size} <br />
                              <span
                                style={{
                                  letterSpacing: "0.07rem",
                                  fontSize: "0.9rem",
                                  marginBottom: "8px",
                                  display: "inline-block",
                                }}
                              >
                                Color:
                              </span>
                              {product ? (
                                <Box
                                  sx={{
                                    bgcolor: product.color,
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "25%",
                                    display: "inline-block",
                                    marginLeft: "5px",
                                    verticalAlign: "middle",
                                    marginBottom: "8px",
                                  }}
                                />
                              ) : (
                                "N/A"
                              )}
                              <br />
                              <span
                                style={{
                                  letterSpacing: "0.07rem",
                                  fontSize: "0.9rem",
                                  marginBottom: "8px",
                                  display: "inline-block",
                                }}
                              >
                                Quantity:
                              </span>{" "}
                              {cart.quantity}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                            <Button
                              variant="outlined"
                              onClick={() => handleDelete(cart.id)}
                              sx={{
                                bgcolor: "white",
                                color: "black",
                                borderColor: "black",
                                borderRadius: 0,
                                "&:hover": {
                                  bgcolor: "black",
                                  color: "white",
                                },
                              }}
                            >
                              Remove
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() =>
                                navigate(`/shop/detail/${product.id}`)
                              }
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
                            >
                              View Details
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          letterSpacing: "0.1rem",
                          fontSize: "1rem",
                        }}
                      >
                        ฿{product ? product.price.toLocaleString() : "N/A"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          sx={{
            mt: 2,
            bgcolor: "black",
            color: "white",
            width: "150px",
            height: "40px",
            fontSize: "0.875rem",
            padding: "8px 16px",
            "&:hover": {
              bgcolor: "white",
              color: "black",
              borderColor: "black",
            },
          }}
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
      </Box>
      <Footer />
    </Box>
  );
};

export default ShoppingCart;
