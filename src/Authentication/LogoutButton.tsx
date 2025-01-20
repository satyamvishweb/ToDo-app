// src/Component/LogoutButton.tsx
import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../Redux/authSlice"; // Import the clearUser action to reset user state
import "./Userprofile.css";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    // Clear user data from Redux using clearUser action
    dispatch(clearUser());  // Correct action to reset user state
    localStorage.removeItem("user");  // Remove user data from localStorage

    // Redirect to the login page
    navigate("/");  // You can navigate to the login or home page
  };

  return (
    <button onClick={logout} className="SignOutbtn px-3 mx-2 my-1">
      <RiLogoutBoxLine className="fs-5 mx-1" />
      Logout
    </button>
  );
};

export default LogoutButton;
