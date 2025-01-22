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
  ImageList,
  ImageListItem,
  Stack,
  Pagination,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { Room } from "../../../Types";
import { AppDispatch, RootState } from "../../../store/store";
import Header from "../../../layout/Header/components/Header";
import axiosClient from "../../../api/axiosClient";
import Swal from "sweetalert2";
import RoomModal from "./modal";
import { fetchAllRooms } from "../../../store/slice/roomAdmin";
import Sidebar from "../Components/Sidebar";
import withAdminRoute from "../../../components/hocs/withAdminRoute ";
import Loading from "../../../components/Loading";

const RoomTable: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedRoom, setSelectedRoom] = React.useState<Room | undefined>();
  const [modalTitle, setModalTitle] = React.useState("");
  const [page, setPage] = useState(1);
  const limit = 5;
  const dispatch = useDispatch<AppDispatch>();
  const { rooms, loading } = useSelector(
    (state: RootState) => state.allRoomState
  );

  useEffect(() => {
    const payload = {
      page,
      _limit: limit,
    };
    dispatch(fetchAllRooms(payload));
  }, [dispatch, page, limit]);

  const formatDate = (date: string) => {
    return format(new Date(date), "dd/MM/yyyy HH:mm");
  };

  const handleEdit = (room: Room) => {
    setSelectedRoom(room);
    setModalTitle("Edit Room");
    setModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedRoom(undefined);
    setModalTitle("Add Room");
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
        await axiosClient.delete(`/rooms/${id}`);
        await Swal.fire({
          title: "Deleted!",
          text: "Room has been deleted.",
          icon: "success",
        });
        dispatch(fetchAllRooms({ page: 1, _limit: limit }));
      } catch (error) {
        await Swal.fire({
          title: "Error deleting room",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      }
    }
  };

  // Add null check for rooms
  if (!Array.isArray(rooms)) {
    return <div>No rooms available</div>;
  }

  return (
    <Box sx={{ backgroundColor: "#F9F7F2", minHeight: "100vh" }}>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <Grid container sx={{ mt: 15 }}>
          <Sidebar />

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
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#8B7355" }}
                >
                  Room Management
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAdd}
                >
                  Add Room
                </Button>
              </Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Number</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Capacity</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Images</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Amenities</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rooms.map((room: Room) => (
                    <TableRow key={room._id} hover>
                      <TableCell>{room.type}</TableCell>
                      <TableCell>{room.number}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(room.price)}
                      </TableCell>
                      <TableCell>{room.capacity} persons</TableCell>
                      <TableCell>
                        <Chip
                          label={room.isAvailable ? "Available" : "Occupied"}
                          color={room.isAvailable ? "success" : "error"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <ImageList sx={{ width: 100, height: 60 }} cols={1}>
                          {room.images.slice(0, 1).map((image, index) => (
                            <ImageListItem key={index}>
                              <img
                                src={image}
                                alt={`Room ${room.number}`}
                                loading="lazy"
                                style={{ objectFit: "cover", height: "60px" }}
                              />
                            </ImageListItem>
                          ))}
                        </ImageList>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}
                        >
                          {room.amenities.map((amenity, index) => (
                            <Chip
                              key={index}
                              label={amenity}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => handleEdit(room)}
                          sx={{ mr: 1 }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDelete(room._id)}
                        >
                          <Delete />
                        </IconButton>
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
        </Grid>
      )}
      <RoomModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedRoom(undefined);
        }}
        room={selectedRoom}
        title={modalTitle}
      />
    </Box>
  );
};

export default withAdminRoute(RoomTable);
