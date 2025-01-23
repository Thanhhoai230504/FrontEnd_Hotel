import React from "react";
import { Avatar, Grid, Typography, Box, Container } from "@mui/material";
import dv1 from "../../../asset/svg/dv1.jpeg";
import dv3 from "../../../asset/svg/dv3.png";
import dv2 from "../../../asset/svg/dv2.webp";
// Danh sách dịch vụ với hình ảnh và nội dung
const services = [
  {
    title: "DỊCH VỤ DÙ LƯỢN",
    description:
      "Trải nghiệm bay dù lượn tuyệt vời tại Đà Nẵng & Hội An với tầm nhìn ngoạn mục",
    image: dv1,
  },
  {
    title: "VÉ THAM QUAN",
    description: "Vé tham quan Bà Nà hill, du thuyền, nhiều khuyến mãi hấp dẫn",
    image: dv2,
  },
  {
    title: "ĐẶC SẢN ĐÀ NẴNG",
    description: "Cung cấp đặc sản đà nẵng, chính gốc, ngon rẻ làm quà",
    image: dv3,
  },
];

function ContentBot() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Tiêu đề */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          DỊCH VỤ
        </Typography>
        <Typography color="textSecondary" maxWidth="sm" margin="auto">
          Thanh Hoài Hotel chia sẻ những vị trí đẹp, khu vui chơi giải trí, kinh
          nghiệm du lịch Đà Nẵng zui zẻ & tiết kiệm, các sự kiện sắp diễn ra tại
          thành phố du lịch.
        </Typography>
      </Box>

      {/* Grid dịch vụ */}
      <Grid container spacing={4} justifyContent="center">
        {services.map((service, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            display="flex"
            justifyContent="center"
          >
            <Box textAlign="center" maxWidth={250}>
              {/* Avatar - Hình tròn */}
              <Avatar
                src={service.image}
                alt={service.title}
                sx={{
                  width: 128,
                  height: 128,
                  margin: "0 auto 16px auto",
                  boxShadow: 3,
                }}
              />
              {/* Tiêu đề dịch vụ */}
              <Typography
                variant="h6"
                fontWeight="bold"
                color="orange"
                gutterBottom
              >
                {service.title}
              </Typography>
              {/* Mô tả */}
              <Typography color="textSecondary" fontSize={14}>
                {service.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ContentBot;
