import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home, ItemDetail, Login, Shop, SignUpForm } from "../pages";
import ShoppingCart from "../pages/Cart/index";
import ScrollToTop from "../components/scrollTop";

const Routers = () => {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/singnup" element={<SignUpForm />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          {/* <Route path="/shop/:categoryId" element={<ProductList />} /> */}
          <Route path="/shop/:id" element={<ItemDetail />}></Route>
          <Route path="/ShoppingCart" element={<ShoppingCart />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default Routers;
