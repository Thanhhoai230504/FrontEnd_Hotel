import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { fetchAllOrders } from "../../../store/slices/allorder-slice";
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
                {orderList.map((order, index) => (
                  <TableRow
                    key={order.id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e0e0",
                    }}
                  >
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.firstName}</TableCell>
                    <TableCell>{order.telephone}</TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell>
                      {Array.isArray(order.products)
                        ? order.products.reduce(
                            (total, product) => total + product.quantity,
                            0
                          )
                        : 0}
                    </TableCell>

                    <TableCell>
                      {Array.isArray(order.products) ? (
                        <ul
                          style={{
                            padding: 0,
                            margin: 0,
                            listStyleType: "none",
                          }}
                        >
                          {order.products.map((product) => (
                            <li
                              key={product.productId}
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
                      ) : (
                        <span>No products available</span>
                      )}
                    </TableCell>

                    <TableCell> ฿ {order.totalAmount}</TableCell>
                    <TableCell>
                      {moment(order.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                    </TableCell>
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
                  </TableRow>
                ))}
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
