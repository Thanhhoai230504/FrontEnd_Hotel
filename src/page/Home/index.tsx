import Footer from "../../layout/Footer";
import Banner from "../../layout/Header";
import ContentBot from "./content/contentBot";
import ContentTop from "./content/contentTop";
import RoomList from "./content/roomList";

const Home: React.FC = () => {
  return (
    <>
      <Banner />
      <ContentTop />
      <RoomList />
      <ContentBot/>
      <Footer/>
    </>
  );
};
export default Home;
