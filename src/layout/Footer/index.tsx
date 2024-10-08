import { Facebook, Google, Instagram } from "@mui/icons-material";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Badge } from "react-bootstrap";
import "./Footer.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const Footer = () => {
  return (
    <div className="footer-container">
      {/* <Grid
        container
        spacing={4}
        sx={{
          padding: "2rem 0",
          backgroundColor: "#F4F4F4",
          height: "242px",
          mb: 1,
        }}
      >
       
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            ELEVATE YOUR FASHION GAME
          </Typography>
          <Typography variant="body2" gutterBottom>
            Sign up for our email newsletter and <strong>GET 10% OFF.</strong>{" "}
            It’s like having a stylish BFF. Opt out any time.
          </Typography>
          <Link href="#" underline="hover">
            privacy policy
          </Link>
          <Grid container sx={{ mt: 2 }} alignItems="center">
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                placeholder="Enter your e-mail."
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                sx={{
                  height: "100%",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                <ArrowForwardIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>

      
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            HELP US IMPROVE
          </Typography>
          <Typography variant="body2" gutterBottom>
            Take a brief survey about today’s visit.
          </Typography>
          <Link href="#" underline="hover" fontWeight="bold">
            BEGIN SURVEY
          </Link>
        </Grid>

        
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            GET REVOLVE ON THE GO
          </Typography>
          <Typography variant="body2" gutterBottom>
            Download our super easy-to-use app available for your iPhone, iPad
            and Android.
          </Typography>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
            alt="App Store"
            style={{ width: "150px", height: "auto" }}
          />
        </Grid>
      </Grid> */}
      <Box>
        {/* //spacing={4} nghĩa là khoảng cách giữa các phần tử con sẽ là 4 đơn vị */}
        <Grid container spacing={4} className="footer-grid">
          <Grid item xs={12} sm={6} md={3} className="footer-grid-item">
            <Typography className="footer-typography">CUSTOMER CARE</Typography>
            <Box component="ul">
              <li>
                <Link href="#" className="footer-link">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  +1-562-926-5672
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Payment Options
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Track Your Order
                </Link>
              </li>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3} className="footer-grid-item">
            <Typography className="footer-typography">
              Shipping & Delivery
            </Typography>
            <Box component="ul">
              <li>
                <Link href="#" className="footer-link">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Gifting REVOLVE
                </Link>
              </li>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3} className="footer-grid-item">
            <Typography className="footer-typography">INFORMATION</Typography>
            <Box component="ul">
              <li>
                <Link href="#" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Stores
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Social Impact
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Careers
                </Link>
              </li>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box className="fwrd-box"></Box>
          </Grid>
        </Grid>

        <Box className="footer-bottom">
          <Box>
            <Typography className="footer-bottom-typography">
              CONNECT
            </Typography>
            <a
              href="https://www.instagram.com/_nth_68/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge className="badge">
                <Instagram className="header-icon" />
              </Badge>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100036930660925"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge className="badge">
                <Facebook className="header-icon" />
              </Badge>
            </a>
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge className="badge">
                <Google className="header-icon" />
              </Badge>
            </a>
          </Box>

          <Typography className="footer-bottom-typographys">
            2024 © Eminent, Inc. All Rights Reserved.
          </Typography>
          <Box component="ul">
            <li>
              <Link href="#" className="footer-link">
                Terms
              </Link>
            </li>
            <li>
              <Link href="#" className="footer-link">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="#" className="footer-link">
                Cookie Preferences
              </Link>
            </li>
            <li>
              <Link href="#" className="footer-link">
                CA Privacy Rights
              </Link>
            </li>
            <li>
              <Link href="#" className="footer-link">
                Your Privacy Choices
              </Link>
            </li>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Footer;
