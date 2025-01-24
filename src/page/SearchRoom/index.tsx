import {
  Box,
  Container,
  Divider,
  Typography,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useSelector } from "react-redux";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header/components/Header";
import { Room } from "../../Types";
import SearchRoomCard from "./components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRoomSearch } from "../../store/slice/roomSearch";
import { useLocation } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import Loading from "../../components/Loading";
import NotFoundSearchRoom from "../../asset/svg/NotFoundSearchRoom.png";
export const SearchRoomList: React.FC = () => {
  const roomSearch: Room[] = useSelector(
    (state: any) => state.roomSearchState.roomSearch
  );
  const loading = useSelector((state: any) => state.roomSearchState.loading);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedRooms, setSortedRooms] = useState<Room[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const searchData = location.state;

  useEffect(() => {
    if (searchData) {
      dispatch(fetchRoomSearch(searchData));
    }
  }, [searchData, dispatch]);

  useEffect(() => {
    const sorted = [...roomSearch].sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });
    setSortedRooms(sorted);
  }, [roomSearch, sortOrder]);

  const handleSortChange = (event: SelectChangeEvent<"asc" | "desc">) => {
    setSortOrder(event.target.value as "asc" | "desc");
  };

  return (
    <Box sx={{ backgroundColor: "#F5F5F5" }}>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h5"
          component="h1"
          color="#8B7355"
          align="center"
          sx={{ mb: 4, mt: 12 }}
        >
          DANH SÁCH PHÒNG
        </Typography>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
              >
                {roomSearch.length} Phòng được tìm thấy
              </Typography>
              <FormControl sx={{ minWidth: 200 }}>
                <Select
                  value={sortOrder}
                  onChange={handleSortChange}
                  displayEmpty
                  size="small"
                >
                  <MenuItem value="asc">Giá: Thấp đến Cao</MenuItem>
                  <MenuItem value="desc">Giá: Cao đến Thấp</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {sortedRooms.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "center",
                  p: 4,
                }}
              >
                <img
                  src={NotFoundSearchRoom}
                  alt="No products in the shopping bag"
                  style={{ width: "400px", height: "auto" }}
                />
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {sortedRooms.map((room) => (
                  <Box key={room._id}>
                    <SearchRoomCard room={room} />
                    <Divider sx={{ mt: 2 }} />
                  </Box>
                ))}
              </Box>
            )}
          </>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default SearchRoomList;
