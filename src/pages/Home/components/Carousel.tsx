import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import Slider from "react-slick"; // Import thư viện react-slick
import { fetchAllProduct } from "../../../store/slices/allProduct";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { fetchProductCarousel } from "../../../store/slices/productsCarousel-slice";
const RecentlyViewed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchProductCarousel({ _limit: 30 }));
  }, [dispatch]);

  const products = useSelector(
    (state: RootState) => state.productCarouselState.ProductCarousel
  );
  console.log(products);

  // Cấu hình carousel
  const settings = {
    dots: false, // Đặt thành false để xóa dấu chấm dưới carousel
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Số lượng sản phẩm hiển thị trên 1 slide
    slidesToScroll: 4, // Số lượng sản phẩm lướt qua khi nhấn mũi tên
    nextArrow: <SampleNextArrow />, // Custom arrow phải
    prevArrow: <SamplePrevArrow />, // Custom arrow trái
  };

  // Custom arrow phải
  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          backgroundColor: "black",
          borderRadius: "50%",
          position: "absolute",
          right: 10,
          zIndex: 2,
          cursor: "pointer",
        }}
        onClick={onClick}
      ></div>
    );
  }

  // Custom arrow trái
  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          backgroundColor: "black",
          borderRadius: "50%",
          position: "absolute",
          left: 10,
          zIndex: 2,
          cursor: "pointer", // Để thêm hiệu ứng khi hover
        }}
        onClick={onClick}
      ></div>
    );
  }

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Typography
        sx={{
          fontFamily: "inherit",
          fontWeight: 600,
          mb: 4,
          mt: 3,
          textAlign: "center",
          letterSpacing: "0.1rem",
          fontSize: "1.3rem",
        }}
      >
        BEST SELLING PRODUCT
      </Typography>
      {products && products.length > 0 ? (
        <Slider {...settings}>
          {products.map((product: any) => (
            <div key={product.id}>
              <Card
                sx={{
                  maxWidth: 250,
                  textAlign: "center",
                  position: "relative",
                  boxShadow: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(`/shop/detail/${product.id}`);
                }}
              >
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="340"
                  image={product.image}
                  sx={{
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "white",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  ♥
                </Box>

                <CardContent>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "16px",
                      fontSize: "0.6rem",
                      fontWeight: "700",
                      padding: "4px 8px",
                      textTransform: "uppercase",
                      mb: 1,
                    }}
                  >
                    {product.condition}
                  </Button>

                  <Typography
                    variant="h6"
                    component="div"
                    className="product-name" // Áp dụng class cho tên sản phẩm
                    sx={{ fontWeight: "bold" }}
                    fontSize={"1rem"}
                  >
                    {product.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="product-brand"
                  >
                    {product.brand}
                  </Typography>

                  <Typography
                    variant="h6"
                    component="div"
                    className="product-price" // Áp dụng class cho giá sản phẩm
                    fontSize={"0.9rem"}
                  >
                    ฿ {product.price}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </Slider>
      ) : (
        <Typography variant="h6">No products available</Typography>
      )}
    </Box>
  );
};

export default RecentlyViewed;
