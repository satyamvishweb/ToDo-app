import React from "react";
import TaskTitleInput from "../ExtraComponent/TaskTitleInput";
import DueDateInput from "../ExtraComponent/DueDateInput";
import Dropdown from "../ExtraComponent/Dropdown";
import Button from "../ExtraComponent/Button";
import TextEditor from "../ExtraComponent/TextEditior";

interface TaskEditFormProps {
  editForm: {
    name: string;
    // title: string;
    dueDate: string;
    status: string;
    category: string;
    description: string;
  };
  handleEditInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSaveChanges: () => void;
}

const statusOptions = ["TO-DO", "COMPLETED", "IN-PROGRESS"];
const categories = ["Work", "Personal"];
const UpdateData: React.FC<TaskEditFormProps> = ({
  editForm,
  handleEditInputChange,
  // handleSaveChanges,
}) => {
  console.log("Received editForm:", editForm); 
  return (
    <div>
      <div className="create-task-container">
        <label>Task Title</label>
        <TaskTitleInput
          value={editForm.name}
          onChange={(value) =>
            handleEditInputChange({ target: { name: "name", value } } as any)
          }
          placeholder="Enter task title"
        />
        <div className="my-3">
          <label>Description</label>
          <TextEditor
            value={editForm.description} // Show existing description
            onChange={(text) =>
              handleEditInputChange({
                target: { name: "description", value: text },
              } as any)
            } // Update the description field
          />
        </div>
        <div className="row">
          <div className="col-md-4">
            <label>Category</label>
            <div className="category-buttons">
              {categories.map((category) => (
                <Button
                  key={category}
                  text={category}
                  onClick={() =>
                    handleEditInputChange({
                      target: { name: "category", value: category },
                    } as any)
                  }
                  bgColor={
                    editForm.category === category ? "#7B1984" : "#f0f0f0"
                  } // Active category in blue
                  textColor={editForm.category === category ? "#fff" : "#000"} // Active category text in white
                  size="14px"
                />
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <label>Due Date</label>
            <DueDateInput
              value={editForm.dueDate} // Pass the value from the state
              onChange={(newDate) =>
                handleEditInputChange({
                  target: { name: "dueDate", value: newDate },
                } as any)
              } // Pass updated value to parent
            />
          </div>
          <div className="col-md-4">
            <label>Status</label>
            <br />
            <Dropdown
              label={editForm.status} // Set initial status as the selected option
              options={statusOptions} // Pass the status options to the dropdown
              onSelect={(option) =>
                handleEditInputChange({
                  target: { name: "status", value: option },
                } as any)
              }
            />
          </div>
        </div>
      </div>
      <br />
      {/* <button onClick={handleSaveChanges} className="btn btn-primary">
        Save Changes
      </button> */}
    </div>
  );
};

export default UpdateData;
