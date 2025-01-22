import { configureStore } from "@reduxjs/toolkit";
import bookingSlice from "./slice/allBooking"; 
import  RoomSlice  from "./slice/allRoom";
import RoomDetailSlice  from "./slice/roomDetail";
import  RoomSearchSlice from "./slice/roomSearch";
import myBookingSlice from "./slice/myBookings";
import  userSlice  from "./slice/allUser";
import  RoomAllSlice  from "./slice/roomAdmin";
import  ImagesSlice  from "./slice/allImages";
import  ProfileSlice  from "./slice/Profile";
import  BookingStatistics  from "./slice/bookingStatistics";

const store = configureStore({
  reducer: {
    bookingState: bookingSlice, 
    roomState: RoomSlice,
    RoomDetailState: RoomDetailSlice,
    roomSearchState: RoomSearchSlice,
    myBookingState: myBookingSlice,
    allUserState: userSlice,
    allRoomState: RoomAllSlice,
    imagesState:ImagesSlice,
    profileState:ProfileSlice,
    bookingStatisticsState:BookingStatistics
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;