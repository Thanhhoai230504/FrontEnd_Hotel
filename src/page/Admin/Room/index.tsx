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
  const [occupancy, setOccupancy] = useState<Record<string, string>>({});
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
    fetchOccupancy();
  }, [dispatch, page, limit]);

  const fetchOccupancy = async () => {
    try {
      const response: any = await axiosClient.get("/rooms/occupancy");
      if (response.success) {
        setOccupancy(response.data);
      }
    } catch (error) {
      console.error("Error fetching occupancy:", error);
    }
  };

  const handleEdit = (room: Room) => {
    setSelectedRoom(room);
    setModalTitle("Chỉnh sửa phòng");
    setModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedRoom(undefined);
    setModalTitle("Thêm phòng mới");
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        await axiosClient.delete(`/rooms/${id}`);
        await Swal.fire({
          title: "Đã xóa!",
          text: "Phòng đã được xóa thành công.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        dispatch(fetchAllRooms({ page, _limit: limit }));
        fetchOccupancy();
      } catch (error) {
        await Swal.fire({
          title: "Lỗi",
          text: "Có lỗi xảy ra. Vui lòng thử lại.",
          icon: "error",
        });
      }
    }
  };

  const getRoomStatus = (roomId: string) => {
    const status = occupancy[roomId];
    switch (status) {
      case "checked_in":
        return { label: "Có khách", color: "error" as const };
      case "confirmed":
        return { label: "Đã đặt", color: "warning" as const };
      case "pending":
        return { label: "Chờ xác nhận", color: "info" as const };
      default:
        return { label: "Trống", color: "success" as const };
    }
  };

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
                  Quản Lý Phòng
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAdd}
                  sx={{
                    backgroundColor: "#8B7355",
                    "&:hover": { backgroundColor: "#6d5a43" },
                  }}
                >
                  Thêm phòng
                </Button>
              </Box>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f0eb" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Loại phòng</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Số phòng</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Giá</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Sức chứa</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Trạng thái</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Ảnh</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Tiện nghi</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rooms.map((room: Room) => {
                    const status = getRoomStatus(room._id);
                    return (
                      <TableRow key={room._id} hover>
                        <TableCell>{room.type}</TableCell>
                        <TableCell>{room.number}</TableCell>
                        <TableCell>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(room.price)}
                        </TableCell>
                        <TableCell>{room.capacity} người</TableCell>
                        <TableCell>
                          <Chip
                            label={status.label}
                            color={status.color}
                            size="small"
                            sx={{ fontWeight: "bold" }}
                          />
                        </TableCell>
                        <TableCell>
                          <ImageList sx={{ width: 100, height: 60 }} cols={1}>
                            {room.images.slice(0, 1).map((image, index) => (
                              <ImageListItem key={index}>
                                <img
                                  src={image}
                                  alt={`Phòng ${room.number}`}
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
                    );
                  })}
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
          dispatch(fetchAllRooms({ page, _limit: limit }));
          fetchOccupancy();
        }}
        room={selectedRoom}
        title={modalTitle}
      />
    </Box>
  );
};

export default withAdminRoute(RoomTable);
