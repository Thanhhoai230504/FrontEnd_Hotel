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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axiosClient from "../../../api/axiosClient";
import UserModal from "../../../components/Modal/ModalUser";
import { fetchAllUsers } from "../../../store/slices/allUsers-slice";
import { AppDispatch } from "../../../store/store";
import { UserTable } from "../../../utils/constants";
import HeaderLogin from "../../Login/components/header";
import Navbar from "../components/Navbar";
import TableHeadUser from "../components/tableHeadUser";
import moment from "moment";
const UsersAdmin: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const limit = 12;

  const userList = useSelector((state: any) => state.allUserState.allUsers);
  const loading: boolean = useSelector(
    (state: any) => state.allUserState.loading
  );
  useEffect(() => {
    const payload = {
      page,
      _limit: limit,
    };
    dispatch(fetchAllUsers(payload));
  }, [dispatch, page, limit]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
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
    // Kiểm tra kết quả từ hộp thoại
    if (result.isConfirmed) {
      try {
        await axiosClient.delete(`/users/${id}`);

        await Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        dispatch(fetchAllUsers({ page, _limit: limit }));
      } catch (error) {
        await Swal.fire({
          title: "Error deleting user",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      }
    } else if (result.isDenied) {
      await Swal.fire("User not deleted", "", "info");
    }
  };

  const handleEdit = (user: any) => {
    setModalOpen(true);
    setSelectedUser(user);
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
            Add User
          </Button>
          <UserModal
            open={modalOpen}
            handleClose={handleCloseModal}
            user={selectedUser}
          />
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            <Table>
              <TableHeadUser UserHeader={UserTable} />
              <TableBody>
                {userList && userList.length > 0 ? (
                  userList.map((user: any, index: number) => (
                    <TableRow
                      key={user.id}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#f5f5f5" : "#e0e0e0",
                      }}
                    >
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.password}</TableCell>
                      <TableCell>
                        {moment(user.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={() => handleEdit(user)}
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
                          onClick={() => handleDelete(user.id)}
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
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

export default UsersAdmin;
