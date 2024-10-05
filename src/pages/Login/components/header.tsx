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
            justifyContent: "center",
            flexGrow: 1,
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
            <Search sx={{ color: "black" }} />
          </IconButton>
          {isLoggedIn ? (
            <IconButton onClick={handleLogout}>
              <Badge badgeContent={0} color="secondary">
                <ExitToApp className="header-icon" sx={{ color: "black" }} />
              </Badge>
            </IconButton>
          ) : (
            <Link to="/Login" style={{ textDecoration: "none" }}>
              <IconButton>
                <Badge badgeContent={0} color="secondary">
                  <PersonOutline
                    className="header-icon"
                    sx={{ color: "black" }}
                  />
                </Badge>
              </IconButton>
            </Link>
          )}
          <Link to="/Carts">
            <IconButton>
              <Badge badgeContent={0} color="secondary">
                <LocalMallOutlined sx={{ color: "black" }} />
              </Badge>
            </IconButton>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderLogin;
