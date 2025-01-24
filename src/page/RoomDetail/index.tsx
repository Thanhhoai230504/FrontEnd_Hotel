import React, { useEffect } from "react";
import { Container, Box } from "@mui/material";
import RoomDetailComponent from "./components/RoomDetail";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchRoomDetail } from "../../store/slice/roomDetail";
import Header from "../../layout/Header/components/Header";
import Footer from "../../layout/Footer";
import RoomList from "../Home/content/roomList";
import Loading from "../../components/Loading";

function RoomDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const roomData = useSelector((state: any) => state.RoomDetailState.room);
  const loading = useSelector((state: any) => state.RoomDetailState.loading);
  useEffect(() => {
    if (id) {
      dispatch(fetchRoomDetail(id));
    }
  }, [dispatch, id]);
  return (
    <>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            bgcolor: "background.default",
            minHeight: "100vh",
            py: 4,
          }}
        >
          <Container>
            <RoomDetailComponent room={roomData} />
          </Container>
        </Box>
      )}
      <RoomList />
      <Footer />
    </>
  );
}

export default RoomDetail;
