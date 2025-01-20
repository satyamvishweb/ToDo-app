  import React, { useState, useEffect, useCallback } from "react";
  import { useDispatch } from "react-redux";
  import { editTask, removeTask } from "../Redux/taskSlice";
  import "./MobileUpdate.css";
  import Button from "../ExtraComponent/Button";

  interface MobileUpdateProps {
    handleBulkDelete: () => void;
    selectedTasksCount: number;
    selectedTaskIds: number[];
  }

  const MobileUpdate: React.FC<MobileUpdateProps> = ({
    handleBulkDelete,
    selectedTasksCount,
    selectedTaskIds,
  }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Status");
    const dispatch = useDispatch();

    const updateTaskStatus = useCallback(() => {
      if (selectedStatus !== "Status") {
        selectedTaskIds.forEach((id) => {
          console.log(`Dispatching editTask for ID: ${id} with status: ${selectedStatus}`);
          dispatch(editTask({ id, status: selectedStatus }));
        });
      }
    }, [selectedStatus, selectedTaskIds, dispatch]);

    useEffect(() => {
      if (selectedStatus !== "Status") {
        updateTaskStatus();
      }
    }, [selectedStatus, updateTaskStatus]);

    const handleDeleteClick = useCallback(() => {
      selectedTaskIds.forEach((id) => {
        dispatch(removeTask(id)); // Dispatch removeTask action
        console.log(`Deleted task with ID: ${id}`);
      });
      handleBulkDelete();
    }, [selectedTaskIds, dispatch, handleBulkDelete]);

    const toggleDropdown = () => {
      setShowDropdown((prev) => !prev);
    };

    const handleStatusSelect = (status: string) => {
      console.log(`Status selected: ${status}`);
      setSelectedStatus(status);
      setShowDropdown(false);
    };

    return (
      <div className="mobile-update-container">
        <div className="bulk-actions">
          <div className="Select_item my-auto">{selectedTasksCount} selected</div>

          <div className="dropdown-container">
            <button className="dropdown-button" onClick={toggleDropdown}>
              {selectedStatus}
            </button>
            {showDropdown && (
              <div className="dropdown-menuMU">
                <div
                  className="dropdown-item B_drop"
                  onClick={() => handleStatusSelect("To-Do")}
                >
                  To-Do
                </div>
                <div
                  className="dropdown-item B_drop"
                  onClick={() => handleStatusSelect("In-Progress")}
                >
                  In-Progress
                </div>
                <div
                  className="dropdown-item B_drop"
                  onClick={() => handleStatusSelect("Complete")}
                >
                  Complete
                </div>
              </div>
            )}
          </div>

          <Button
            text="Delete"
            bgColor="#e1383870"
            textColor="#E13838"
            border="1px solid #E13838"
            onClick={handleDeleteClick} // Handle delete
          />
        </div>
      </div>
    );
  };


  export default MobileUpdate;
