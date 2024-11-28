import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`select-none neon-button text-2xl cursor-pointer transition-all font-bold py-4 px-10 rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
