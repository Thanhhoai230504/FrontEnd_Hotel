import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { RootState } from "../../store/store";

const ItemDetail = () => {
  const [selectedSize, setSelectedSize] = useState("S");
  console.log("🚀 ~ ItemDetail ~ selectedSize:", selectedSize);

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  // const handleAddToCart = () => {
  //   console.log("🚀 ~ handleAddToCart ~ selectedSize:", selectedSize);
  // };

  const { id } = useParams<{ id: string }>(); // Lấy id từ URL
  console.log("ItemDetail ~ Product ID from URL:", id);

  const productList = useSelector(
    (state: RootState) => state.productState.products
  );

  // Tìm sản phẩm dựa trên id
  const product = productList.find((p) => p.id.toString() === id);
  console.log("🚀 ~ ItemDetail ~ product:", product);

  if (productList.length === 0) {
    return (
      <Box>
        <Typography>No product found</Typography>
      </Box>
    );
  }
  if (!product) {
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
              color: "black", // Màu của thanh xoay
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
              src={product.image}
              alt={product.name}
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
                  {product.name}
                </Typography>

                {/* Price */}
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "700", fontSize: "20px" }}
                >
                  ฿ {product.price.toLocaleString()}
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

                {/* Color */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "700",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Color:
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      bgcolor: product.color,
                      marginLeft: "8px",
                    }}
                  />
                </Typography>

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
                    <li>{product.description}</li>
                    <li>Condition: {product.condition}</li>
                    <li>Quantity: {product.quantity} left</li>
                    <li>Sold: {product.sold} units</li>
                    <li>Popularity: {product.popularityScore}</li>
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
