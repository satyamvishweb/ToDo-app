import React, { useState, useEffect, useCallback } from "react";
import "./TaskList.css";
import { FaPlus } from "react-icons/fa6";
import DragBar from "./DragBar";
import CreateTask from "./CreateTask";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, removeMultipleTasks, loadTasks } from "../Redux/taskSlice";
import { RootState } from "../Redux/store";
import Imageobj from "./Imageobj";
import MobileUpdate from "./MobileUpdate";

// interface Task {
//   id: number;
//   name: string;
//   dueDate: string;
//   status: string;
//   category: string;
//   description: string;
// }

interface TaskListProps {
  title: string;
}

const TaskList: React.FC<TaskListProps> = ({  }) => {
  const [isTodoOpen, setIsTodoOpen] = useState(false);
  const [isInProgressOpen, setIsInProgressOpen] = useState(false);
  const [isCompletedOpen, setIsCompletedOpen] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);

  const { searchQuery, category, dueDate } = useSelector(
    (state: RootState) => state.filter
  );

  useEffect(() => {
    // Load tasks from localStorage when the component mounts
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    console.log("Loaded tasks:", savedTasks); 
    if (savedTasks.length > 0) {
      dispatch(loadTasks(savedTasks)); // Load tasks into Redux store
    }
  }, [dispatch]);

  const handleRemove = (id: number) => {
    dispatch(removeTask(id));
  };

  const handleSelectTask = (id: number) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    dispatch(removeMultipleTasks(selectedTasks));
    setSelectedTasks([]); // Clear the selected tasks after deletion
  };

  const filterTasks = useCallback(
    (status: string) => {
      return tasks.filter((task) => {
        return (
          task.status === status &&
          task.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (category ? task.category === category : true) &&
          (dueDate ? task.dueDate === dueDate : true)
        );
      });
    },
    [tasks, searchQuery, category, dueDate]
  );

  const renderTaskSection = (
    status: string,
    backgroundColor: string,
    isOpen: boolean,
    toggleOpen: () => void
  ) => {
    const filtered = filterTasks(status);

    return (
      <div className="task-list" style={{ backgroundColor }}>
        <div className="task-header" onClick={toggleOpen}>
          <span>{`${status} (${filtered.length})`}</span>
          <span className={`arrow ${isOpen ? "up" : "down"} my-auto`}></span>
        </div>

        {isOpen && (
          <div className="task-contentss">
            <div className="DeskTop_View">
              <CreateTask
                ModalLaunchbtn={
                  <button className="add-task">
                    <FaPlus className="my-auto pluseicon" /> ADD TASK
                  </button>
                }
              />
            </div>

            {filtered.length === 0 ? (
              <div className="d-flex justify-content-center align-items-center NoTAsk">
                <p>No tasks available.</p>
              </div>
            ) : (
              filtered.map((task) => (
                <DragBar
                  key={task.id}
                  id={task.id}
                  onDelete={() => handleRemove(task.id)}
                  onSelect={handleSelectTask}
                  isSelected={selectedTasks.includes(task.id)}
                />
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  const isEmpty =
    filterTasks("TO-DO").length === 0 &&
    filterTasks("IN-PROGRESS").length === 0 &&
    filterTasks("COMPLETED").length === 0;

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
          <div className="DeskTop_View">
            <div className="task-headings">
              <div>Task Name</div>
              <div>Due On</div>
              <div>Task Status</div>
              <div>Task Category</div>
            </div>
          </div>

          {renderTaskSection("TO-DO", "#FAC3FF", isTodoOpen, () => setIsTodoOpen(!isTodoOpen))}
          {renderTaskSection("IN-PROGRESS", "#85D9F1", isInProgressOpen, () => setIsInProgressOpen(!isInProgressOpen))}
          {renderTaskSection("COMPLETED", "#CEFFCC", isCompletedOpen, () => setIsCompletedOpen(!isCompletedOpen))}

          <div className="position-relative">
            <MobileUpdate
              handleBulkDelete={handleBulkDelete}
              selectedTasksCount={selectedTasks.length}
              selectedTaskIds={selectedTasks}
            />
          </div>
        </>
      )}
    </>
  );
};

export default TaskList;
