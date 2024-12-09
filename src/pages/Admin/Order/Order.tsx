import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  fetchAllOrders,
  updateApprovedCount,
} from "../../../store/slices/allorder-slice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box,
  Button,
  Pagination,
  Stack,
  Grid,
  CircularProgress,
  Typography,
} from "@mui/material";
import HeaderLogin from "../../Login/components/header";
import Navbar from "../components/Navbar";
import TableHeadOrder from "../components/tableHeadOrder";
import { OrderTable } from "../../../utils/constants";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosClient from "../../../api/axiosClient";
import Swal from "sweetalert2";
import moment from "moment";
import "../../../assets/font/Giants.ttf";

type Props = {};

interface Product {
  productId: string;
  name: string;
  img: string;
  quantity: number;
  size: string;
}

const Order: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;

  const orderList = useSelector(
    (state: RootState) => state.allOrderState.orders
  );

  const loading = useSelector(
    (state: RootState) => state.allOrderState.loading
  );

  useEffect(() => {
    const payload = { page, _limit: limit };
    dispatch(fetchAllOrders(payload));
  }, [dispatch, page, limit]);

  // Function to combine products with the same ID and size
  const combineProducts = (products: Product[]): Product[] => {
    const combinedProducts = products.reduce((acc: Product[], product) => {
      const existingProduct = acc.find(
        (p) => p.productId === product.productId && p.size === product.size
      );

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        acc.push({ ...product });
      }

      return acc;
    }, []);

    return combinedProducts;
  };

  const handleDelete = async (id: string) => {
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
        await axiosClient.delete(`/orders/${id}`);
        await Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        dispatch(fetchAllOrders({ page, _limit: limit }));
      } catch (error) {
        await Swal.fire({
          title: "Error deleting order",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      }
    } else if (result.isDenied) {
      await Swal.fire("Order not deleted", "", "info");
    }
  };
  const handleBrowse = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Confirm Update",
        text: "Do you want to update the status of this order?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });

      if (result.isConfirmed) {
        // API request to update order status
        await axiosClient.patch(`/orders/${id}`, {
          status: "Order Approved",
          isViewed: false,
          createdAtBrowse: moment().format(" HH:mm:ss DD/MM/YYYY"),
        });
        await Swal.fire({
          title: "Updated!",
          text: "Order status has been updated.",
          icon: "success",
        });

        // Fetch updated orders
        dispatch(fetchAllOrders({ page, _limit: limit }));
        dispatch(updateApprovedCount());
      }
    } catch (error) {
      console.error(error);
      await Swal.fire({
        title: "Error updating status",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }
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
        <Grid item md={10} sx={{ padding: "0 30px", marginTop: "80px" }}>
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "Giants",
              letterSpacing: "0.1rem",
              fontSize: "2rem",
              mb: 2,
            }}
          >
            ORDER MANAGER
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            <Table>
              <TableHeadOrder OrderTable={OrderTable} />
              <TableBody>
                {orderList.map((order, index) => {
                  const combinedProducts = Array.isArray(order.products)
                    ? combineProducts(order.products)
                    : [];

                  return (
                    <TableRow
                      key={order.id}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#f5f5f5" : "#e0e0e0",
                      }}
                    >
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.firstName}</TableCell>
                      <TableCell>{order.telephone}</TableCell>
                      <TableCell>{order.address}</TableCell>
                      <TableCell>
                        {combinedProducts.reduce(
                          (total, product) => total + product.quantity,
                          0
                        )}
                      </TableCell>
                      <TableCell>
                        <ul
                          style={{
                            padding: 0,
                            margin: 0,
                            listStyleType: "none",
                          }}
                        >
                          {combinedProducts.map((product) => (
                            <li
                              key={`${product.productId}-${product.size}`}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "10px",
                              }}
                            >
                              <img
                                src={product.img}
                                alt={product.name}
                                style={{
                                  width: "80px",
                                  height: "100px",
                                  objectFit: "cover",
                                  cursor: "pointer",
                                }}
                              />
                              <Box>
                                <span
                                  style={{
                                    fontWeight: "600",
                                    fontSize: "0.8rem",
                                    marginBottom: "10px",
                                  }}
                                >
                                  {product.name}
                                </span>{" "}
                                <br />
                                <span style={{ fontSize: "0.8rem" }}>
                                  Quantity: {product.quantity}
                                </span>
                                <br />
                                <span style={{ fontSize: "0.8rem" }}>
                                  Size: {product.size}
                                </span>
                              </Box>
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                        {order.totalAmount.toLocaleString()} VNĐ
                      </TableCell>
                      <TableCell>
                        {moment(order.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                      </TableCell>
                      <TableCell>{order?.createdAtBrowse}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={() => handleDelete(order.id)}
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

                      <TableCell>
                        {order.status === "Order Approved" ? (
                          <Button
                            variant="outlined"
                            fullWidth
                            disabled
                            sx={{
                              bgcolor: "gray",
                              color: "white",
                              borderColor: "gray",
                              "&.Mui-disabled": {
                                color: "white",
                  
                              },
                            }}
                          >
                            Approved
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => handleBrowse(order.id)}
                            sx={{
                              bgcolor: "#3bac3c",
                              color: "white",
                              borderColor: "#3bac3c",
                              "&:hover": {
                                bgcolor: "white",
                                color: "black",
                                borderColor: "#3bac3c",
                              },
                            }}
                          >
                            Browse
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={2} sx={{ alignItems: "center", marginTop: 2 }}>
            <Pagination
              count={5}
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

export default Order;
