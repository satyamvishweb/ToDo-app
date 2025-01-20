import React from "react";
import "./Button.css"; // Import the CSS file for styling

// Define the props interface
interface ButtonProps {
  text: string; // The text to display on the button
  onClick: () => void; // Function to handle the button click
  bgColor?: string; // Background color (optional)
  textColor?: string; // Text color (optional)
  size?: string; // Font size (optional)
  fontFamily?: string; // Font family (optional)
  border?: string; // Border style (optional)
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  bgColor,
  textColor,
  size,
  fontFamily,
  border, // Added border to destructure the props
}) => {
  return (
    <button
      className="custom-button mx-1"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontSize: size,
        fontFamily: fontFamily,
        border: border, // Apply the border prop here
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
