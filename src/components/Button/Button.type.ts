type ButtonType = {
  content: string;
  backgroundColor: string;
  color: string;
  backgroundHover: string;
  icon?: React.ReactNode;
  width?: string;
  margin?: string;
  onClick: () => void;
};

export default ButtonType;
