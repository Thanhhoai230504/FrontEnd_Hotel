import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react"; // Thêm useRef
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick"; // Import thư viện react-slick
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { fetchProductCarousel } from "../../../store/slices/productsCarousel-slice";
import { RootState } from "../../../store/store";

const RecentlyViewed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sliderRef = useRef<Slider | null>(null); // Dùng useRef để lưu trữ slider

  useEffect(() => {
    dispatch(fetchProductCarousel({ _limit: 30 }));

    // Tự động phát carousel sau 2 giây
    const timer = setTimeout(() => {
      if (sliderRef.current) {
        sliderRef.current.slickPlay(); // Gọi phương thức slickPlay để tự động chạy
      }
    }, 2000);

    return () => clearTimeout(timer); // Xóa timer khi component unmount
  }, [dispatch]);

  const products = useSelector(
    (state: RootState) => state.productCarouselState.ProductCarousel
  );

  // Cấu hình carousel
  const settings = {
    dots: false, // Đặt thành false để xóa dấu chấm dưới carousel
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Số lượng sản phẩm hiển thị trên 1 slide
    slidesToScroll: 4, // Số lượng sản phẩm lướt qua khi nhấn mũi tên
    nextArrow: <SampleNextArrow />, // Custom arrow phải
    prevArrow: <SamplePrevArrow />, // Custom arrow trái
    autoplay: false, // Tắt autoplay mặc định để tự điều khiển
    ref: sliderRef, // Đưa ref của slider vào đây
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
                  margin: "0 auto",
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
                    className="product-name"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 1,
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="product-brand"
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 1,
                    }}
                  >
                    {product.brand}
                  </Typography>

                  <Typography
                    variant="h6"
                    component="div"
                    className="product-price" // Áp dụng class cho giá sản phẩm
                    fontSize={"0.9rem"}
                  >
                    ฿ {product.price.toLocaleString()}
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
