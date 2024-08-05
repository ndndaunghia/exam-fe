import animationError from "../assets/animation/404.json";
import Lottie from "react-lottie";
import Button from "../components/Button/Button";
import useNavigateCustom from "../hooks/useNavigateCustom";
import Colors from "../config/colors";

const ErrorPage = () => {
  const { handleNavigate } = useNavigateCustom();

  const defaultOptions = {
    autoplay: true,
    animationData: animationError,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    // <div className="w-screen h-screen">
    //   <Lottie options={defaultOptions} isClickToPauseDisabled/>
    // </div>
    <section className="bg-white  w-screen h-screen overflow-hidden">
      <div className=" ">
        <div className="mx-auto max-w-screen-sm text-center">
          <Lottie options={defaultOptions} isClickToPauseDisabled />
          <Button
            content="Quay về trang chủ"
            backgroundColor={Colors.secondaryColor}
            color="white"
            backgroundHover="bg-primary-dark"
            onClick={() => handleNavigate("/")}
            margin="auto"
          />
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
