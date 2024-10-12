import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";
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
      <Box
        sx={{ marginTop: "70px", marginLeft: "150px", marginRight: "150px" }}
      >
        <Typography
          sx={{
            fontSize: "2rem",
            letterSpacing: "0.09rem",
            fontFamily: "Giants",
            marginLeft: "310px",
          }}
          gutterBottom
        >
          ACCOUNT SETTINGS
        </Typography>

        <Grid container spacing={5}>
          <Grid item xs={12} md={3}>
            <Avatar
              alt={profile ? profile.userName : "User"}
              src="data:image/png;base64,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"
              sx={{ width: 200, height: 200 }}
            />
            <Box sx={{ textAlign: "center", ml: -8.5 }}>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                {profile ? profile.userName : "No username found"}
              </Typography>
              <Typography sx={{ fontSize: "0.9rem" }}>
                {profile ? profile.email : "No email found"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography
              sx={{
                fontSize: "0.9rem",
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
              <Typography variant="body1">●●●●●●●●●</Typography>
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
                fontSize: "0.9rem",
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
