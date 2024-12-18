import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Admin = () => {
  let [allusers, setAllusers] = useState(null);
  let [toggle, setToggle] = useState(false);
  
  useEffect(() => {
    async function fetchAllRegistredUsers() {
      let { data } = await axios.get("http://localhost:5000/users");
      console.log(data);
      setAllusers(data);
    }
    fetchAllRegistredUsers();
  }, [toggle]);

  let deleteUser = (x) => {
    console.log("deleted", x);
    axios
      .delete(`http://localhost:5000/users/${x}`)
      .then(() => {
        toast.success("user deleted");
        // window.location.reload(); //refresh
        setToggle(!toggle);
      })
      .catch(() => {
        toast.error("unable to delete");
      });
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      {allusers?.map(
        ({ id, username, useremail, userpassword, userPhoneNo }) => {
          
          return (
            <section key={id}>
              <h1>Name : {username}</h1>
              <p>Email : {useremail}</p>
              <p>Password : {userpassword}</p>
              <p>Phone No : {userPhoneNo}</p>
              <button > <Link to={`/adminupdate/${id}`} >update</Link></button>
              <button onClick={() => deleteUser(id)}>delete</button>
            </section>
          );
        }
      
      )}
    </div>
  );
};

export default Admin;
