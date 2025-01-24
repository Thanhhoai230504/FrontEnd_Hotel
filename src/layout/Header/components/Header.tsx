// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Button,
//   Box,
//   Typography,
//   IconButton,
// } from "@mui/material";
// import {
//   LocalPhoneOutlined,
//   Facebook,
//   Instagram,
//   YouTube,
// } from "@mui/icons-material";
// import Logo from "../../../asset/svg/Logo.jpg";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const Header = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Bạn có chắc chắn muốn đăng xuất?",
//       text: "Bạn sẽ cần đăng nhập lại để tiếp tục sử dụng dịch vụ.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Đăng xuất",
//       cancelButtonText: "Hủy",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         localStorage.removeItem("role");

//         navigate("/");

//         Swal.fire({
//           title: "Đăng xuất thành công",
//           icon: "success",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       }
//     });
//   };

//   return (
//     <AppBar
//       position="fixed"
//       color="transparent"
//       elevation={0}
//       sx={{ background: "rgba(255, 255, 255, 0.9)" }}
//     >
//       <Toolbar
//         sx={{
//           display: "grid",
//           gridTemplateColumns: "1fr auto 1fr", // Chia ra 3 cột, logo sẽ nằm giữa
//           alignItems: "center", // Căn giữa các phần tử trong cột
//         }}
//       >
//         {/* Phần tử bên trái */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           {user?.role === "admin" ? (
//             <>
//               <Link to="/Admin/Rooms">
//                 <Typography sx={{ fontWeight: "600", fontSize: "17px" }}>
//                   Quản Lý Khách Sạn
//                 </Typography>
//               </Link>
//               <Link to="/Profile">
//                 <Typography>Chào | {user.name}</Typography>
//               </Link>
//             </>
//           ) : (
//             <>
//               <IconButton href="#">
//                 <LocalPhoneOutlined />
//               </IconButton>
//               <Typography variant="body1" color="textPrimary">
//                 0394 727 005
//               </Typography>
//               <IconButton>
//                 <Facebook />
//               </IconButton>
//               <IconButton>
//                 <Instagram />
//               </IconButton>
//               <IconButton>
//                 <YouTube />
//               </IconButton>
//               <Link to="/Profile">
//                 {user?.name && <Typography>Chào | {user?.name}</Typography>}
//               </Link>
//             </>
//           )}
//         </Box>

//         {/* Logo trung tâm */}
//         <Link to="/">
//           <Box
//             component="img"
//             src={Logo}
//             alt="InterContinental Logo"
//             sx={{
//               width: "100%", // Chiếm toàn bộ chiều rộng có thể
//               maxWidth: "500px", // Đặt giới hạn lớn hơn
//               height: "110px", // Đảm bảo tỷ lệ không bị méo
//               objectFit: "contain",
//               display: "block", // Đảm bảo logo là một block
//               background: "transparent",
//             }}
//           />
//         </Link>

//         {/* Phần tử bên phải */}
//         <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
//           {user ? (
//             <>
//               <Link to="/MyBookings">
//                 <Button
//                   variant="contained"
//                   sx={{
//                     bgcolor: "#D4C1A5",
//                     color: "black",
//                     "&:hover": {
//                       bgcolor: "#C4B195",
//                     },
//                   }}
//                 >
//                   ĐẶT PHÒNG CỦA TÔI
//                 </Button>
//               </Link>
//               <Button
//                 variant="contained"
//                 sx={{
//                   bgcolor: "#D4C1A5",
//                   color: "black",
//                   "&:hover": {
//                     bgcolor: "#C4B195",
//                   },
//                 }}
//                 onClick={handleLogout}
//               >
//                 ĐĂNG XUẤT
//               </Button>
//             </>
//           ) : (
//             <>
//               <Link to="/MyBookings">
//                 <Button
//                   variant="contained"
//                   sx={{
//                     bgcolor: "#D4C1A5",
//                     color: "black",
//                     "&:hover": {
//                       bgcolor: "#C4B195",
//                     },
//                   }}
//                 >
//                   MY BOOKING
//                 </Button>
//               </Link>
//               <Link to="/Login">
//                 <Button
//                   variant="contained"
//                   sx={{
//                     bgcolor: "#D4C1A5",
//                     color: "black",
//                     "&:hover": {
//                       bgcolor: "#C4B195",
//                     },
//                   }}
//                 >
//                   ĐĂNG NHẬP
//                 </Button>
//               </Link>
//             </>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  useTheme,
  useMediaQuery,
  styled,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Phone,
  Facebook,
  Instagram,
  YouTube,
  Close as CloseIcon,
} from "@mui/icons-material";
import Logo from "../../../asset/svg/Logo.jpg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
interface User {
  name: string;
  role?: string;
}

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#D4C1A5",
  color: "black",
  "&:hover": {
    backgroundColor: "#C4B195",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(1),
  },
}));

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const user: User | null = JSON.parse(localStorage.getItem("user") || "null");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");

        navigate("/");

        Swal.fire({
          title: "Đăng xuất thành công",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const mobileDrawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        <ListItem>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Phone fontSize="small" />
            <Typography variant="body2">0394 727 005</Typography>
          </Box>
        </ListItem>

        <ListItem>
          <Box sx={{ display: "flex", gap: 2 }}>
            <StyledIconButton size="small">
              <Facebook fontSize="small" />
            </StyledIconButton>
            <StyledIconButton size="small">
              <Instagram fontSize="small" />
            </StyledIconButton>
            <StyledIconButton size="small">
              <YouTube fontSize="small" />
            </StyledIconButton>
          </Box>
        </ListItem>

        {user?.role === "admin" ? (
          <>
            <ListItem>
              <Button
                href="/Admin/Rooms"
                fullWidth
                sx={{ justifyContent: "flex-start", fontWeight: 600 }}
              >
                Quản Lý Khách Sạn
              </Button>
            </ListItem>
            <ListItem>
              <Button
                href="/Profile"
                fullWidth
                sx={{ justifyContent: "flex-start" }}
              >
                Chào | {user.name}
              </Button>
            </ListItem>
            <ListItem>
              <StyledButton href="/MyBookings" fullWidth variant="contained">
                ĐẶT PHÒNG CỦA TÔI
              </StyledButton>
            </ListItem>
            <ListItem>
              {user ? (
                <StyledButton
                  fullWidth
                  variant="contained"
                  onClick={handleLogout}
                >
                  ĐĂNG XUẤT
                </StyledButton>
              ) : (
                <StyledButton href="/Login" fullWidth variant="contained">
                  ĐĂNG NHẬP
                </StyledButton>
              )}
            </ListItem>
          </>
        ) : (
          <>
            {user?.name && (
              <ListItem>
                <Button
                  href="/Profile"
                  fullWidth
                  sx={{ justifyContent: "flex-start" }}
                >
                  Chào | {user.name}
                </Button>
              </ListItem>
            )}
            <ListItem>
              <StyledButton href="/MyBookings" fullWidth variant="contained">
                ĐẶT PHÒNG CỦA TÔI
              </StyledButton>
            </ListItem>
            <ListItem>
              {user ? (
                <StyledButton
                  fullWidth
                  variant="contained"
                  onClick={handleLogout}
                >
                  ĐĂNG XUẤT
                </StyledButton>
              ) : (
                <StyledButton href="/Login" fullWidth variant="contained">
                  ĐĂNG NHẬP
                </StyledButton>
              )}
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{ bgcolor: "rgba(255, 255, 255, 0.9)" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {isMobile ? (
          <>
            <Box component="a" href="/" sx={{ display: "block", width: 130 }}>
              <Box
                component="img"
                src={Logo}
                alt="InterContinental Logo"
                sx={{
                  height: 48,
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </>
        ) : (
          <>
            {/* Desktop Layout */}
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}
            >
              {user?.role === "admin" ? (
                <>
                  <Button href="/Admin/Rooms" sx={{ fontWeight: 600 }}>
                    Quản Lý Khách Sạn
                  </Button>
                  <Button href="/Profile">Chào | {user.name}</Button>
                </>
              ) : (
                <>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Phone />
                    <Typography>0394 727 005</Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <StyledIconButton>
                      <Facebook />
                    </StyledIconButton>
                    <StyledIconButton>
                      <Instagram />
                    </StyledIconButton>
                    <StyledIconButton>
                      <YouTube />
                    </StyledIconButton>
                  </Box>
                  {user?.name && (
                    <Button href="/Profile">Chào | {user.name}</Button>
                  )}
                </>
              )}
            </Box>

            <Box component="a" href="/" sx={{ mx: 4 }}>
              <Box
                component="img"
                src={Logo}
                alt="InterContinental Logo"
                sx={{
                  height: 110,
                  width: "auto",
                  maxWidth: 500,
                  objectFit: "contain",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <StyledButton href="/MyBookings" variant="contained">
                ĐẶT PHÒNG CỦA TÔI
              </StyledButton>
              {user ? (
                <StyledButton variant="contained" onClick={handleLogout}>
                  ĐĂNG XUẤT
                </StyledButton>
              ) : (
                <StyledButton href="/Login" variant="contained">
                  ĐĂNG NHẬP
                </StyledButton>
              )}
            </Box>
          </>
        )}
      </Toolbar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
      >
        {mobileDrawer}
      </Drawer>
    </AppBar>
  );
}

export default Header;
