import React, { useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../../../store/slice/allRoom";
import { Room } from "../../../Types";
import RoomCard from "./roomCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

type RootState = {
  roomState: {
    rooms: { success: boolean; data: Room[] };
  };
};

const  RoomList = () => {
  const roomData = useSelector((state: RootState) => state.roomState.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "#2C3E50",
            mb: 2,
            fontSize: { xs: "2rem", md: "2.5rem" }
          }}
        >
          PHÒNG CỦA CHÚNG TÔI
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#666",
            maxWidth: 800,
            mx: "auto",
            px: 2,
            fontSize: "1.1rem"
          }}
        >
          Thanh Hoài Hotel cung cấp 52 phòng tiêu chuẩn 5 sao với nội thất 100% mới đẹp 
          và đầy đủ tiện nghi hiện đại. Hiện đang giảm giá lên đến 70% trong tháng này!!!
        </Typography>
      </Box>

      <Box sx={{ 
        px: { xs: 2, md: 4 },
        "& .slick-slide": {
          px: 2
        },
        "& .slick-dots": {
          bottom: -40
        },
        "& .slick-prev, & .slick-next": {
          zIndex: 1,
          "&:before": {
            fontSize: "2rem",
            color: "#2C3E50"
          }
        },
        "& .slick-prev": { left: -5 },
        "& .slick-next": { right: -5 }
      }}>
        {roomData?.success && roomData.data && roomData.data.length > 0 ? (
          <Slider {...sliderSettings}>
            {roomData.data.map((room: Room) => (
              <div key={room._id}>
                <RoomCard room={room} />
              </div>
            ))}
          </Slider>
        ) : (
          <Typography variant="h6" textAlign="center">
            Không có phòng nào.
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default RoomList;