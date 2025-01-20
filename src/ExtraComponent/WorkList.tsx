import React, { useState, useCallback } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { editTask, removeTask } from "../Redux/taskSlice";
import ReusableModal from "../ExtraComponent/ReusableModal";
import Button from "../ExtraComponent/Button"; // Custom Button component
import BoardUpdate from "./BoardUpdate";

interface WorkListProps {
  id: number;
  name: React.ReactNode;
  dueDate: string;
  category: string;
  status: string;
  description: string;
  className?: string;
}

const WorkList: React.FC<WorkListProps> = ({
  id,
  name,
  dueDate,
  category,
  status,
  description,
  className = "",
}) => {
  const dispatch = useDispatch();
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [editForm, setEditForm] = useState({
    id,
    name: name as string,
    dueDate,
    category,
    status,
    description,
  });

  // Open modal for editing
  const handleEditOpen = useCallback(() => {
    // setIsEditModalOpen(true);
    setShowDropdown(false);
  }, []);

  // Save changes to the task
  const handleSaveChanges = useCallback(async () => {
    const updatedTask = { ...editForm };

    // Dispatch the edited task
    const serializableTask = {
      id: updatedTask.id,
      name: updatedTask.name,
      dueDate: updatedTask.dueDate,
      status: updatedTask.status,
      category: updatedTask.category,
      description: updatedTask.description,
    };

    dispatch(editTask(serializableTask));

    // Return success
    return new Promise<boolean>((resolve) => resolve(true));
  }, [dispatch, editForm]);

  // Delete task
  const handleDelete = useCallback(() => {
    dispatch(removeTask(id)); // Dispatch remove task action
    setShowDropdown(false);
  }, [dispatch, id]);

  // Handle input field changes
  const handleEditInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setEditForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  // Toggle dropdown visibility
  const toggleDropdown = useCallback(() => {
    setShowDropdown((prevState) => !prevState);
  }, []);

  return (
    <div className={`worklist-card my-1 ${className}`}>
      <div className="worklist-content">
        <div className="worklist-header">
          <h3 className="worklist-title">{name}</h3>
          <div className="dropdown-container">
            <BsThreeDots onClick={toggleDropdown} className="three-dots-icon" />
            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-item cursor">
                  <BoardUpdate
                    id={id}
                    onSubmit={() => console.log("Submit function not implemented")}
                  />
                </div>
                <div
                  className="dropdown-item cursor text-danger"
                  onClick={handleDelete}
                >
                  <MdDelete /> Delete
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="worklist-footer">
          <p className="worklist-category">{category}</p>
          <p className="worklist-date">{dueDate}</p>
        </div>
      </div>

      {/* Reusable Modal for editing */}
      <ReusableModal
        title="Edit Task"
        closebtn="Close"
        savebtn="Save Changes"
        ModalLaunchbtn={<Button text="Edit" bgColor="#7B1984" textColor="white" onClick={handleEditOpen} />}
        Modalsize="modal-lg" // You can change this depending on the modal size you want
        onSave={handleSaveChanges}
        // isOpen={isEditModalOpen}

        // onClose={() => setIsEditModalOpen(false)}
      >
        {/* Add form elements here to edit the task */}
        <input
          type="text"
          name="name"
          value={editForm.name}
          onChange={handleEditInputChange}
        />
        <textarea
          name="description"
          value={editForm.description}
          onChange={handleEditInputChange}
        />
      </ReusableModal>
    </div>
  );
};

export default WorkList;
