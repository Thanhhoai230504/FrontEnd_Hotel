import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/font/Giants.ttf";
import UpdateEmailModal from "../../components/Modal/ModalEmailProfile";
import UpdatePasswordModal from "../../components/Modal/ModalPasswordProfile";
import UpdateDisplayNameModal from "../../components/Modal/ModalUserNameProfile";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { fetchUsersProfile } from "../../store/slices/userProfile-slice";

const AccountSettings = () => {
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openUserNameModal, setOpenUserNameModal] = useState(false);
  const dispatch = useDispatch();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const userProfile = useSelector(
    (state: any) => state.userProfileState.usersProfile
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchUsersProfile(user.id));
    }
  }, [dispatch, user?.id]);

  const profile = userProfile.length > 0 ? userProfile[0] : null;

  const handleOpenEmailModal = () => setOpenEmailModal(true);
  const handleCloseEmailModal = () => setOpenEmailModal(false);

  const handleOpenPasswordModal = () => setOpenPasswordModal(true);
  const handleClosePasswordModal = () => setOpenPasswordModal(false);

  const handleOpenUserNameModal = () => setOpenUserNameModal(true);
  const handleCloseUserNameModal = () => setOpenUserNameModal(false);

  return (
    <>
      <Header />
      <Box sx={{ marginTop: "70px", marginLeft: "150px" }}>
        <Typography
          sx={{
            fontSize: "2rem",
            letterSpacing: "0.09rem",
            fontFamily: "Giants",
          }}
          gutterBottom
        >
          ACCOUNT SETTINGS
        </Typography>

        <Grid container>
          <Grid item xs={12} md={9}>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: "500",
                letterSpacing: "0.09rem",
                mt: 1,
                mb: 2,
              }}
            >
              SIGN IN DETAILS
            </Typography>

            <Paper
              elevation={1}
              sx={{
                padding: "16px",
                marginBottom: "20px",
                backgroundColor: "#F4F4F4",
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                email
              </Typography>
              <Typography sx={{ fontSize: "0.9rem" }}>
                {profile ? profile.email : "No email found"}
              </Typography>
              <Button
                sx={{
                  color: "#6E6E6E",
                  textDecoration: "underline",
                  textTransform: "none",
                  ml: -2,
                  mt: 1,
                  "&:hover": {
                    bgcolor: "#F4F4F4",
                  },
                }}
                onClick={handleOpenEmailModal}
              >
                edit
              </Button>{" "}
            </Paper>

            <Paper
              elevation={1}
              sx={{
                padding: "16px",
                marginBottom: "20px",
                backgroundColor: "#F4F4F4",
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                password
              </Typography>
              <Typography variant="body1">●●●●●●</Typography>
              <Button
                sx={{
                  color: "#6E6E6E",
                  textDecoration: "underline",
                  textTransform: "none",
                  ml: -1,
                  mt: 1,
                  "&:hover": {
                    bgcolor: "#F4F4F4",
                  },
                }}
                onClick={handleOpenPasswordModal}
              >
                change my password
              </Button>
            </Paper>

            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: "500",
                letterSpacing: "0.09rem",
                mb: 2,
              }}
            >
              MY PROFILE
            </Typography>

            <Paper
              elevation={1}
              sx={{
                padding: "16px",
                marginBottom: "20px",
                backgroundColor: "#F4F4F4",
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                username
              </Typography>
              <Typography sx={{ fontSize: "0.9rem" }}>
                {profile ? profile.userName : "No username found"}
              </Typography>
              <Button
                sx={{
                  color: "#6E6E6E",
                  textDecoration: "underline",
                  textTransform: "none",
                  ml: -2,
                  mt: 1,
                  "&:hover": {
                    bgcolor: "#F4F4F4",
                  },
                }}
                onClick={handleOpenUserNameModal}
              >
                edit
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <UpdateEmailModal
          open={openEmailModal}
          user={user}
          onClose={handleCloseEmailModal}
        />
        <UpdatePasswordModal
          open={openPasswordModal}
          user={user}
          onClose={handleClosePasswordModal}
        />
        <UpdateDisplayNameModal
          open={openUserNameModal}
          user={user}
          onClose={handleCloseUserNameModal}
        />
      </Box>
      <Footer />
    </>
  );
};

export default AccountSettings;
