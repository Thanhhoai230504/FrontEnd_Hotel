import React, { useState } from "react";
import BookingModal from "./BookingModal";
import {
  Card,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Wifi, Tv, Bath, Wine, Fan } from "lucide-react";
import { FaRegIdBadge } from "react-icons/fa";

interface Room {
  type: string;
  description: string;
  amenities: string[];
  capacity: number;
  price: number;
  isAvailable: boolean;
  images: string[];
  number: string;
  _id: string;
}

interface SearchRoomCardProps {
  room: Room;
}

const AmenityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "WiFi":
      return <Wifi />;
    case "Tivi":
      return <Tv />;
    case "Bồn tắm":
      return <Bath />;
    case "Mini Bar":
      return <Wine />;
    case "Điều hòa":
      return <Fan />;
    case "Tủ lạnh":
      return <FaRegIdBadge />;
    default:
      return null;
  }
};

const SearchRoomCard: React.FC<SearchRoomCardProps> = ({ room }) => {
  const location = useLocation();
  const searchData = location.state;
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!room) {
    return <Typography color="error">Dữ liệu phòng không hợp lệ</Typography>;
  }

  const handleBookingClick = () => {
    if (!user) {
      navigate("/Login");
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Card
        sx={{ display: "flex", gap: 5, p: 2, boxShadow: 3, borderRadius: 2 }}
      >
        <CardMedia
          component="img"
          sx={{ width: 256, height: 192, borderRadius: 2 }}
          image={room?.images?.[0] || "fallback-image.jpg"}
          alt={room?.type || "Phòng"}
        />

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            {room.type || "Chưa xác định"}
          </Typography>
          <Typography color="textSecondary">{room.description}</Typography>

          <Typography variant="body2" color="textSecondary">
            Sức chứa: {room.capacity} người
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Số phòng: {room.number}
          </Typography>
          <Link
            to={`/Room/Detail/${room._id}`}
            style={{
              color: "#204357",
              fontWeight: "600",
              fontSize: "0.9rem",
              fontFamily: "'Times New Roman', serif",
            }}
          >
            Chi tiết phòng
          </Link>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 3 }}>
            {room?.amenities?.map((amenity) => (
              <Chip
                key={amenity}
                icon={<AmenityIcon type={amenity} />}
                label={amenity}
                variant="outlined"
              />
            ))}
          </Box>
        </Box>

        <CardActions
          sx={{ flexDirection: "column", alignItems: "flex-end", gap: 1 }}
        >
          <Typography variant="h5" color="error" gutterBottom fontWeight="bold">
            {room.price?.toLocaleString("vi-VN") || 0} VNĐ/đêm
          </Typography>
          <Button
            sx={{ mt: 12 }}
            variant="contained"
            color={room.isAvailable ? "primary" : "inherit"}
            disabled={!room.isAvailable}
            onClick={handleBookingClick}
          >
            {room.isAvailable ? "Đặt phòng" : "Hết phòng"}
          </Button>
        </CardActions>
      </Card>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={room}
        hotelName="Thanh Hoai Hotel"
        checkIn={searchData.checkInDate?.$d || new Date().toISOString()}
        checkOut={searchData.checkOutDate?.$d || new Date().toISOString()}
      />
    </>
  );
};

export default SearchRoomCard;
