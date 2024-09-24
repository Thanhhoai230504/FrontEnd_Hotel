// import { LocalMallOutlined, PersonOutline, Search } from "@mui/icons-material";
// import {
//   AppBar,
//   Badge,
//   Box,
//   IconButton,
//   TextField,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import { Link } from "react-router-dom"; // Giả sử bạn dùng react-router-dom
// import "./headerForm.scss";

// type Props = {};

// const HeaderLogin = (props: Props) => {
//   return (
//     <AppBar
//       position="fixed"
//       color="default"
//       elevation={0}
//       className="header-app-bar"
//     >
//       <Toolbar className="header-toolbar">
//         <Box className="header-actions">
//           <Link className="header-link" to="/">
//             REVOLVE
//           </Link>
//           <Link className="header-link" to="/">
//             FWRD
//           </Link>
//         </Box>

//         <Box className="header-center-toolbar">
//           <Link to="/" style={{ textDecoration: "none" }}>
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: "bold",
//                 letterSpacing: "0.1rem",
//                 fontSize: "2rem",
//                 textAlign: "center",
//                 margin: "2px auto",
//                 color: "black",
//                 paddingLeft: "100px",
//               }}
//             >
//               REVOLVE
//             </Typography>
//           </Link>
//         </Box>

//         <Box className="header-actions">
//           <TextField id="standard-basic" label="Search" variant="standard" />
//           <IconButton>
//             <Search className="header-icon" />
//           </IconButton>
//           <IconButton>
//             <Link to="/Login" className="header-link">
//               <Badge badgeContent={0} color="secondary">
//                 <PersonOutline className="header-icon" />
//               </Badge>
//             </Link>
//           </IconButton>
//           <IconButton>
//             <Link to="/Cart" className="header-link">
//               <Badge badgeContent={0} color="secondary">
//                 <LocalMallOutlined className="header-icon" />
//               </Badge>
//             </Link>
//           </IconButton>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default HeaderLogin;

import { LocalMallOutlined, PersonOutline, Search } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

type Props = {};

const HeaderLogin = (props: Props) => {
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
            REVOLVE
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
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: "0 50px",
            marginTop: "10px",
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                letterSpacing: "0.1rem",
                fontSize: "2rem",
                textAlign: "center",
                color: "black",
                paddingLeft: "165px",
              }}
            >
              REVOLVE
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
            <Link to="/Login">
              <Badge badgeContent={0} color="secondary">
                <PersonOutline sx={{ color: "gray" }} />
              </Badge>
            </Link>
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
