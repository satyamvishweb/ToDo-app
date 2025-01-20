import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri"; // Import the icon
import "./Dropdown.css";

interface DropdownProps {
  label: string; // Initial label for the dropdown button
  options: string[]; // Array of options to display in the dropdown
  onSelect?: (option: string) => void; // Callback for when an option is selected
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(label);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className="dropdownss-container mx-1">
      {/* Dropdown Button */}
      <button className="dropdownss-button" onClick={toggleDropdown}>
        {selected}
        <RiArrowDropDownLine
          className={`dropdownss-icon ${isOpen ? "open" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="dropdownss-menu">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdownss-item"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
