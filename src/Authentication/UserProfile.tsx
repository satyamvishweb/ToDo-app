import React from "react";
import LogoutButton from "../Authentication/LogoutButton"; // Import the LogoutButton component
import "./Userprofile.css";

const UserProfile: React.FC = () => {
  // Retrieve user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const { photoURL, displayName } = storedUser;

  return (
    <>
      {/* Desktop View */}
      <div className="user-profileDV my-2">
        <img
          src={photoURL || ""}
          className="userProfileImage mx-2"
          alt="Profile"
          width="50"
          height="50"
        />
        <span className="username">{displayName || "User"}</span>
        <br />
        <LogoutButton />
      </div>

      {/* Mobile View */}
      <div className="user-profileMB">
        <span className="usernameMB">TaskBuddy</span>
        <div className="image-containerMB">
          <img
            src={photoURL || "https://via.placeholder.com/50"}
            className="userProfileImageMB"
            alt="User Profile"
          />
          {/* Dropdown menu */}
          <div className="dropdown-menuMB">
            <ul>
              <li>{displayName || "User"}</li>
              <li>
                <LogoutButton />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
