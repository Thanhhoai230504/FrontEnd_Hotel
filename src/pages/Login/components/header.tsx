import {
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Badge,
  Box,
  Typography,
} from "@mui/material";
import { Search, PersonOutline, LocalMallOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom"; // Giả sử bạn dùng react-router-dom

type Props = {};

const HeaderLogin = (props: Props) => {
  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      className="header-app-bar"
    >
      <Toolbar className="header-toolbar">
        <Box className="header-actions">
          <Link className="header-link" to="/">
            REVOLVE
          </Link>
          <Link className="header-link" to="/">
            FWRD
          </Link>
        </Box>

        <Box className="header-center-toolbar">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                letterSpacing: "0.1rem",
                fontSize: "2rem",
                textAlign: "center",
                margin: "2px auto",
                color: "black",
                paddingLeft: "100px",
              }}
            >
              REVOLVE
            </Typography>
          </Link>
        </Box>

        <Box className="header-actions">
          <InputBase placeholder="Search…" className="header-search" />
          <IconButton>
            <Search className="header-icon" />
          </IconButton>
          <IconButton>
            <Link to="/Login" className="header-link">
              <Badge badgeContent={0} color="secondary">
                <PersonOutline className="header-icon" />
              </Badge>
            </Link>
          </IconButton>
          <IconButton>
            <Link to="/Cart" className="header-link">
              <Badge badgeContent={0} color="secondary">
                <LocalMallOutlined className="header-icon" />
              </Badge>
            </Link>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderLogin;
