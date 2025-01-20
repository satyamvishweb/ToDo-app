import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setCategory, setDueDate } from "../Redux/filterSlice"; // Import actions
import { RootState } from "../Redux/store";
import SearchBar from "../ExtraComponent/SearchBar";
import Dropdown from "../ExtraComponent/Dropdown";
import Button from "../ExtraComponent/Button";
import "./FilterBar.css";
import CreateTask from "../Component/CreateTask";

const FilterBar: React.FC = () => {
  const dispatch = useDispatch(); // Access Redux dispatch function
  const tasks = useSelector((state: RootState) => state.tasks);
  const dueDateFilter = useSelector((state: RootState) => state.filter.dueDate);

  const handleSearch = (value: string) => {
    dispatch(setSearchQuery(value)); // Dispatch search query to Redux store
  };

  const handleCategorySelect = (value: string) => {
    dispatch(setCategory(value)); // Dispatch selected category to Redux store
  };

  const handleDueDateSelect = (value: string) => {
    dispatch(setDueDate(value)); // Dispatch the selected due date filter to Redux store
  };

  const filterTasksByDueDate = (tasks: any[]) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday of the current week
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday of the current week
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // First day of the current month
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the current month

    switch (dueDateFilter) {
      case "Today":
        return tasks.filter(
          (task) =>
            new Date(task.dueDate).toDateString() === today.toDateString()
        );
      case "This Week":
        return tasks.filter((task) => {
          const taskDate = new Date(task.dueDate);
          return taskDate >= startOfWeek && taskDate <= endOfWeek;
        });
      case "This Month":
        return tasks.filter((task) => {
          const taskDate = new Date(task.dueDate);
          return taskDate >= startOfMonth && taskDate <= endOfMonth;
        });
      default:
        return tasks; // No filtering
    }
  };

  return (
    <>
      <div className="filter-bar">
        <div className="filters">
          <p className="tagfilter DeskTop_View">Filter by:</p>
          <div className="d-flex justify-content-between">
            <p className="tagfilter Mobile_view my-1">Filter by</p>
            <Dropdown
              label="Category"
              options={["Work", "Personal"]}
              onSelect={handleCategorySelect}
            />
            <Dropdown
              label="Due Date"
              options={["Today", "This Week", "This Month"]}
              onSelect={handleDueDateSelect}
            />
          </div>
        </div>
        <div className="search-bar-container">
          <SearchBar placeholder="Search..." onSearch={handleSearch} />

          <div className="task-content DeskTop_View">
            <CreateTask
              ModalLaunchbtn={
                <Button
                  text="ADD TASK"
                  onClick={() => console.log("Button clicked!")}
                  bgColor="#7b1984"
                  textColor="white"
                  size="11px"
                  fontFamily="Arial, sans-serif"
                />
              }
            />
          </div>
        </div>
        {/* Directly render filtered tasks inside JSX */}
        <div className="task-list d-none">
          {filterTasksByDueDate(tasks).map((task) => (
            <div key={task.id} className="task-item">
              <p>{task.name}</p>
              <p>{task.dueDate}</p>
              <p>{task.category}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterBar;
