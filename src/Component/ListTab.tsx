import React from "react";
import TaskList from "./TaskList";

const ListTab: React.FC = () => {
  return (
    <div>
      {/* Just pass the title to TaskList */}
      <TaskList title="Todo" />
    </div>
  );
};

export default ListTab;
