// import {
//   Box,
//   Grid,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
// } from "@mui/material";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { fetchCategories } from "../../store/slices/categories-slice";
// import { useSelector } from "react-redux";

// const categories = [
//   "View All",
//   "Basic",
//   "Crew Neck",
//   "Graphic",
//   "Hoodie",
//   "Zip-Up",
// ];

// const Navbar = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   const categoriesList = useSelector(
//     (state: any) => state.categoriesState.Categories
//   );
//   return (
//     <Box
//       className="Navbar-container"
//       sx={{
//         flex: 1,
//         marginTop: "150px",
//         padding: "16px",
//         boxSizing: "border-box",
//         left: 0,
//         top: 0,
//         height: "100vh",
//         overflowY: "auto",
//         backgroundColor: "white",
//       }}
//     >
//       <Typography
//         variant="overline"
//         display="block"
//         gutterBottom
//         sx={{
//           color: "#666",
//           fontSize: "12px",
//           marginBottom: "8px",
//         }}
//       >
//         CLOTHING
//       </Typography>

//       {/* Phần tiêu đề chính */}
//       <Typography
//         variant="h3"
//         gutterBottom
//         sx={{
//           fontSize: "29px",
//           fontWeight: "600",
//           letterSpacing: "0.07em",
//         }}
//       >
//         CLOTHING
//       </Typography>

//       {/* Bố cục chia làm 2 phần */}
//       <Grid container spacing={2}>
//         {/* Phần danh mục */}
//         <Grid item xs={12}>
//           <Typography
//             variant="h6"
//             gutterBottom
//             sx={{
//               fontWeight: "bold",
//               fontSize: "13px",
//               marginBottom: "16px",
//             }}
//           >
//             CATEGORY
//           </Typography>
//           <Divider sx={{ marginBottom: "16px" }} />
//           <List>
//             {categoriesList.map(
//               (category: { id: string; name: string }, index: number) => (
//                 <ListItem
//                   component="button"
//                   key={index}
//                   sx={{
//                     padding: "8px 0",
//                     textAlign: "left",
//                     fontSize: "14px",
//                     fontWeight: "300",
//                     border: "none",
//                     backgroundColor: "white",
//                     cursor: "pointer",
//                     "&:hover": {
//                       textDecoration: "underline",
//                       color: "black",
//                     },
//                   }}
//                 >
//                   <ListItemText
//                     primary={category.name}
//                     sx={{
//                       textAlign: "left",
//                       fontSize: "14px",
//                     }}
//                   />
//                 </ListItem>
//               )
//             )}
//           </List>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Navbar;

import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../store/slices/categories-slice";

const Navbar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const categoriesList = useSelector(
    (state: any) => state.categoriesState.Categories
  );

  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    try {
      navigate(`/shop/${categoryId}`);
    } catch (error) {
      console.error("Error navigating to category:", error);
    }
  };
  return (
    <Box
      className="Navbar-container"
      sx={{
        flex: 1,
        marginTop: "150px",
        padding: "16px",
        boxSizing: "border-box",
        left: 0,
        top: 0,
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "white",
      }}
    >
      <Typography
        variant="overline"
        display="block"
        gutterBottom
        sx={{
          color: "#666",
          fontSize: "12px",
          marginBottom: "8px",
        }}
      >
        CLOTHING
      </Typography>

      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontSize: "29px",
          fontWeight: "600",
          letterSpacing: "0.07em",
        }}
      >
        CLOTHING
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: "13px",
              marginBottom: "16px",
            }}
          >
            CATEGORY
          </Typography>
          <Divider sx={{ marginBottom: "16px" }} />
          <List>
            {categoriesList.map((category: { id: string; name: string }) => (
              <ListItem
                component="button"
                key={category.id} // Use category.id as key
                onClick={() => handleCategoryClick(category.id)} // Call the function on click
                sx={{
                  padding: "8px 0",
                  textAlign: "left",
                  fontSize: "14px",
                  fontWeight: "300",
                  border: "none",
                  backgroundColor: "white",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                    color: "black",
                  },
                }}
              >
                <ListItemText
                  primary={category.name}
                  sx={{
                    textAlign: "left",
                    fontSize: "14px",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Navbar;
