import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../../../store/slices/product-slice";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  // const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Lấy id từ URL
  console.log("ItemDetail ~ Product ID from URL:", id);
  // const categories: Categories[] = useSelector(
  //   (state: RootState) => state.categoriesState.Categories // Sửa từ 'categoryState' thành 'categoriesState'
  // );
  // const category = categories.find((c) => c.id.toString() === id);

  const handleProductClick = async () => {
    try {
      navigate(`/shop/${product.id}`);
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 250,
        textAlign: "center",
        position: "relative",
        boxShadow: "none",
        cursor: "pointer",
      }}
      onClick={handleProductClick} // Gọi handleProductClick khi nhấn vào Card
    >
      <CardMedia
        component="img"
        alt={product.name}
        height="340"
        image={product.image}
        sx={{
          objectFit: "cover",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.1)" },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: "white",
          borderRadius: "50%",
          width: 32,
          height: 32,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        ♥
      </Box>

      <CardContent>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "16px",
            fontSize: "10px",
            padding: "4px 8px",
            textTransform: "uppercase",
            mb: 1,
          }}
        >
          {product.condition}
        </Button>

        <Typography
          variant="h6"
          component="div"
          sx={{ fontSize: "16px", fontWeight: "bold" }}
        >
          {product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {product.brand}
        </Typography>

        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", mt: 1 }}
        >
          ฿ {product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

///////////////////////////////

// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
// } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import { Product } from "../../../store/slices/product-slice";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch, RootState } from "../../../store/store";
// import {
//   Categories,
//   fetchCategories,
// } from "../../../store/slices/categories-slice";
// import { useSelector } from "react-redux";
// import { fetchProductsByCategory } from "../../../store/slices/productByCategories";

// type ProductCardProps = {
//   product: Product;
// };

// const ProductCard = ({ product }: ProductCardProps) => {
//   // const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>(); // Lấy id từ URL
//   console.log("ItemDetail ~ Product ID from URL:", id);
//   // const categories: Categories[] = useSelector(
//   //   (state: RootState) => state.categoriesState.Categories // Sửa từ 'categoryState' thành 'categoriesState'
//   // );
//   // const category = categories.find((c) => c.id.toString() === id);

//   const { categoryId } = useParams<{ categoryId: string }>();

//   const handleProductClick = async () => {
//     try {
//       navigate(`/shop/${product.id}`);
//     } catch (error) {
//       console.log("Error fetching product:", error);
//     }
//   };

//   return (
//     <Card
//       sx={{
//         maxWidth: 250,
//         textAlign: "center",
//         position: "relative",
//         boxShadow: "none",
//       }}
//       onClick={handleProductClick} // Gọi handleProductClick khi nhấn vào Card
//     >
//       <CardMedia
//         component="img"
//         alt={product.name}
//         height="340"
//         image={product.image}
//         sx={{
//           objectFit: "cover",
//           transition: "transform 0.3s ease",
//           "&:hover": { transform: "scale(1.1)" },
//         }}
//       />

//       <Box
//         sx={{
//           position: "absolute",
//           top: 10,
//           right: 10,
//           backgroundColor: "white",
//           borderRadius: "50%",
//           width: 32,
//           height: 32,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         ♥
//       </Box>

//       <CardContent>
//         <Button
//           variant="contained"
//           size="small"
//           sx={{
//             backgroundColor: "black",
//             color: "white",
//             borderRadius: "16px",
//             fontSize: "10px",
//             padding: "4px 8px",
//             textTransform: "uppercase",
//             mb: 1,
//           }}
//         >
//           {product.condition}
//         </Button>

//         <Typography
//           variant="h6"
//           component="div"
//           sx={{ fontSize: "16px", fontWeight: "bold" }}
//         >
//           {product.name}
//         </Typography>

//         <Typography variant="body2" color="text.secondary">
//           {product.brand}
//         </Typography>

//         <Typography
//           variant="h6"
//           component="div"
//           sx={{ fontWeight: "bold", mt: 1 }}
//         >
//           ฿ {product.price}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductCard;
