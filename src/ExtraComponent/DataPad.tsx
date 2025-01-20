import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import "./DataPad.css";
import WorkList from "./WorkList";
import Imageobj from "../Component/Imageobj";

const DataPad: React.FC = () => {
  // Fetch all tasks and filter state from Redux store
  const tasks = useSelector((state: RootState) => state.tasks);
  const { searchQuery, category, dueDate } = useSelector(
    (state: RootState) => state.filter
  );

  // Apply filters to tasks
  const filteredTasks = tasks
    .filter((task) => {
      // Filter by search query
      if (searchQuery && !task.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Filter by category (if specified)
      if (category && task.category !== category) {
        return false;
      }
      // Filter by due date (e.g., "Today", "This Week")
      if (dueDate && task.dueDate !== dueDate) {
        return false;
      }
      return true;
    });

  // Group filtered tasks by status
  const taskGroups = {
    "TO-DO": filteredTasks.filter((task) => task.status === "TO-DO"),
    "IN-PROGRESS": filteredTasks.filter((task) => task.status === "IN-PROGRESS"),
    COMPLETED: filteredTasks.filter((task) => task.status === "COMPLETED"),
  };

  // Map status to background colors
  const statusColors: Record<string, string> = {
    "TO-DO": "#fac3ff",
    "IN-PROGRESS": "#85d9f1",
    COMPLETED: "#ceffcc",
  };

  // Check if all task groups are empty
  const isEmpty = filteredTasks.length === 0;

  // Render task category
  const renderTaskCategory = (
    _category: string,
    tasks: (typeof taskGroups)["TO-DO"],
    status: string
  ) => (
    <div
      className="datapad-category datapad-container p-2 mx-2 my-1"
      style={{
        width: "100%",
        backgroundColor: "#f9e2f3",
      }}
    >
      <div
        className="datapad-header my-1"
        style={{
          backgroundColor: statusColors[status],
        }}
      >
        {status}
      </div>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id}>
            <WorkList
              id={task.id}
              name={<span
                style={{
                  textDecoration: status === "COMPLETED" ? "line-through" : "none",
                }}
              >
                {task.name}
              </span>}
              dueDate={task.dueDate}
              category={task.category}
              // onClick={() => console.log(`Clicked task: ${task.id}`)}
              className="custom-worklist" status={""} description={""}            />
          </div>
        ))
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );

  return (
    <>
      {isEmpty ? (
        <div className="empty_div">
          <div>
            <img src={Imageobj.SearchNotFound} alt="No tasks found" />
            <br />
            It looks like we can't find any results that match.
          </div>
        </div>
      ) : (
        <>
          {renderTaskCategory("To-Do", taskGroups["TO-DO"], "TO-DO")}
          {renderTaskCategory(
            "In-Progress",
            taskGroups["IN-PROGRESS"],
            "IN-PROGRESS"
          )}
          {renderTaskCategory("Completed", taskGroups["COMPLETED"], "COMPLETED")}
        </>
      )}
    </>
  );
};

export default DataPad;
