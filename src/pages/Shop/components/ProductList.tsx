import {
  Box,
  CircularProgress,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react"; // Import useState
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, Product } from "../../../store/slices/product-slice";
import { AppDispatch, RootState } from "../../../store/store";
import ProductCard from "./ProductItem";
import Header from "../../../layout/Header";
import { useParams } from "react-router-dom";

const ProductList = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const limit = 12;
  const productList: Product[] = useSelector(
    (state: RootState) => state.productState.products
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.productState.loading
  );

  useEffect(() => {
    const payload = {
      page,
      _limit: limit,
      categoryId,
    };
    dispatch(fetchProducts(payload));
  }, [dispatch, page, categoryId]);

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
    <Box
      className="product-list-container"
      sx={{ flexGrow: 1, flex: 3, marginTop: "185px" }}
    >
      <Grid container spacing={2}>
        {productList.map((product: Product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} sx={{ alignItems: "center", marginTop: 2 }}>
        <Pagination
          count={8}
          page={page}
          onChange={(event, value) => setPage(value)}
          variant="outlined"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
              "&.Mui-selected": {
                backgroundColor: "black",
                color: "white",
              },
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default ProductList;
