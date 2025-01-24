import React from "react";
import { Box, Container, Grid, Typography, Link, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import videoFooter from "../../asset/video/footer.mp4";
const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: "#333333",
  color: "#ffffff",
  padding: theme.spacing(6, 0),
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  color: "#ffffff",
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: "#cccccc",
  textDecoration: "none",
  "&:hover": {
    color: "#ffffff",
  },
}));

const Footer = () => {
  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Hotel Information */}
          <Grid item xs={12} md={3}>
            <Box mb={3}>
              {/* Video thay thế hình ảnh */}
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", maxWidth: 200, borderRadius: 8 }}
              >
                <source src={videoFooter} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ video.
              </video>
            </Box>
            <Typography variant="body2" color="#cccccc" paragraph>
              KHÁCH SẠN THANH HOÀI ĐÀ NẴNG
            </Typography>
            <Typography variant="body2" color="#cccccc" paragraph>
              Địa chỉ: 06 – 08 Phạm Thiều, An Hải Bắc, Sơn Trà, Đà Nẵng
            </Typography>
            <Typography variant="body2" color="#cccccc">
              Đặt phòng: 0394.72.70.05
            </Typography>
            <Typography variant="body2" color="#cccccc">
              Hotline Ban: 0394.72.70.05
            </Typography>
            <Typography variant="body2" color="#cccccc">
              Website: www.thanhhoaihotel.vn
            </Typography>
          </Grid>

          {/* Room System */}
          <Grid item xs={12} md={3}>
            <FooterTitle variant="h6">HỆ THỐNG PHÒNG</FooterTitle>
            <Stack spacing={1}>
              <FooterLink href="#">Standard Double</FooterLink>
              <FooterLink href="#">Standard Double Vip</FooterLink>
              <FooterLink href="#">Standard Twin</FooterLink>
              <FooterLink href="#">Superior Triple</FooterLink>
              <FooterLink href="#">Family Vip</FooterLink>
              <FooterLink href="#">Family View Vip</FooterLink>
              <FooterLink href="#">Căn Hộ Gia Đình</FooterLink>
            </Stack>
          </Grid>

          {/* About Us */}
          <Grid item xs={12} md={3}>
            <FooterTitle variant="h6">VỀ CHÚNG TÔI</FooterTitle>
            <Stack spacing={1}>
              <FooterLink href="#">Giới Thiệu</FooterLink>
              <FooterLink href="#">Phòng</FooterLink>
              <FooterLink href="#">Quy Định Chung</FooterLink>
              <FooterLink href="#">Khuyến Mãi</FooterLink>
              <FooterLink href="#">Liên Hệ</FooterLink>
            </Stack>
          </Grid>

          {/* Services */}
          <Grid item xs={12} md={3}>
            <FooterTitle variant="h6">DỊCH VỤ</FooterTitle>
            <Stack spacing={1}>
              <FooterLink href="#">Tour Đà Nẵng</FooterLink>
              <FooterLink href="#">Cho Thuê Xe Máy</FooterLink>
              <FooterLink href="#">Vé Thắm Quan</FooterLink>
              <FooterLink href="#">Đặc Sản Đà Nẵng</FooterLink>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box mt={4} pt={4} borderTop={1} borderColor="rgba(255,255,255,0.1)">
          <Typography variant="body2" color="#cccccc" align="center">
            CTY TNHH MTV TM & DVDL THANH HOÀI
          </Typography>
          <Typography variant="body2" color="#cccccc" align="center">
            Giấy phép kinh doanh dịch vụ lưu trú/lữ hành số 0401800726 cấp ngày
            18/11/2016
          </Typography>
          <Typography variant="body2" color="#cccccc" align="center">
            Do Sở kế Hoạch và Đầu Tư TP Đà Nẵng
          </Typography>
          <Typography variant="body2" color="#cccccc" align="center">
            Người đại diện: Nguyễn Thanh Hoài
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
