import React from "react";
import { Box, Typography } from "@mui/material";
import BookingForm from "../../../components/SearchForm";
import video from "../../../asset/video/videoBanner.mp4";
const Hero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden", // Đảm bảo video không tràn ra ngoài
      }}
    >
      {/* Video nền */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover", // Đảm bảo video phủ hết màn hình
          zIndex: -1, // Đặt video phía sau nội dung khác
        }}
      >
        <source
          src={video} // Đường dẫn đến video của bạn
          type="video/mp4"
        />
        Trình duyệt của bạn không hỗ trợ thẻ video.
      </video>

      {/* Overlay mờ */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Lớp phủ mờ
        }}
      />

      {/* Tiêu đề và nội dung */}
      <Typography
        variant="h3"
        component="h2"
        sx={{
          color: "white",
          textAlign: "center",
          position: "relative",
          fontWeight: 300,
          // mb: 20,
          mt: 20,
          px: 2,
          zIndex: 1, // Đảm bảo nằm trên video
        }}
      >
        Khu nghỉ dưỡng biển đẳng cấp hoang sơ miền nhiệt đới
      </Typography>

      {/* Form tìm kiếm */}
      <BookingForm />
    </Box>
  );
};

export default Hero;
