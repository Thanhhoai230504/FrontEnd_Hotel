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
      navigate(`/shop/categories/${categoryId}`);
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
          letterSpacing: "0.07rem",
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
              letterSpacing: "0.07rem",
            }}
          >
            CATEGORY
          </Typography>
          <Divider sx={{ marginBottom: "16px" }} />
          <List>
            {categoriesList.map((category: { id: string; name: string }) => (
              <ListItem
                component="button"
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                sx={{
                  padding: "8px 0",
                  textAlign: "left",
                  fontSize: "14px",
                  fontWeight: "300",
                  border: "none",
                  letterSpacing: "0.1rem",
                  backgroundColor: "white",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                    color: "black",
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        textAlign: "left",
                        fontSize: "15px",
                        letterSpacing: "0.1rem",
                      }}
                    >
                      {category.name}
                    </Typography>
                  }
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
