import React, { useState } from "react";
import { auth, googleProvider } from "../services/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/authSlice";
import Imageobj from "./Imageobj";
import "./GoogleSignInButton.css"

const GoogleSignInButton: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoUrl: user.photoURL, // Optional, you can store the user's photo URL if needed
      };

      dispatch(setUser(userData));  // Store user in Redux
      localStorage.setItem("user", JSON.stringify(userData));  // Persist user data in localStorage
      navigate("/todomanage");  // Navigate to protected route
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleGoogleSignIn} className="Googlebutton px-5" disabled={loading}>
      <img src={Imageobj.Gicon} alt="Logo" className="btn_icon mx-2 my-auto" />
      {loading ? "Signing in..." : "Sign in with Google"}
    </button>
  );
};

export default GoogleSignInButton;
