import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Home, Login, Shop, SignUpForm } from "../pages";

const Routers = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/singnup" element={<SignUpForm />}></Route>

          <Route path="/shop" element={<Shop />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default Routers;
