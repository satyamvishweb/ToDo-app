// src/App.tsx
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import SignInPage from "./Authentication/SignInPage";
import TodoManage from "./ManagementSystemTODO/TodoManage";
import ProtectedRoute from "./Context/ProtectedRoute";
import { setUser } from "./Redux/authSlice";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for user in localStorage on page load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(setUser(parsedUser));  // Dispatch user data to Redux
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route
          path="/todomanage"
          element={
            <ProtectedRoute
              element={<TodoManage />}  // Render TodoManage component if user is authenticated
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
