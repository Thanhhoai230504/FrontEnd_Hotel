import { Box } from "@mui/material";
import Header from "./components/Header";
import Hero from "./components/Hero";

const Banner = () => {
  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      <Header />
      <Hero />
    </Box>
  );
};

export default Banner;
