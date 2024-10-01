import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import Content from "./components/Content";
import "./Home.scss";
const Home: React.FC = () => {
  return (
    <div className="grid-layout">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default Home;
