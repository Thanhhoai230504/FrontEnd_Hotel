
import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import {
  LocalPhoneOutlined,
  Facebook,
  Instagram,
  YouTube,
} from "@mui/icons-material";
import Logo from "../../../asset/svg/Logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn đăng xuất?",
      text: "Bạn sẽ cần đăng nhập lại để tiếp tục sử dụng dịch vụ.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đăng xuất",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        // Xóa thông tin người dùng và token khỏi localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");

        // Chuyển hướng về trang chủ
        navigate("/");

        // Hiển thị thông báo đăng xuất thành công
        Swal.fire({
          title: "Đăng xuất thành công",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{ background: "rgba(255, 255, 255, 0.9)" }}
    >
      <Toolbar
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr", // Chia ra 3 cột, logo sẽ nằm giữa
          alignItems: "center", // Căn giữa các phần tử trong cột
        }}
      >
        {/* Phần tử bên trái */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user?.role === "admin" ? (
            <>
              <Link to="/Admin/Rooms">
                <Typography sx={{ fontWeight: "600", fontSize: "17px" }}>
                  Hotel Management
                </Typography>
              </Link>
              <Typography>Hi | {user.name}</Typography>
            </>
          ) : (
            <>
              <IconButton href="#">
                <LocalPhoneOutlined  />
              </IconButton>
              <Typography variant="body1" color="textPrimary">
               0394 727 005
              </Typography>
              <IconButton>
                <Facebook />
              </IconButton>
              <IconButton>
                <Instagram />
              </IconButton>
              <IconButton>
                <YouTube />
              </IconButton>
              {user?.name && <Typography>Hi | {user?.name}</Typography>}
            </>
          )}
        </Box>

        {/* Logo trung tâm */}
        <Link to="/">
          <Box
            component="img"
            src={Logo}
            alt="InterContinental Logo"
            sx={{
              width: "100%", // Chiếm toàn bộ chiều rộng có thể
              maxWidth: "500px", // Đặt giới hạn lớn hơn
              height: "110px", // Đảm bảo tỷ lệ không bị méo
              objectFit: "contain",
              display: "block", // Đảm bảo logo là một block
              background: "transparent",
            }}
          />
        </Link>

        {/* Phần tử bên phải */}
        <Box sx={{ display: "flex", gap: 2,justifyContent:"flex-end" }}>
          {user ? (
            <>
              <Link to="/MyBookings">
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#D4C1A5",
                    color: "black",
                    "&:hover": {
                      bgcolor: "#C4B195",
                    },
                  }}
                >
                  MY BOOKING
                </Button>
              </Link>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#D4C1A5",
                  color: "black",
                  "&:hover": {
                    bgcolor: "#C4B195",
                  },
                }}
                onClick={handleLogout}
              >
                ĐĂNG XUẤT
              </Button>
            </>
          ) : (
            <>
              <Link to="/MyBookings">
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#D4C1A5",
                    color: "black",
                    "&:hover": {
                      bgcolor: "#C4B195",
                    },
                  }}
                >
                  MY BOOKING
                </Button>
              </Link>
              <Link to="/Login">
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#D4C1A5",
                    color: "black",
                    "&:hover": {
                      bgcolor: "#C4B195",
                    },
                  }}
                >
                  ĐĂNG NHẬP
                </Button>
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
