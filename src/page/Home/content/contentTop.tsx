import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Button, Container, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Header from "../../../layout/Header/components/Header";
import Footer from "../../../layout/Footer";

const theme = createTheme({
  typography: {
    fontFamily: "'Times New Roman', serif",
  },
  palette: {
    primary: {
      main: "#8B7355",
    },
    secondary: {
      main: "#E8DFD8",
    },
  },
});

const StyledButton = styled(Button)({
  backgroundColor: "rgba(139, 115, 85, 0.8)",
  color: "#fff",
  padding: "8px 24px",
  "&:hover": {
    backgroundColor: "rgba(139, 115, 85, 1)",
  },
});

function ContentTop() {
  const navigate = useNavigate();
  const click = () => {
    navigate("/Gallery");
  };
  return (
   
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="row"
        height="calc(100vh - 80px)"
        marginTop="80px"
      >
        {/* Phần bên trái */}
        <Box
          sx={{
            width: "50%",
            backgroundImage:
              'url("https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container maxWidth="sm">
            <Typography
              variant="h2"
              component="h1"
              sx={{
                color: "#fff",
                fontWeight: "light",
                marginBottom: 4,
                textAlign: "center",
              }}
            >
              THIÊN ĐƯỜNG NGHỈ DƯỠNG RIÊNG TƯ
            </Typography>
           
          </Container>
        </Box>

        {/* Phần bên phải */}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Container maxWidth="lg" sx={{ paddingLeft: 4, paddingRight: 4 }}>
            <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
              THƯ VIỆN HÌNH ẢNH
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
              Trải nghiệm kỳ nghỉ dưỡng riêng tư miền nhiệt đới với nắng vàng,
              biển xanh và cát trắng tại một trong những khu nghỉ dưỡng biển đẹp
              nhất Việt Nam. Còn gì tuyệt vời hơn khi được đắm mình vào trong
              trong thế giới thiên nhiên hoang sơ bên vịnh biển riêng tư và cảm
              nhận phong cách thiết kế độc đáo của khu nghỉ dưỡng là sự kết hợp
              hoàn hảo giữa văn hóa Việt Nam truyền thống và lối kiến trúc đương
              đại. Hãy trải nghiệm ẩm thực tinh tuy và tận hưởng dịch vụ tận tâm
              từ đội ngũ nhân viên người địa phương.
            </Typography>
            <StyledButton variant="contained" sx={{ mb: 2 }} onClick={click}>
              KHÁM PHÁ
            </StyledButton>
          </Container>
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
            sx={{
              width: "100%",
              height: "343px",
              objectFit: "cover",
              alignSelf: "flex-end",
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
   
  );
}

export default ContentTop;