import React, { useState, useEffect } from "react";
import style from "./login.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let [loginUser, setLoginUser] = useState({
    useremail: "",
    userpassword: "",
  });
  let [allRegistredUser, setAllRegistredUser] = useState(null);

  let navigate = useNavigate();

  let handleLoginuser = (e) => {
    let { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  //! FETCHING REGISTRED USERS
  useEffect(() => {
    async function fetchRegistredUser() {
      let { data } = await axios.get("http://localhost:5000/users");
      setAllRegistredUser(data);
    }
    fetchRegistredUser();
  }, []);

  let loginSubmit = (e) => {
    e.preventDefault();
    let authUser = allRegistredUser.find((user) => {
      return (
        user.useremail === loginUser.useremail &&
        user.userpassword === loginUser.userpassword
      );
    });
    console.log(authUser);

    if (
      authUser.useremail === "admin@gmail.com" &&
      authUser.userpassword === "admin123"
    ) {
      toast.success(`Welcome ${authUser.username}`);
      localStorage.setItem("userID", authUser.id);
      navigate("/admin");
    } else if (authUser) {
      toast.success(`Welcome ${authUser.username}`);
      localStorage.setItem("userID", authUser.id);
      navigate("/profile");
    } else {
      toast.error("access denied");
      navigate("/register");
    }
  };
  return (
    <div id={style.login}>
      <h1>Login User</h1>
      <form>
        <div>
          <label>Email</label>
          <input
            type="email"
            required
            placeholder="Enter Email"
            name="useremail"
            value={loginUser.useremail}
            onChange={handleLoginuser}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            required
            placeholder="Enter Password"
            name="userpassword"
            value={loginUser.userpassword}
            onChange={handleLoginuser}
          />
        </div>

        <div>
          <button onClick={loginSubmit}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
