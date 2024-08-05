import Header from "../components/Header";
import Banner from "../components/Banner";
import BannerCard from "../components/BannerCard";
import { Toaster } from "react-hot-toast";

const HomePage = () => {
  return (
    <>
      <Header />
      <Banner />
      <Toaster position="top-right" reverseOrder={false}/>
      <BannerCard />
    </>
  );
};

export default HomePage;
