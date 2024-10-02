import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cartsRequest } from "../../api/auth/authCarts";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { fetchProductDetail } from "../../store/slices/productDetail";
import { AppDispatch, RootState } from "../../store/store";
const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      // Đảm bảo số lượng không xuống dưới 1
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToCart = async () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    if (!user || !user.id) {
      console.error("Invalid user data");
      return;
    }

    if (!id) {
      console.error("Product ID is undefined");
      return;
    }

    const cartData = {
      productId: id,
      quantity,
      size: selectedSize,
      userId: String(user.id),
    };

    try {
      const result = await cartsRequest(cartData);

      if (result) {
        console.log("Product added to cart successfully:", result);
        navigate("/Carts");
      } else {
        console.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(id));
    }
  }, [dispatch, id]);
  const productDetail = useSelector(
    (state: RootState) => state.productDetailState.productDetail
  );
  const handleBuyNow = async () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    if (!user || !user.id) {
      console.error("Invalid user data");
      return;
    }

    if (!id) {
      console.error("Product ID is undefined");
      return;
    }

    const cartData = {
      productId: id,
      quantity,
      size: selectedSize,
      userId: String(user.id),
    };

    try {
      const result = await cartsRequest(cartData);

      if (result) {
        console.log("Product added to cart successfully:", result);
        navigate("/Orders");
      } else {
        console.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (!productDetail) {
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
          <CircularProgress
            disableShrink
            sx={{
              color: "black",
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Header />
      <Box sx={{ padding: "40px 40px 0 40px" }}>
        <Grid container spacing={2}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              src={productDetail.image}
              alt={productDetail.name}
              sx={{
                width: "520px",
                height: "auto",
                marginLeft: "20px",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  cursor: "pointer",
                },
              }}
            />
          </Grid>

          {/* Product Details */}
          <Grid
            sx={{
              width: "400px",
              height: "auto",
              paddingRight: "60px",
            }}
            item
            xs={12}
            md={6}
          >
            <Card sx={{ boxShadow: "none" }}>
              <CardContent sx={{ paddingTop: "45px" }}>
                {/* Product Title */}
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "700", fontSize: "24px", mb: 2 }}
                >
                  {productDetail.name}
                </Typography>

                {/* Price */}
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "500", fontSize: "16px" }}
                >
                  ฿ {productDetail.price.toLocaleString()}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* Size Selection */}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "700", fontSize: "16px" }}
                >
                  Size:
                </Typography>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  {["S", "M", "L", "XL"].map((size) => (
                    <Grid item xs={2} key={size}>
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          bgcolor: selectedSize === size ? "black" : "white",
                          color: selectedSize === size ? "white" : "black",
                          borderColor: "black",
                          "&:hover": {
                            bgcolor: selectedSize === size ? "black" : "black",
                            color: selectedSize === size ? "white" : "white",
                          },
                        }}
                        onClick={() => handleSizeChange(size)}
                      >
                        {size}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
                <Box display={"flex"}>
                  {/* Color */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "700",
                      fontSize: "16px",
                      display: "flex",
                      alignItems: "center",
                      marginRight: "50px",
                    }}
                  >
                    Color:
                    <Box
                      sx={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        bgcolor: productDetail.color,
                        marginLeft: "8px",
                      }}
                    />
                  </Typography>
                  <Box display="flex" alignItems="center">
                    {/* Nút Trừ */}
                    <IconButton
                      onClick={handleDecrease}
                      sx={{
                        color: "black",
                        border: "1px solid grey",
                        borderRadius: "4px",
                        width: "20px",
                        height: "20px",
                        padding: 0,
                      }}
                    >
                      <RemoveIcon fontSize="small" />{" "}
                      {/* Kích thước nhỏ cho biểu tượng */}
                    </IconButton>

                    {/* Trường hiển thị số lượng */}
                    <TextField
                      value={quantity}
                      size="small"
                      inputProps={{ readOnly: true }} // Không cho phép người dùng nhập trực tiếp
                      sx={{
                        width: "40px",
                        textAlign: "center",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            border: "none",
                          },
                        },
                      }}
                    />

                    {/* Nút Cộng */}
                    <IconButton
                      onClick={handleIncrease}
                      sx={{
                        color: "black",
                        border: "1px solid grey",
                        borderRadius: "4px",
                        width: "20px",
                        height: "20px",
                        padding: 0,
                      }}
                    >
                      <AddIcon fontSize="small" />{" "}
                      {/* Kích thước nhỏ cho biểu tượng */}
                    </IconButton>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Buttons */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      fullWidth
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
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      fullWidth
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
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </Button>
                  </Grid>
                </Grid>

                {/* Add to My Lists */}
                <Typography sx={{ mt: 2 }}>
                  <a
                    href="/my-lists"
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    +Add to My Lists
                  </a>
                </Typography>

                {/* Description */}
                <Typography
                  component="div"
                  variant="body1"
                  sx={{ mt: 2, fontSize: "0.9rem", fontWeight: "300" }}
                >
                  <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                    <li>{productDetail.description}</li>
                    <li>Condition: {productDetail.condition}</li>
                    <li>Quantity: {productDetail.quantity} left</li>
                    <li>Sold: {productDetail.sold} units</li>
                    <li>Popularity: {productDetail.popularityScore}</li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default ItemDetail;
