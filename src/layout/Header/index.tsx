// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   IconButton,
//   Badge,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import {
//   Search,
//   PersonOutline,
//   LocalMallOutlined,
//   ExitToApp,
// } from "@mui/icons-material";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./Header.scss";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store/store";
// import { useDispatch } from "react-redux";
// import { fetchProductSearch } from "../../store/slices/productSearch-slice";
// import { Product } from "../../store/slices/product-slice";

// const Header = () => {
//   const navigate = useNavigate();
//   const isLoggedIn = localStorage.getItem("isLoggedIn");
//   const [searchValue, setSearchInput] = useState("");
//   const [searchResults, setSearchResults] = useState<Product[]>([]);
//   const dispatch = useDispatch();
//   const products = useSelector(
//     (state: RootState) => state.productSearchState.productSearch
//   );
//   const role = localStorage.getItem("role");
//   const isAdmin = role === "admin";
//   const user = localStorage.getItem("user");

//   useEffect(() => {
//     const payload = {
//       name: searchValue,
//     };
//     dispatch(fetchProductSearch(payload));
//   }, [searchValue, dispatch]);

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("user");
//     navigate("/Home");
//   };

//   // Hàm tìm kiếm sản phẩm
//   const handleSearch = () => {
//     if (searchValue && products) {
//       const filteredProducts: any[] = products.filter((product) =>
//         product.name.toLowerCase().includes(searchValue.toLowerCase())
//       );
//       setSearchResults(filteredProducts);
//     } else {
//       setSearchResults([]);
//     }
//   };

//   return (
//     <Box className="header-container">
//       <AppBar
//         position="fixed"
//         color="default"
//         elevation={0}
//         className="header-app-bar"
//       >
//         <Toolbar className="header-toolbar">
//           <Box className="header-actions">
//             <Link className="header-link" to="/">
//               HOME
//             </Link>
//             {isAdmin && user ? (
//               <Link className="header-link" to="/Admin/Products">
//                 ADMIN
//               </Link>
//             ) : (
//               <Link className="header-link" to="/">
//                 FWRD
//               </Link>
//             )}
//           </Box>

//           <Box className="header-center-toolbar">
//             <Link to="/" style={{ textDecoration: "none" }}>
//               <Typography
//                 variant="h6"
//                 sx={{
//                   fontWeight: "700",
//                   letterSpacing: "0.1rem",
//                   fontSize: "2rem",
//                   textAlign: "center",
//                   margin: "2px auto",
//                   color: "black",
//                   paddingLeft: "210px",
//                 }}
//               >
//                 REVOLVE
//               </Typography>
//             </Link>
//           </Box>

//           <Box className="header-actions">
//             <TextField
//               id="standard-basic"
//               label="Search"
//               variant="standard"
//               value={searchValue}
//               onChange={(e) => setSearchInput(e.target.value)}
//             />
//             <IconButton onClick={handleSearch}>
//               <Search className="header-icon" />
//             </IconButton>
//             {isLoggedIn ? (
//               <IconButton onClick={handleLogout}>
//                 <Badge badgeContent={0} color="secondary">
//                   <ExitToApp className="header-icon" />
//                 </Badge>
//               </IconButton>
//             ) : (
//               <IconButton>
//                 <Link to="/Login" className="header-link">
//                   <Badge badgeContent={0} color="secondary">
//                     <PersonOutline className="header-icon" />
//                   </Badge>
//                 </Link>
//               </IconButton>
//             )}
//             <IconButton>
//               <Link to="/Carts" className="header-link">
//                 <Badge badgeContent={0} color="secondary">
//                   <LocalMallOutlined className="header-icon" />
//                 </Badge>
//               </Link>
//             </IconButton>
//           </Box>
//         </Toolbar>

//         <Toolbar className="header-center-toolbar">
//           <Box className="header-nav-links">
//             <Link className="header-link" to="/">
//               NEW
//             </Link>
//             <Link className="header-link" to="/shop">
//               MENS
//             </Link>
//             <Link className="header-link" to="/shop">
//               BEAUTY
//             </Link>
//             <Link className="header-link" to="/shop">
//               NEW TODAY
//             </Link>
//             <Link className="header-link" to="/shop">
//               CLOTHING
//             </Link>
//             <Link className="header-link" to="/shop">
//               DRESSES
//             </Link>
//             <Link className="header-link" to="/UserOrders">
//               ORDERS
//             </Link>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Hiển thị bảng kết quả tìm kiếm */}
//       {searchResults.length > 0 && (
//         <Box
//           className="search-results"
//           sx={{ padding: "10px", width: "300px", mt: 7 }}
//         >
//           <TableContainer component={Paper} className="table-container">
//             <Table>
//               <TableBody>
//                 {searchResults.map((product) => (
//                   <TableRow key={product.id}>
//                     <TableCell>
//                       <Link to={`/shop/detail/${product.id}`}>
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           style={{
//                             width: "50px",
//                             height: "60px",
//                             objectFit: "cover",
//                             cursor: "pointer",
//                           }}
//                         />
//                       </Link>
//                     </TableCell>
//                     <TableCell>
//                       <Link
//                         to={`/shop/detail/${product.id}`}
//                         style={{ textDecoration: "none", color: "inherit" }}
//                       >
//                         {product.name}
//                       </Link>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Header;
/////////////////

import {
  ExitToApp,
  LocalMallOutlined,
  PersonOutline,
  Search,
  Toll,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Product } from "../../store/slices/product-slice";
import { fetchProductSearch } from "../../store/slices/productSearch-slice";
import { RootState } from "../../store/store";
import "./Header.scss";
import ClearIcon from "@mui/icons-material/Clear"; // Icon X
const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [searchValue, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const products = useSelector(
    (state: RootState) => state.productSearchState.productSearch
  );
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

  useEffect(() => {
    if (searchValue.trim()) {
      const payload = {
        name: searchValue,
      };
      dispatch(fetchProductSearch(payload));
    } else {
      setSearchResults([]); // Nếu không có từ khóa tìm kiếm thì xóa kết quả
    }
  }, [searchValue, dispatch]);

  useEffect(() => {
    if (searchValue && products) {
      const filteredProducts: any[] = products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);
    }
  }, [products, searchValue]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    Swal.fire({
      icon: "success",
      title: "Logout successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/Home");
  };
  const handleClearInput = () => {
    setSearchInput("");
  };
  return (
    <Box className="header-container">
      <AppBar
        position="fixed"
        color="default"
        elevation={0}
        className="header-app-bar"
      >
        <Toolbar className="header-toolbar">
          <Box className="header-actions">
            <Link className="header-link" to="/">
              HOME
            </Link>
            {isAdmin && user ? (
              <Link className="header-link" to="/Admin/Products">
                ADMIN
              </Link>
            ) : (
              <Link className="header-link" to="/">
                FWRD
              </Link>
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isLoggedIn ? (
              <Typography
                sx={{ ml: "10px", fontSize: "0.8rem", mt: 0.5, color: "black" }}
              >
                | HEY {parsedUser?.userName}
              </Typography>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingRight: "50px",
                }}
              >
                <img
                  src="https://st.quantrimang.com/photos/image/2021/09/05/Co-Vietnam.png"
                  alt="Vietnam Flag"
                  style={{
                    width: "20px",
                    height: "15px",
                    marginLeft: "10px",
                    borderRadius: "50%",
                  }}
                />
                <Typography
                  sx={{
                    ml: "10px",
                    fontSize: "0.8rem",
                    color: "black",
                    fontWeight: "600",

                    mt: 0.5,
                  }}
                >
                  | VN
                </Typography>
              </Box>
            )}
          </Box>

          <Box
            className="header-center-toolbar"
            sx={{
              marginLeft: "230px",
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
                position: "relative", // Thay đổi vị trí tương đối
                zIndex: 1400, // Đặt z-index để đảm bảo không bị lật bởi các phần tử khác
                paddingRight: "120px",
                paddingLeft: "40px",
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

          <Box className="header-actions">
            <TextField
              id="standard-basic"
              label="Search"
              variant="standard"
              value={searchValue}
              onChange={(e) => setSearchInput(e.target.value)}
              InputProps={{
                endAdornment: searchValue && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClearInput} edge="end">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <IconButton sx={{ marginTop: "20px" }}>
              <Search className="header-icon" sx={{ color: "black" }} />
            </IconButton>
            {isLoggedIn ? (
              <IconButton sx={{ marginTop: "20px" }} onClick={handleLogout}>
                <Badge className="header-link" badgeContent={0}>
                  <ExitToApp sx={{ color: "black" }} />
                </Badge>
              </IconButton>
            ) : (
              <IconButton sx={{ marginTop: "20px" }}>
                <Link to="/Login" className="header-link">
                  <Badge badgeContent={0}>
                    <PersonOutline className="header-icon" />
                  </Badge>
                </Link>
              </IconButton>
            )}
            <IconButton sx={{ marginTop: "18px" }}>
              <Link to="/Carts" className="header-link">
                <Badge badgeContent={0}>
                  <LocalMallOutlined className="header-icon" />
                </Badge>
              </Link>
            </IconButton>
          </Box>
        </Toolbar>

        <Toolbar className="header-center-toolbar">
          <Box className="header-nav-links">
            <Link className="header-link" to="/shop">
              VIEW ALL
            </Link>
            <Link
              className="header-link"
              to="/shop/categories/9cb88bca-f2c2-4439-8b8f-b732f7d998d5"
            >
              SHIRTS
            </Link>
            <Link
              className="header-link"
              to="/shop/categories/896ce36d-57cf-4aad-8fdf-391d689f5ef3"
            >
              PANTS
            </Link>
            <Link
              className="header-link"
              to="/shop/categories/5ad02318-f4a1-4821-8624-acfbe1ae08c4"
            >
              SHORTS
            </Link>
            <Link
              className="header-link"
              to="/shop/categories/fb106f1e-df36-4e0e-8b45-6b1a9c541d4a"
            >
              JACKET & COATS
            </Link>
            <Link
              className="header-link"
              to="/shop/categories/e475814d-cd9a-4c1a-8380-dc2b560e158c"
            >
              SUITS
            </Link>
            <Link className="header-link" to="/UserOrders">
              ORDERS
            </Link>
          </Box>
        </Toolbar>
        {/* Hiển thị bảng kết quả tìm kiếm */}
        {searchResults.length > 0 && (
          <Box
            className="search-results"
            sx={{ padding: "10px", width: "450px", mt: 7 }}
          >
            <TableContainer component={Paper} className="table-container">
              <Table>
                <TableBody>
                  {searchResults.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Link to={`/shop/detail/${product.id}`}>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{
                              width: "100px",
                              height: "130px",
                              objectFit: "cover",
                              cursor: "pointer",
                            }}
                          />
                        </Link>
                      </TableCell>
                      <TableCell sx={{ fontFamily: "inherit" }}>
                        <Link
                          to={`/shop/detail/${product.id}`}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            fontSize: "0.9rem",
                            letterSpacing: "0.07rem",
                            fontWeight: "500",
                          }}
                        >
                          {product.name}
                          <Typography
                            sx={{
                              fontSize: "0.8rem",
                              letterSpacing: "0.07rem",
                              fontWeight: "500",
                              marginTop: "8px",
                            }}
                          >
                            {" "}
                            ฿ {product.price}{" "}
                          </Typography>
                          <Typography
                            sx={{
                              backgroundColor: "black",
                              color: "white",
                              borderRadius: "16px",
                              fontSize: "10px",
                              padding: "4px 8px",
                              textTransform: "uppercase",
                              width: "fit-content",
                              mt: 1.3,
                            }}
                          >
                            {product.condition}
                          </Typography>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </AppBar>
    </Box>
  );
};

export default Header;
