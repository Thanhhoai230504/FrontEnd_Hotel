import { Box, Button, Container, Typography } from "@mui/material";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

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
        boxSizing={"border-box"}
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
            boxSizing: "border-box",
            overflow: "hidden", // Ngăn tràn nội dung
            maxWidth: "100%", // Đảm bảo không vượt quá kích thước khối cha
            flexShrink: 1, // Co lại nếu không đủ không gian
          }}
        >
          <Container maxWidth="lg" sx={{ paddingLeft: 4, paddingRight: 4 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ mb: 2, textAlign: "center" }}
            >
              THƯ VIỆN HÌNH ẢNH
            </Typography>
            <Typography
              sx={{
                mb: 3,
                lineHeight: 1.8,
                textAlign: "justify", // Canh đều nội dung
                wordWrap: "break-word", // Tự động xuống dòng nếu từ quá dài
                fontSize: "17px",
              }}
            >
              Trải nghiệm kỳ nghỉ dưỡng riêng tư miền nhiệt đới với nắng vàng,
              biển xanh và cát trắng tại một trong những khu nghỉ dưỡng biển đẹp
              nhất Việt Nam. Còn gì tuyệt vời hơn khi được đắm mình vào trong
              trong thế giới thiên nhiên hoang sơ bên vịnh biển riêng tư và cảm
              nhận phong cách thiết kế độc đáo của khu nghỉ dưỡng là sự kết hợp
              hoàn hảo giữa văn hóa Việt Nam truyền thống và lối kiến trúc đương
              đại. Hãy trải nghiệm ẩm thực tinh tuy và tận hưởng dịch vụ tận tâm
              từ đội ngũ nhân viên người địa phương.
            </Typography>
            <StyledButton
              variant="contained"
              sx={{
                mb: 2,
                alignSelf: "center", // Đảm bảo nút nằm gọn trong khối
              }}
              onClick={click}
            >
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
              maxWidth: "100%", // Không vượt quá chiều rộng của khối cha
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ContentTop;
