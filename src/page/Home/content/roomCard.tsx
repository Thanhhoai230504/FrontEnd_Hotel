import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Room } from "../../../Types";
import { Wifi, Tv, Bath, Wine, Fan } from "lucide-react";
import { FaRegIdBadge } from "react-icons/fa";
type RoomCardProps = {
  room: Room;
};

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
const RoomCard = ({ room }: RoomCardProps) => {
  const navigate = useNavigate();
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  const handleRoomClick = async () => {
    try {
      navigate(`/Room/Detail/${room._id}`);
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };
  return (
    <Card
      sx={{
        maxWidth: 600,
        widows: "100%",
        border: "1px solid #E7E3D8",
        ":hover": { cursor: "pointer" },
      }}
      onClick={handleRoomClick}
    >
      <CardContent sx={{ padding: 0 }}>
        <Swiper
          spaceBetween={10} // Khoảng cách giữa các ảnh
          slidesPerView={1} // Chỉ hiển thị một ảnh mỗi lần
          loop={true} // Quay lại ảnh đầu tiên khi hết
        >
          {room.images?.map((image, index) => (
            <SwiperSlide key={index}>
              <CardMedia
                component="img"
                height="250"
                src={image || "/path/to/default-image.jpg"}
                alt={`Room Image ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Box sx={{ padding: "10px 16px" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 2,
              fontSize: "1.2rem",
              color: "#2C3E50",
            }}
          >
            {room.type}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              color="error"
              sx={{
                fontWeight: 600,
                fontSize: "1.1rem",
                mb: 1,
              }}
            >
              GIÁ: {formatCurrency(room.price)}
              <Typography
                component="span"
                sx={{ fontSize: "0.8rem", ml: 1, color: "#666" }}
              >
                Phòng {room.capacity} khách - Đã GIẢM 70%
              </Typography>
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              MÔ TẢ:
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.9rem" }}
            >
              {room.description}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              TIỆN NGHI:
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
