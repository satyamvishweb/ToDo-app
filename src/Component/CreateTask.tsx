import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../Redux/taskSlice";
import Button from "../ExtraComponent/Button";
import Dropdown from "../ExtraComponent/Dropdown";
import DueDateInput from "../ExtraComponent/DueDateInput";
import TaskTitleInput from "../ExtraComponent/TaskTitleInput";
import TextEditor from "../ExtraComponent/TextEditior";
import ReusableModal from "../ExtraComponent/ReusableModal"; // Assuming ReusableModal is in the same folder

interface Task {
  id: number;
  name: string;
  dueDate: string;
  status: string;
  category: string;
  description: string;
}

interface CreateTaskProps {
  ModalLaunchbtn: React.ReactNode; // Accept the ModalLaunchbtn as a prop
}

const CreateTask: React.FC<CreateTaskProps> = ({ ModalLaunchbtn }) => {
  const dispatch = useDispatch();

  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskCategory, setTaskCategory] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [taskStatus, setTaskStatus] = useState<string>("pending");
  const [taskDescription, setTaskDescription] = useState<string>("");

  const handleSave = async (closeModal: () => void) => {
    const newTask: Task = {
      id: Date.now(), // Generate a unique ID for the task
      name: taskTitle,
      dueDate: dueDate,
      status: taskStatus,
      category: taskCategory,
      description: taskDescription,
    };

    // Dispatch the new task to Redux
    dispatch(addTask(newTask));

    // Simulate saving logic (e.g., saving to localStorage, API, etc.)
    console.log("Task saved", newTask);
    closeModal(); // Close the modal after saving
    return true; // Indicate success
  };

  return (
    <ReusableModal
      title="Add New Task"
      ModalLaunchbtn={ModalLaunchbtn}
      closebtn="Close"
      savebtn="Save Task"
      Modalsize="modal-lg"
      showPrintbtn={false}
      showSavebtn={true}
      onSave={handleSave}
    >
      <div className="modal-body">
        <TaskTitleInput
          value={taskTitle}
          onChange={setTaskTitle}
          placeholder="Enter task title"
        />
        <div className="my-3">
          <TextEditor value={taskDescription} onChange={setTaskDescription} />
        </div>
        <div className="row">
          <div className="col-md-4">
            <label>Task Category</label>
            <br />
            <Button
  text="Work"
  onClick={() => setTaskCategory("Work")}
  bgColor={taskCategory === "Work" ? "#7B1984" : "#fff"}
  textColor={taskCategory === "Work" ? "#fff" : "#000"} // Conditional text color
/>
<Button
  text="Personal"
  onClick={() => setTaskCategory("Personal")}
  bgColor={taskCategory === "Personal" ? "#7B1984" : "#fff"}
  textColor={taskCategory === "Personal" ? "#fff" : "#000"} // Conditional text color
/>
          </div>
          <div className="col-md-4">
            <label>Due on</label>
            <DueDateInput value={dueDate} onChange={setDueDate} />
          </div>
          <div className="col-md-4">
            <label>Task Status</label>
            <br />
            <Dropdown
              label="Select Status"
              options={["TO-DO", "COMPLETED", "IN-PROGRESS"]}
              onSelect={(option) => setTaskStatus(option)}
            />
          </div>
        </div>
      </div>
    </ReusableModal>
  );
};

export default CreateTask;
