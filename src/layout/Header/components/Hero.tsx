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
        flexDirection: { xs: "column", md: "column" },
        alignItems: "center",
        justifyContent: { xs: "flex-start", md: "center" },
        overflow: "hidden",
        gap: { xs: 4, md: 0 }, // Add gap between elements on mobile
      }}
    >
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
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src={video} type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ thẻ video.
      </video>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: "100px", md: 0 },
          gap: { xs: 4, md: 8 },
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            color: "white",
            textAlign: "center",
            fontWeight: 300,
            fontSize: { xs: "1rem", md: "2rem" },
            px: 2,
            letterSpacing: 2.2,
          }}
        >
          Khu nghỉ dưỡng biển đẳng cấp hoang sơ miền nhiệt đới
        </Typography>

        <Box
          sx={{
            width: "100%",
            px: { xs: 2, md: 0 },
          }}
        >
          <BookingForm />
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
