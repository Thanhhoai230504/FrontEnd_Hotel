import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ScrollToTop from "../components/scrollTop";
import AdminRoute from "../components/hocs/AdminRoute";
import PrivateRoute from "../components/hocs/PrivateRoute";
import BookingTable from "../page/Admin/Booking";
import RoomTable from "../page/Admin/Room";
import UserTable from "../page/Admin/User";
import Home from "../page/Home";
import LoginForm from "../page/Login";
import MyBookings from "../page/My_Booking";
import PhotoLibrary from "../page/PhotoLibrary";
import RoomDetail from "../page/RoomDetail";
import SearchRoomList from "../page/SearchRoom";
import SignupForm from "../page/Singnup";
import Profile from "../page/Profile";
import BookingStatistics from "../page/Admin/BookingStatistics";

const Routers = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/SingnUp" element={<SignupForm />} />
        <Route path="/Room/Detail/:id" element={<RoomDetail />} />
        <Route path="/SearchRoom" element={<SearchRoomList />} />
        <Route path="/Gallery" element={<PhotoLibrary />} />

        {/* Protected routes (login required) */}
        <Route path="/MyBookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
        <Route path="/Profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

        {/* Admin routes */}
        <Route path="/Admin/Users" element={<AdminRoute><UserTable /></AdminRoute>} />
        <Route path="/Admin/Rooms" element={<AdminRoute><RoomTable /></AdminRoute>} />
        <Route path="/Admin/Bookings" element={<AdminRoute><BookingTable /></AdminRoute>} />
        <Route path="/Admin/BookingStatistics" element={<AdminRoute><BookingStatistics /></AdminRoute>} />

        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default Routers;
