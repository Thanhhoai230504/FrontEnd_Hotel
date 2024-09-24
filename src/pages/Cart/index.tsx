import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useSelector } from "react-redux";

const ShoppingCart = () => {
  const product = useSelector((state: any) => state.productState.cart);

  // Kiểm tra nếu product không tồn tại
  if (!product) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" color="error">
          No product selected.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8}>
          <Typography variant="h5">PRODUCT DETAILS</Typography>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="overline" sx={{ fontWeight: "bold" }}>
                Condition: {product.condition}
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">
                    Brand: {product.brand}
                  </Typography>
                  <Typography variant="body2">
                    Size: {product.size}, Color: {product.color}
                  </Typography>
                  <Typography variant="body2">
                    Price: ₫ {product.price}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Description: {product.description}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary">
                Add to Cart
              </Button>
              <Button variant="text" color="secondary">
                Buy Now
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">STOCK & SALES</Typography>
              <Typography variant="body2">
                Available Quantity: {product.quantity}
              </Typography>
              <Typography variant="body2">Sold: {product.sold}</Typography>
              <Typography variant="body2">
                Popularity Score: {product.popularityScore}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" fullWidth>
                Contact Seller
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShoppingCart;
