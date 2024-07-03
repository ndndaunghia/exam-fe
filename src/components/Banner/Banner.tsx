import studentBanner from "../../assets/student_img_banner.png";
import Colors from "../../config/colors";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import Button from "../Button/Button";
import { FaBookOpen, FaReact } from "react-icons/fa";
import animationData from "../../assets/animation/home-banner-animation.json";
import Lottie from 'react-lottie';

const Banner = () => {
  const defaultOptions = {
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const { handleNavigate } = useNavigateCustom();
  return (
    <section className="pt-20">
      <div className="grid max-w-screen-xl px-12 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12 lg:pt-8">
        <div className="place-self-center lg:col-span-8 sm:col-span-12 lg:mr-auto">
          <p className="max-w-2xl mb-4 text-4xl text-center font-semibold leading-none tracking-tight md:text-5xl xl:text-4xl">
            Nền tảng
          </p>

          <p className="max-w-2xl mb-4 font-semibold text-center  text-primary lg:mb-4 md:text-lg lg:text-4xl ">
            Học & Luyện Thi
          </p>

          <p className="max-w-2xl mb-4 text-4xl font-semibold text-center leading-none tracking-tight md:text-5xl xl:text-4xl">
            Thông minh
          </p>

          <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <Button
              content="Mua khóa học"
              backgroundColor={Colors.secondaryLightColor}
              color="white"
              backgroundHover={Colors.secondaryDarkColor}
              icon={
                <FaBookOpen
                  color="white"
                  size="2rem"
                  style={{ backgroundColor: "transparent" }}
                />
              }
              onClick={() => handleNavigate("/course")}
            />

            <Button
              content="Luyện thi"
              backgroundColor={Colors.primaryLightColor}
              color="white"
              backgroundHover={Colors.primaryDarkColor}
              icon={
                <FaReact
                  color="white"
                  size="2rem"
                  style={{ backgroundColor: "transparent" }}
                />
              }
              onClick={() => handleNavigate("/list-test")}
            />
          </div>
        </div>

        <div className="lg:mt-0 lg:col-span-4 lg:flex sm:col-span-12 sm: my-12 sm:flex sm:justify-center">
          {/* <img src={studentBanner} alt="hero image" /> */}
          <Lottie options={defaultOptions} />
        </div>
      </div>
    </section>
  );
};

export default Banner;
