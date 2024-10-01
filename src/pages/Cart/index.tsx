import {
  Box,
  Button,
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
import { cartsRequest } from "../../api/auth/authCarts";
import axiosClient from "../../api/axiosClient";
import Header from "../../layout/Header";
import { CartItem, fetchCarts } from "../../store/slices/carts-slice";
import { useAppDispatch } from "../../store/store";
import Footer from "../../layout/Footer";
import Swal from "sweetalert2";
import { ReceiptOutlined, ShoppingCartOutlined } from "@mui/icons-material";

const ShoppingCart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const carts = useSelector((state: any) => state.cartsState.carts) || [];

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
      const result = await cartsRequest(carts);
      navigate("/Orders");
    } catch (error) {
      console.error("Error buying products:", error);
    }
  };

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
            <Typography variant="h5" sx={{ fontWeight: "bold", mr: 1 }}>
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
        <Box sx={{ p: 4 }}>
          <Typography
            variant="h4"
            color="error"
            sx={{
              fontWeight: "bold",
              fontFamily: "Arial, sans-serif",
            }}
          >
            No products in the cart.
          </Typography>
        </Box>
      </Box>
    );
  }
  return (
    <Box>
      <Header />
      <Box sx={{ p: 6 }}>
        <Box
          sx={{ display: "flex", alignItems: "center", ml: 2, mt: 7, mb: 2 }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mr: 1 }}>
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
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="shopping cart table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>ITEM</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>PRICE</TableCell>
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
                            style={{ width: "200px", marginRight: "16px" }}
                          />
                        ) : (
                          <Typography>No Image</Typography>
                        )}
                        <Box>
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-start"
                            gap={2}
                          >
                            <Typography sx={{ fontWeight: "bold" }}>
                              {product ? product.name : "Product not found"}
                            </Typography>
                            <Typography>
                              {product ? product.brand : "N/A"}
                            </Typography>
                            <Typography>
                              Size: {cart.size}, Color:{" "}
                              {product ? (
                                <Box
                                  sx={{
                                    bgcolor: product.color,
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                    marginLeft: "5px",
                                    verticalAlign: "middle",
                                  }}
                                />
                              ) : (
                                "N/A"
                              )}
                              , Quantity: {cart.quantity}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                            <Button
                              variant="text"
                              onClick={() => handleDelete(cart.id)}
                              sx={{
                                color: "black",
                                fontWeight: "300",
                                bgcolor: "white",
                                textDecoration: "none",

                                "&:hover": {
                                  textDecoration: "underline",
                                },
                              }}
                            >
                              Remove
                            </Button>
                            <Button
                              variant="text"
                              onClick={() =>
                                navigate(`/shop/detail/${product.id}`)
                              }
                              sx={{
                                color: "black",
                                fontWeight: "300",
                                bgcolor: "white",
                                textDecoration: "none",
                                "&:hover": {
                                  textDecoration: "underline",
                                },
                              }}
                            >
                              view details
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        ฿{product ? product.price : "N/A"}
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
