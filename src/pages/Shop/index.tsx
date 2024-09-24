import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import Navbar from "../../layout/Navbar";
import ProductList from "./components/ProductList";
import "./Shop.scss";
type Props = {};

const Shop = (props: Props) => {
  return (
    <div className="shop-container">
      <div style={{ display: "flex" }}>
        <Header />
        <Navbar />
        <ProductList />
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
