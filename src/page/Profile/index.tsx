import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from "@mui/material";
import { Mail, User, Edit, Lock } from "lucide-react";
import Header from "../../layout/Header/components/Header";
import Footer from "../../layout/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchProfiles } from "../../store/slice/Profile";
import { AppDispatch } from "../../store/store";
import EditProfileModal from "./EditProfileModal";
import axiosClient from "../../api/axiosClient";
import Swal from "sweetalert2";
import { User as UserType } from "../../Types";
import Loading from "../../components/Loading";
import avatar from "../../asset/svg/avatar.png";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profileData = useSelector((state: any) => state.profileState.profiles);
  const loading = useSelector((state: any) => state.profileState.loading);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateProfile = async (values: Partial<UserType>) => {
    try {
      if (profileData) {
        await axiosClient.put(`/users/${profileData._id}`, values);

        const storedUser = localStorage.getItem("user");
        const currentUser = storedUser ? JSON.parse(storedUser) : {};

        const updatedUser = {
          ...currentUser,
          name: values.name,
          email: values.email,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));

        await dispatch(fetchProfiles());

        await Swal.fire({
          icon: "success",
          title: "Profile updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      await Swal.fire({
        icon: "error",
        title: "Failed to update profile",
        text: "Please try again later",
        showConfirmButton: true,
      });
    }
  };

  return (
    <>
      <Header />

      {loading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            minHeight: "100vh",
            backgroundColor: "#f5f5f5",
            py: 4,
            mt: 12,
          }}
        >
          <Typography color="#8B7355" variant="h5" align="center" mb={4}>
            THÔNG TIN TÀI KHOẢN
          </Typography>
          <Container maxWidth="sm">
            <Paper
              elevation={3}
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Avatar
                src={avatar}
                sx={{
                  width: 120,
                  height: 120,
                  border: "4px solid #fff",
                  boxShadow: "0 0 20px rgba(0,0,0,0.1)",
                }}
              />

              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                }}
              >
                {profileData.name}
              </Typography>

              <Divider sx={{ width: "100%" }} />

              <List sx={{ width: "100%" }}>
                <ListItem>
                  <ListItemIcon>
                    <User size={24} />
                  </ListItemIcon>
                  <ListItemText primary="Name" secondary={profileData.name} />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <Mail size={24} />
                  </ListItemIcon>
                  <ListItemText primary="Email" secondary={profileData.email} />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <Lock size={24} />
                  </ListItemIcon>
                  <ListItemText primary="Password" secondary="••••••••" />
                </ListItem>
              </List>

              <Button
                variant="contained"
                color="primary"
                startIcon={<Edit size={20} />}
                onClick={handleEditClick}
              >
                Chỉnh sửa thông tin
              </Button>
            </Paper>
          </Container>
        </Box>
      )}
      <Footer />

      <EditProfileModal
        open={isEditModalOpen}
        onClose={handleCloseModal}
        profileData={profileData}
        onSubmit={handleUpdateProfile}
      />
    </>
  );
};

export default Profile;
