import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  InputBase,
  TextField,
} from "@mui/material";
import { Search, PersonOutline, LocalMallOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./index.scss";

const Header = () => {
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
          <TextField id="standard-basic" label="Search" variant="standard" />
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

      <Toolbar className="header-center-toolbar">
        <Box className="header-nav-links">
          <Link className="header-link" to="/">
            HOME
          </Link>
          <Link className="header-link" to="/Shop">
            MENS
          </Link>
          <Link className="header-link" to="/Shop">
            BEAUTY
          </Link>
          <Link className="header-link" to="/Shop">
            NEW TODAY
          </Link>
          <Link className="header-link" to="/Shop">
            CLOTHING
          </Link>
          <Link className="header-link" to="/Shop">
            DRESSES
          </Link>
          <Link className="header-link" to="/Shop">
            SHOES
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
