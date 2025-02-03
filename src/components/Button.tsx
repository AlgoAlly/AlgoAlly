import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "accent";
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  onClick,
  children,
  className,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center px-4 py-4 leading-5 transition-all duration-150 rounded-md active:duration-50 active:ring-1 border-1";
  let typeClasses = "";

  switch (variant) {
    case "primary":
      typeClasses = `bg-button-primary-base
                     active:ring-border-secondary
                     border-border-primary
                     active:bg-button-primary-active
                     hover:bg-button-primary-hover`;
      break;
    case "secondary":
      typeClasses = `bg-button-secondary-base
                     active:ring-border-secondary
                     border-border-secondary
                     active:bg-button-secondary-active
                     hover:bg-button-secondary-hover`;
      break;
    case "accent":
      typeClasses = `bg-button-accent-base
                     active:ring-border-accent
                     border-border-accent
                     active:bg-button-accent-active
                     hover:bg-button-accent-hover`;
      break;
    default:
      break;
  }

  return (
    <button
      className={`${className} ${baseClasses} ${typeClasses}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
