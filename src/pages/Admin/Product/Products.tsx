import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axiosClient from "../../../api/axiosClient";
import ProductModal from "../../../components/Modal/ModalProduct";
import { fetchAllProduct } from "../../../store/slices/allProduct";
import { AppDispatch } from "../../../store/store";
import { ProductTable } from "../../../utils/constants/index";
import HeaderLogin from "../../Login/components/header";
import Navbar from "../components/Navbar";
import TableHeadComponent from "../components/tableHeadProduct";
import "../../../assets/font/Giants.ttf";
const ProductsAdmin: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const limit = 12;

  const ProductList = useSelector(
    (state: any) => state.allProductState.allProduct
  );
  const loading: boolean = useSelector(
    (state: any) => state.allProductState.loading
  );

  useEffect(() => {
    const payload = {
      page,
      _limit: limit,
    };
    dispatch(fetchAllProduct(payload));
  }, [dispatch, page, limit]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDelete = async (id: string) => {
    setModalOpen(false);

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosClient.delete(`/products/${id}`);

        await Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        dispatch(fetchAllProduct({ page, _limit: limit }));
      } catch (error) {
        await Swal.fire({
          title: "Error deleting product",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      }
    } else {
      await Swal.fire("Product not deleted", "", "info");
    }
  };

  const handleEdit = (product: any) => {
    setModalOpen(true);
    setSelectedProduct(product);
  };
  if (loading) {
    return (
      <Box>
        <HeaderLogin />
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
      <HeaderLogin />
      <Grid container>
        <Navbar />
        <Grid item md={10} sx={{ padding: "30px", marginTop: "60px" }}>
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "Giants",
              letterSpacing: "0.1rem",
              fontSize: "2rem",
            }}
          >
            PRODUCTS MANAGER
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              maxWidth: 200,
              mt: 2,
              mb: 2,
              bgcolor: "black",
              color: "white",
              borderColor: "black",
              "&:hover": {
                color: "black",
                bgcolor: "white",
                borderColor: "black",
              },
            }}
            onClick={handleOpenModal}
          >
            Add Product
          </Button>
          <ProductModal
            open={modalOpen}
            handleClose={handleCloseModal}
            product={selectedProduct}
          />
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            <Table>
              <TableHeadComponent ProductHeader={ProductTable} />
              <TableBody>
                {ProductList.map((product: any, index: number) => (
                  <TableRow
                    key={product.id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e0e0",
                    }}
                  >
                    <TableCell>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: "100px", height: "120px" }}
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.color}</TableCell>
                    <TableCell>{product.price.toLocaleString()} VNĐ</TableCell>
                    <TableCell>{product.size}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.condition}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => handleEdit(product)}
                        sx={{
                          bgcolor: "#FFC107",
                          color: "black",
                          borderColor: "#FFC107",
                          "&:hover": {
                            bgcolor: "white",
                            color: "black",
                            borderColor: "#FFC107",
                          },
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => handleDelete(product.id)}
                        sx={{
                          bgcolor: "#8B0000",
                          color: "white",
                          borderColor: "#8B0000",
                          "&:hover": {
                            bgcolor: "white",
                            color: "black",
                            borderColor: "#A9A9A9",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={2} sx={{ alignItems: "center", marginTop: 2 }}>
            <Pagination
              count={10}
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductsAdmin;
