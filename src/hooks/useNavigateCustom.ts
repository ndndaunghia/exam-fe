import { useNavigate } from "react-router-dom";

const useNavigateCustom = () => {
  const navigate = useNavigate();

  const handleNavigate = (linkTo: string) => {
    navigate(linkTo);
  };
  return {
    handleNavigate,
  }
};

export default useNavigateCustom;
