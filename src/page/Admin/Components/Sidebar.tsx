import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PeopleIcon from "@mui/icons-material/People";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import InsertChartIcon from "@mui/icons-material/InsertChart";
function Sidebar() {
  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    {
      text: "Room Management",
      icon: <MeetingRoomIcon />,
      path: "/Admin/Rooms",
    },
    { text: "User Management", icon: <PeopleIcon />, path: "/Admin/Users" },
    {
      text: "Booking Management",
      icon: <EventAvailableIcon />,
      path: "/Admin/Bookings",
    },
    {
      text: "Booking Statistics",
      icon: <InsertChartIcon />,
      path: "/Admin/BookingStatistics",
    },
  ];

  return (
    <Box sx={{ display: "flex", height: "320px", bgcolor: "#f5f5f5" }} pt={3}>
      <Paper
        elevation={1}
        sx={{
          width: 240,
          bgcolor: "white",
          borderRadius: 0,
          height: "100%",
          overflow: "auto",
        }}
      >
        <List sx={{ pt: 2 }}>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              {/* Sử dụng Link để tạo liên kết */}
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: "text.secondary",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        color: "text.primary",
                      }}
                    >
                      {item.text}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Sidebar;
