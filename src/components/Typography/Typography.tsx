import React from 'react';
import cn from "classnames";
import "./config.css";
// import TypographyType from "./Typography.type";

const variantsMapping: Record<string, keyof JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subheading1: "h6",
  subheading2: "h6",
  body1: "p",
  body2: "p",
};

type TypographyProps = {
  variant: string;
  color?: string;
  className?: string;
  font?: string;
  children: React.ReactNode;
};

const Typography: React.FC<TypographyProps> = ({ variant, color, font, className, children, ...props }) => {
  const Component = variant ? variantsMapping[variant] : "p";

  return (
    <Component
      className={cn(className, {
        [`typography--variant-${variant}`]: variant,
        [`typography--color-${color}`]: color,
        [`typography--font-${font}`]: font,
      })}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
