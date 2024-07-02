// src/components/Button/Button.tsx
import React from "react";
import ButtonType from "./Button.type";

export const Button: React.FC<ButtonType> = ({
  content,
  backgroundColor,
  color,
  backgroundHover,
  icon,
  width,
  margin,
  onClick,
}) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor,
    color,
    border: "none",
    padding: "0.5rem 0.5rem",
    fontWeight: "bold",
    minWidth: "10rem",
    borderRadius: "0.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s ease",
    width,
    margin,
  };

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    (event.target as HTMLButtonElement).style.backgroundColor = backgroundHover;
  };

  const handleMouseLeave = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    (event.target as HTMLButtonElement).style.backgroundColor = backgroundColor;
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {icon && <span style={{ marginRight: "8px" }}>{icon}</span>}
      {content}
    </button>
  );
};

export default Button;
