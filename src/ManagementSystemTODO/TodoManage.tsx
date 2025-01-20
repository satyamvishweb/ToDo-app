import React from "react";
import NavTab from "../Component/NavTab";

const TodoManage: React.FC = () => {
  // Retrieve user data from localStorage to conditionally render UI

  return (
    <div className="container-fluid">
      <NavTab />
    </div>
  );
};

export default TodoManage;
