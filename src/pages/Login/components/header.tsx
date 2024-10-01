import {
  ExitToApp,
  LocalMallOutlined,
  PersonOutline,
  Search,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

const HeaderLogin = (props: Props) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/Home");
  };
  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{
        borderBottom: "1px solid #e0e0e0",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 1100,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        {/* Left side links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              fontWeight: 700,
              color: "black",
              position: "relative",
            }}
          >
            HOME
          </Link>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              fontWeight: 700,
              color: "black",
              position: "relative",
            }}
          >
            FWRD
          </Link>
        </Box>

        {/* Center title */}
        <Box
          className="header-center-toolbar"
          sx={{
            marginLeft: "240px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Đảm bảo phần tử nằm ở giữa
            flexGrow: 1, // Thêm `flexGrow` để chiếm không gian giữa các phần khác
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "700",
                letterSpacing: "0.1rem",
                fontSize: "2rem",
                textAlign: "center",
                color: "black",
                marginRight: "5px",
              }}
            >
              REVOLVE
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "400",
                letterSpacing: "0.1rem",
                fontSize: "1rem",
                textAlign: "center",
                color: "black",
              }}
            >
              MAN
            </Typography>
          </Link>
        </Box>

        {/* Right side actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <TextField
            id="standard-basic"
            label="Search"
            variant="standard"
            sx={{
              backgroundColor: "#f1f1f1",
              borderRadius: "1px",
              paddingLeft: "2px",
              paddingRight: "2px",
              width: "150px",
              fontSize: "0.9rem",
            }}
          />
          <IconButton>
            <Search sx={{ color: "gray" }} />
          </IconButton>
          <IconButton>
            {isLoggedIn ? (
              <IconButton onClick={handleLogout}>
                <Badge badgeContent={0} color="secondary">
                  <ExitToApp className="header-icon" />
                </Badge>
              </IconButton>
            ) : (
              <IconButton>
                <Link to="/Login" className="header-link">
                  <Badge badgeContent={0} color="secondary">
                    <PersonOutline className="header-icon" />
                  </Badge>
                </Link>
              </IconButton>
            )}
          </IconButton>
          <IconButton>
            <Link to="/Cart">
              <Badge badgeContent={0} color="secondary">
                <LocalMallOutlined sx={{ color: "gray" }} />
              </Badge>
            </Link>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderLogin;
