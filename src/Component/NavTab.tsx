import React, { useState } from "react";
import ListTab from "./ListTab";
import BoardTab from "./BoardTab";
import "./NavTab.css"; // Import the custom styles
import Imageobj from "./Imageobj";
import FilterBar from "../FilterBar/FilterBar";
import UserProfile from "../Authentication/UserProfile";
import CreateTask from "./CreateTask";
import Button from "../ExtraComponent/Button";

const NavTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("list");
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const handleButtonClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div className="navtab-container">
      <div className="Mobile_view">
        <UserProfile />
      </div>
      <div className="tabs-header">
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === "list" ? "active" : ""}`}
            onClick={() => setActiveTab("list")}
          >
            <img src={Imageobj.list_icon} alt="" /> List
          </button>
          <button
            className={`tab-button ${activeTab === "board" ? "active" : ""}`}
            onClick={() => setActiveTab("board")}
          >
            <img src={Imageobj.Group} alt="" /> Board
          </button>
        </div>
        <div className="task-content Mobile_view text-end">
          <CreateTask
            ModalLaunchbtn={
              <Button
                text="ADD TASK"
                onClick={handleButtonClick}
                bgColor="#7b1984"
                textColor="white"
                size="11px"
                fontFamily="Arial, sans-serif"
              />
            }
          />
        </div>
        <div className="user-profile">
          {storedUser ? (
            <div className="DeskTop_View">
              <UserProfile />
            </div>
          ) : (
            <p>Please log in to manage your tasks.</p> // Display login prompt if no user is logged in
          )}
        </div>
      </div>
      <FilterBar />
      <div className="tab-content">
        {activeTab === "list" && <ListTab />}
        {activeTab === "board" && <BoardTab />}
      </div>
    </div>
  );
};

export default NavTab;
