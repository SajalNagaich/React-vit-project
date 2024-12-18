import React, { useState } from "react";
import style from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const Navbar = () => {
  let userID = localStorage.getItem("userID");
  let [id,setid] =useState(userID);
  
  console.log(userID, "Navbar");

  let navigate = useNavigate();

  let logout = () => {
    localStorage.removeItem("userID");
    navigate("/login");
    toast.success("Logged Out");
  };

  let deleteProfile = () => {
    let confirmationVal = confirm("Are you sure?");
    console.log(confirmationVal);
    
    if (confirmationVal) {
      axios
        .delete(`http://localhost:5000/users/${userID}`)
        .then(() => {
          toast.success("account deleted");
          localStorage.removeItem("userID");
          navigate("/register");
        })
        .catch(() => {
          toast.error("something went wrong");
        });
    }
  };

  return (
    <nav>
      <aside className={style.logo}>🏠</aside>
      <ul className={style.menu}>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
        {userID ? (
          <>
            <li className={style.drop}>
              <Link to="/profile">Profile</Link>
              <ul className={style.dropdown}>
                <li>
                  <Link to="/updateprofile">update</Link>
                </li>
                <li onClick={deleteProfile}>delete</li>
                <li onClick={logout}>Logout</li>
              </ul>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">register</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
