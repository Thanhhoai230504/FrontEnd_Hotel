import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "../page/Home";
import LoginForm from "../page/Login";
import SignupForm from "../page/Singnup";
import RoomDetail from "../page/RoomDetail";
import ScrollToTop from "../components/scrollTop";
import SearchRoomList from "../page/SearchRoom";
import MyBookings from "../page/My_Booking";
import UserTable from "../page/Admin/User";
import RoomTable from "../page/Admin/Room";
import BookingTable from "../page/Admin/Booking";
import PhotoLibrary from "../page/PhotoLibrary";

const Routers = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/SingnUp" element={<SignupForm />} />
        <Route path="/Room/Detail/:id" element={<RoomDetail />} />
        <Route path="/SearchRoom" element={<SearchRoomList />} />
        <Route path="/MyBookings" element={<MyBookings />} />
        <Route path="/Admin/Users" element={<UserTable />} />
        <Route path="/Admin/Rooms" element={<RoomTable />} />
        <Route path="/Admin/Bookings" element={<BookingTable />} />
        <Route path="/Gallery" element={<PhotoLibrary />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default Routers;
