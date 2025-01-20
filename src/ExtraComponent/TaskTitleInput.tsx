import React, {  } from 'react';
import './TaskTitleInput.css'; // Import the CSS file

interface TaskTitleInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const TaskTitleInput: React.FC<TaskTitleInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="task-title-input"
    />
  );
};

export default TaskTitleInput;
