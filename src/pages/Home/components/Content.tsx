import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Content.scss";
import { fetchProducts } from "../../../store/slices/product-slice";
import { useDispatch, useSelector } from "react-redux";
import "./Content.scss";
import { RootState } from "../../../store/store";
import { Box, CircularProgress, Typography } from "@mui/material";
import Header from "../../../layout/Header";
import RecentlyViewedCarousel from "./Carousel";
import { fetchProductHome } from "../../../store/slices/productHome-slice";
const Content: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {
      _limit: 12,
    };
    dispatch(fetchProductHome(payload));
  }, [dispatch]);

  const productList = useSelector(
    (state: any) => state.productHomeState.ProductHome
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.productState.loading
  );

  if (productList.length === 0) {
    return (
      <Box>
        <Typography>No product found</Typography>
      </Box>
    );
  }
  if (loading) {
    return (
      <Box>
        <Header />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            height: "100vh",
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

  const productDescriptions3 = [
    "",
    "",
    "JUST IN",
    "ALLSAINTS",
    "",
    "",
    "",
    "ON",
  ];

  const productDescriptions2 = [
    "",
    "",
    "AllSaints, DRKSHDW by Rick Owens, Obey + more",
    "Contemporary silhouettes with a modern edge",
    "",
    "",
    "",
    "The technical activewear label continues to innovate and deliver",
  ];
  const productDescriptions = [
    "",
    "",
    "SHOP THE LATEST",
    "SHOP ALLSAINTS",
    "SHOP THE KNITS",
    "SHOP SNEAKERS",
    "SHOP SUNGLASSES",
    "SHOP THE COLLECTION",
    "SHOP THE COLLECTION",
    "SHOP THE COLLECTION",
    "SHOP THE COLLECTION",
  ];

  return (
    <div className="content-container">
      {productList.map((item: any, index: number) => (
        <div key={item.id} className="product-item">
          {index >= 2 && ( // Thêm nội dung từ dòng thứ 2 trở đi
            <div className="product-overlay">
              <p>{productDescriptions3[index]}</p>
              <div className="info-container">
                <p>{productDescriptions2[index]}</p>
                <Link to={`/shop`}>{productDescriptions[index]}</Link>
              </div>
            </div>
          )}
          <Link to={`/shop`}>
            <img src={item.image} alt="product" className="product-image" />
          </Link>
        </div>
      ))}
      <RecentlyViewedCarousel />
    </div>
  );
};

export default Content;
