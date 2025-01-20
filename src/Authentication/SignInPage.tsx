import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/authSlice";
import GoogleSignInButton from "../Component/GoogleSignInButton";
import Imageobj from "../Component/Imageobj";
import "./Sigin.css";

// Removed unused user variable
const SignInPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(setUser(parsedUser));
    }
  }, [dispatch]);

  return (
    <div className="container-fluid Add_bg left-top-position">
    
      <div className="container">
        <div style={styles.container} className="logincont">
          <img src={Imageobj.Logo} alt="App Logo" className="mb-3" />
          <p className="mb-4">
            Streamline your workflow and track progress effortlessly with our
            all-in-one task management app.
          </p>
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
};

// Inline styles for container
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh",
    padding: "20px",
  } as React.CSSProperties,
};

export default SignInPage;
