import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store"; // Adjust the import path for your store
import { editTask } from "../Redux/taskSlice"; // Adjust the import path for your slice
import TaskTitleInput from "../ExtraComponent/TaskTitleInput";
import DueDateInput from "../ExtraComponent/DueDateInput";
import Button from "../ExtraComponent/Button";
import Dropdown from "../ExtraComponent/Dropdown";
import TextEditor from "../ExtraComponent/TextEditior";

// Reusable Modal component (Assumed to be imported already)
import ReusableModal from "../ExtraComponent/ReusableModal";

interface BoardUpdateProps {
  id: number; // Only id is passed as a prop
  onSubmit: () => void; // Expecting a function to handle save changes
}

const BoardUpdate: React.FC<BoardUpdateProps> = ({ id, onSubmit }) => {
  const dispatch = useDispatch();

  // Select the task from the Redux store using the id prop
  const task = useSelector((state: RootState) =>
    state.tasks.find((task) => task.id === id)
  );

  const [editForm, setEditForm] = useState(task || {
    id: 0,
    name: "",
    dueDate: "",
    category: "",
    status: "",
    description: "",
  });

  useEffect(() => {
    if (task) {
      setEditForm(task);
    }
  }, [task]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleDescriptionChange = (newDescription: string) => {
    setEditForm({ ...editForm, description: newDescription });
  };

  const handleSaveChanges = async (closeModal: () => void): Promise<boolean> => {
    const updatedTask = { ...editForm };
  
    const serializableTask = {
      id: updatedTask.id,
      name: updatedTask.name,
      dueDate: updatedTask.dueDate,
      status: updatedTask.status,
      category: updatedTask.category,
      description: updatedTask.description,
    };
  
    // Perform the save operation
    try {
      // Dispatch the action to save the task
      dispatch(editTask(serializableTask));
  
      // Call the onSubmit function after saving changes
      onSubmit();
  
      // Return true to indicate success
      closeModal(); // Close the modal if save is successful
      return true;
    } catch (error) {
      console.error("Error saving task:", error);
      // Return false to indicate failure
      return false;
    }
  };
  

  const handleCategoryChange = (category: string) => {
    setEditForm({ ...editForm, category });
  };

  const handleStatusChange = (status: string) => {
    setEditForm({ ...editForm, status });
  };

  return (
    <ReusableModal
      title="Edit Task"
      closebtn="Close"
      savebtn="Save Changes"
      Modalsize="modal-xl"
      ModalLaunchbtn={"Edit"}
      showPrintbtn={false}
      showSavebtn={true}
      onSave={handleSaveChanges}
    >
      <div className="modal-body">
        {/* Task Title */}
        <div className="form-group">
          <label htmlFor="name">Task Title</label>
          <br />
          <TaskTitleInput
            value={editForm.name}
            onChange={(value) =>
              handleInputChange({ target: { name: "name", value } } as any)
            }
            placeholder="Enter task title"
          />
        </div>

        {/* Description Editor */}
        <div className="my-3">
          <label>Description</label>
          <TextEditor
            value={editForm.description}
            onChange={(text) => handleDescriptionChange(text)} // Update description
          />
        </div>

        <div className="row">
          {/* Category Selection */}
          <div className="col-md-4">
            <label>Category</label>
            <div className="category-buttons">
              {["Work", "Personal"].map((category) => (
                <Button
                  key={category}
                  text={category}
                  onClick={() => handleCategoryChange(category)}
                  bgColor={editForm.category === category ? "#7B1984" : "#f0f0f0"}
                  textColor={editForm.category === category ? "#fff" : "#000"}
                  size="14px"
                />
              ))}
            </div>
          </div>

          {/* Due Date */}
          <div className="col-md-4">
            <label>Due Date</label>
            <DueDateInput
              value={editForm.dueDate}
              onChange={(newDate) =>
                handleInputChange({
                  target: { name: "dueDate", value: newDate },
                } as any)
              }
            />
          </div>

          {/* Status Dropdown */}
          <div className="col-md-4">
            <label>Status</label>
            <Dropdown
              label={editForm.status}
              options={["TO-DO", "COMPLETED", "IN-PROGRESS"]}
              onSelect={handleStatusChange}
            />
          </div>
        </div>

        {/* Save Button */}
        {/* <button type="button" className="btn btn-primary" onClick={}>
          Save Changes
        </button> */}
      </div>
    </ReusableModal>
  );
};

export default BoardUpdate;
