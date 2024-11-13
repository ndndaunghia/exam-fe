import { Toaster } from "react-hot-toast";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import BannerCard from "../../components/BannerCard";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <Banner />
      <Toaster position="top-right" reverseOrder={false} />
      <BannerCard />
      <Footer />
    </>
  );
};

export default HomePage;
