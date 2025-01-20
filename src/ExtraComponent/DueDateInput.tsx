import React from 'react';
import './DueDateInput.css'; // Import the CSS file for styles

interface DueDateInputProps {
  value: string;
  onChange: (newDate: string) => void;
}

const DueDateInput: React.FC<DueDateInputProps> = ({ value, onChange }) => {

  // Function to format the date as DD/MM/YYYY
  // const formatDate = (date: string) => {
  //   if (!date) return '';
  //   const [year, month, day] = date.split('-');
  //   return `${day}/${month}/${year}`;
  // };

  return (
    <div className="due-date-input-container">
      <input
        type="date"
        id="dueDate"
        value={value}
        onChange={(e) => onChange(e.target.value)} // Pass updated value to parent
        className="due-date-input"
      />
      {/* <div className="formatted-date">
        {value && `Formatted Date: ${formatDate(value)}`}
      </div> */}
    </div>
  );
};

export default DueDateInput;
