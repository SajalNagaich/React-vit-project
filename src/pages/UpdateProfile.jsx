import axios from "axios";
import style from "./updateprofile.module.css"
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  let userID = localStorage.getItem("userID");

  let [userDetails, setUserDetails] = useState(null);
  let navigate = useNavigate()

  useEffect(() => {
    async function fetchUser() {
      let { data } = await axios.get(`http://localhost:5000/users/${userID}`);
      console.log(data);
      setUserDetails(data);
    }
    fetchUser();
  }, []);

  let handleChange = (e) => {
    let { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  let updatedFormSubmit = (e) => {
    e.preventDefault();
    console.log("Updated value", userDetails);
    axios.put(`http://localhost:5000/users/${userID}`,userDetails).then(()=>{
        toast.success("Profile Updated")
        navigate("/profile")
    }).catch(()=>{
        toast.error("Update Failed")
    })
  };

  return (
    <div id={style.updateprofile}>
      <h1>Update Profile</h1>
      <form onSubmit={updatedFormSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            required
            placeholder="Enter Name"
            name="username"
            value={userDetails?.username}
            readOnly
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            required
            placeholder="Enter Email"
            name="useremail"
            value={userDetails?.useremail}
            readOnly
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            required
            placeholder="Enter Password"
            name="userpassword"
            value={userDetails?.userpassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone No</label>
          <input
            type="tel"
            minLength={10}
            maxLength={10}
            required
            placeholder="Enter Phone no"
            name="userPhoneNo"
            value={userDetails?.userPhoneNo}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
