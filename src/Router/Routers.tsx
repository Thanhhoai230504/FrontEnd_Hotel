import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ScrollToTop from "../components/scrollTop";
import ProtectedRoute from "../hocs/Wrapper";
import { Home, ItemDetail, Login, Shop, SignUpForm } from "../pages";
import Order from "../pages/Admin/Order/Order";
import ProductsAdmin from "../pages/Admin/Product/Products";
import UsersAdmin from "../pages/Admin/Users/users";
import ShoppingCart from "../pages/Cart/index";
import Orders from "../pages/Orders";
import OrderCard from "../pages/UserOrder/userOrder";

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
          <Route path="/shop/categories/:categoryId" element={<Shop />} />
          <Route path="/shop/detail/:id" element={<ItemDetail />}></Route>
          <Route path="/Carts" element={<ShoppingCart />}></Route>
          <Route path="/Orders" element={<Orders />}></Route>
          <Route
            path="/Admin/Products"
            element={
              <ProtectedRoute
                Component={ProductsAdmin}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/Admin/Orders"
            element={
              <ProtectedRoute Component={Order} allowedRoles={["admin"]} />
            }
          ></Route>
          <Route
            path="/Admin/Users"
            element={
              <ProtectedRoute Component={UsersAdmin} allowedRoles={["admin"]} />
            }
          ></Route>

          <Route path="/UserOrders" element={<OrderCard />}></Route>

          <Route path="*" element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default Routers;
