import React, { useState } from "react";
import style from "./register.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let [resgisterUser, setRegisterUser] = useState({
    username: "",
    useremail: "",
    userpassword: "",
    userPhoneNo: "",
  });

  let navigate = useNavigate();

  let RegisterHandle = (e) => {
    let { name, value } = e.target;
    setRegisterUser({ ...resgisterUser, [name]: value });
  };

  let registerSubmit = (e) => {
    e.preventDefault();
    console.log(resgisterUser); // payload
    axios
      .post("http://localhost:5000/users", resgisterUser)
      .then(() => {
        toast.success("registered succussfully");
        setRegisterUser({
          username: "",
          useremail: "",
          userpassword: "",
          userPhoneNo: "",
        });
        navigate("/login")
      })
      .catch(() => {
        toast.error("not registered");
      });
  };

  return (
    <div id={style.register}>
      <h1>Register Page</h1>
      <form>
        <div>
          <label>Name</label>
          <input
            type="text"
            required
            placeholder="Enter Name"
            name="username"
            value={resgisterUser.username}
            onChange={RegisterHandle}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            required
            placeholder="Enter Email"
            name="useremail"
            value={resgisterUser.useremail}
            onChange={RegisterHandle}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            required
            placeholder="Enter Password"
            name="userpassword"
            value={resgisterUser.userpassword}
            onChange={RegisterHandle}
          />
        </div>
        <div>
          <label>Phone No</label>
          <input
            type="tel"
            min={10}
            max={10}
            required
            placeholder="Enter Phone no"
            name="userPhoneNo"
            value={resgisterUser.userPhoneNo}
            onChange={RegisterHandle}
          />
        </div>
        <div>
          <button onClick={registerSubmit}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
