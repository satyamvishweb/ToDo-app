import React, { useEffect, useState } from "react";
import "./DragBar.css";
import { BsThreeDots } from "react-icons/bs";
import ReusableModal from "../ExtraComponent/ReusableModal";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../Redux/taskSlice";
import { CiEdit } from "react-icons/ci";
import UpdateData from "./UpdateData";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

interface DragBarProps {
  id: number;
  onDelete: () => void;
  onSelect: (id: number) => void;
  isSelected: boolean;
}

const DragBar: React.FC<DragBarProps> = ({ id, onDelete, onSelect, isSelected }) => {
  const task = useSelector((state: any) =>
    state.tasks.find((task: any) => task.id === id)
  );

  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    title: task?.title || "",
    dueDate: task?.dueDate || "",
    status: task?.status || "",
    category: task?.category || "",
    id: task?.id || 0,
    name: task?.title || "",
    description: task?.description || "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Current Task (useEffect):", task); // Log task when task changes
    if (task) {
      setEditForm({
        title: task.title,
        dueDate: task.dueDate,
        status: task.status,
        category: task.category,
        id: task.id,
        name: task.name,
        description: task.description,
      });
    }
  }, [task]);

  const handleEditOpen = () => {
    setIsEditModalOpen(true);
    setShowDropdown(false);
    console.log("Edit Modal Opened for Task:", task); // Log task when editing
  };

  const handleSaveChanges = () => {
    console.log("Dispatching Edit Task:", editForm);
    dispatch(editTask(editForm)); // Update task in Redux
    setIsEditModalOpen(false); // Close modal
    return Promise.resolve(true);
  };

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const renderStatusIcon = (status: string) => {
    if (status === "COMPLETED") {
      return <FaCircleCheck className="mx-1 my-auto text-success" />;
    }
    return <FaCircleCheck className="mx-1 my-auto text-secondary" />;
  };

  // Add a log to show all tasks when needed
  // const logAllTasks = () => {
  //   console.log("All Tasks in Redux State:", useSelector((state: any) => state.tasks));
  // };

  return (
    <>
      <div className="drag-bar mx-2">
        <span>
          {/* Checkbox for selecting tasks */}
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(id)} // Trigger selection or deselection
          />
          {renderStatusIcon(task?.status)}
          <span className={`title ${task?.isCompleted ? "completed" : ""}`}>
            {task?.name}
          </span>
        </span>
        <span className="date DeskTop_View">{task?.dueDate}</span>
        <span className="status DeskTop_View">{task?.status}</span>
        <span className="category DeskTop_View">{task?.category}</span>

        <div className="DeskTop_View">
          <div className="dropdown-container">
            <BsThreeDots onClick={toggleDropdown} className="three-dots-icon" />
            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-item cursor" onClick={handleEditOpen}>
                  <AiFillEdit /> Edit
                </div>
                <div
                  className="dropdown-item cursor text-danger"
                  onClick={onDelete}
                >
                  <MdDelete /> Delete
                </div>
              </div>
            )}
          </div>
        </div>

        {isEditModalOpen && (
          <ReusableModal
            title="Edit Task"
            closebtn="Close"
            savebtn="Save Changes"
            Modalsize="modal-lg"
            showPrintbtn={false}
            showSavebtn={true}
            onSave={handleSaveChanges}
            ModalLaunchbtn={
              <>
                <CiEdit />
              </>
            }
          >
            <div className="modal-body">
              <UpdateData
                editForm={editForm}
                handleEditInputChange={handleEditInputChange}
                handleSaveChanges={handleSaveChanges}
              />
            </div>
          </ReusableModal>
        )}
      </div>

      {/* Example button to log all tasks */}
      {/* <button onClick={logAllTasks}>Log All Tasks</button> */}
    </>
  );
};

export default DragBar;
