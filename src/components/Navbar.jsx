import React,{useContext} from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firabase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext)



  return (
    <div className="navbar">
      <span className="logo">chat app</span>
      <div className="user">
        <img
          src={currentUser.photoURL}
          alt=""
        />
        <span>{currentUser.displayName}</span>
        <button
          onClick={() => {
            signOut(auth);
            navigate("/login");
          }}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
