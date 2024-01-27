import React from "react";
import './Header.css'
import { useAuth } from "../../api/AuthContext";
const Header = ({user}) => {
  const { logout } = useAuth();
  
  return (
    <div className="header-bar">
      <h3 className="title">Welcome {`${user}`}:)</h3>
      <div className="btns">
        <button className="btn sign-out" onClick={()=>logout()}>log out</button>
      </div>
    </div>
  );
};

export default Header;

