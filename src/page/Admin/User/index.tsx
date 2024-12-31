import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Typography,
  Button,
  Box,
  Grid,
  Stack,
  Pagination,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../../Types";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchAllUsers } from "../../../store/slice/allUser";
import UserModal from "./modal";
import Header from "../../../layout/Header/components/Header";
import axiosClient from "../../../api/axiosClient";
import Swal from "sweetalert2";
import Sidebar from "../Components/Sidebar";
import withAdminRoute from "../../../components/hocs/withAdminRoute ";
import Loading from "../../../components/Loading";

const UserTable: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | undefined>();
  const [modalTitle, setModalTitle] = React.useState("");
  const [page, setPage] = useState(1);
  const limit = 5;
  const dispatch = useDispatch<AppDispatch>();
  const { allUsers, loading } = useSelector(
    (state: RootState) => state.allUserState
  );
  useEffect(() => {
    const payload = {
      page,
      _limit: limit,
    };
    dispatch(fetchAllUsers(payload));
  }, [dispatch, page, limit]);

  const formatDate = (date: string) => {
    return format(new Date(date), "dd/MM/yyyy HH:mm");
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setModalTitle("Edit user");
    setModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedUser(undefined);
    setModalTitle("Add user");
    setModalOpen(true);
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
        await axiosClient.delete(`/users/${id}`);
        await Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        dispatch(fetchAllUsers({ page: 1, _limit: limit }));
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

  return (
    <Box sx={{ backgroundColor: "#F9F7F2", minHeight: "100vh" }}>
      <Header />
      <Grid container sx={{ mt: 15 }}>
        <Sidebar />
        {loading ? (
          <Loading />
        ) : (
          <Grid item xs={12} md={10} pt={3}>
            <TableContainer
              component={Paper}
              sx={{ maxWidth: 1200, margin: "0 auto" }}
            >
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold",color:"#8B7355" }}>
                  User Management
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAdd}
                >
                  Add User
                </Button>
              </Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Password</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Created At
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Updated At
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allUsers?.map((user: User) => (
                    <TableRow key={user._id} hover>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.password}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          color={user.role === "admin" ? "primary" : "default"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell>{formatDate(user.updatedAt)}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 0.5,
                          }}
                        >
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleEdit(user)}
                            sx={{ mr: 1 }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleDelete(user._id)}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
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
                      backgroundColor: "#8B7355",
                      color: "white",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#8B7355",
                      color: "white",
                    },
                  },
                }}
              />
            </Stack>
          </Grid>
        )}

        <UserModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedUser(undefined);
          }}
          user={selectedUser}
          title={modalTitle}
        />
      </Grid>
    </Box>
  );
};

export default withAdminRoute(UserTable);
