import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
type Props = {};

const Navbar: React.FC<Props> = (props) => {
  return (
    <Grid item md={2} mt={9}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: 2,
          backgroundColor: "transparent",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: "700",
            mt: 1,
          }}
        >
          <AdminPanelSettingsIcon sx={{ marginRight: 1,letterSpacing: "0.1rem", }} />
          Admin Panel
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/Admin/Products"
          sx={{ justifyContent: "flex-start", mb: 1, fontWeight: "600", mt: 1,letterSpacing: "0.1rem", }}
        >
          Products
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/Admin/Orders"
          sx={{ justifyContent: "flex-start", mb: 1, fontWeight: "600" }}
        >
          Order
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/Admin/Users"
          sx={{ justifyContent: "flex-start", mb: 1, fontWeight: "700" }}
        >
          User
        </Button>
      </Box>
    </Grid>
  );
};

export default Navbar;
