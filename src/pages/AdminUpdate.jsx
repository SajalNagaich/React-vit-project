import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const AdminUpdate = () => {
  let[updateUser,setUpdateUser] = useState();
  let {id} = useParams();
  let navigate = useNavigate();
  console.log(id);
  useEffect(()=>{
    async function fatchApi(params) {
      let {data} = await axios.get(`http://localhost:5000/users/${id}`);
      setUpdateUser(data);
    }
    fatchApi()
  },[])
  let handleChange = ()=>{
    let {name,value} = e.target;
    setUpdateUser({...updateUser,[name]:value});

  }
  let formSubmit = (e)=>{
    
    e.preventDefault();
    console.log(updateUser);

    axios.put(`http://localhost:5000/users/${id}`,updateUser).then(()=>{
      toast.success("user updated")
      navigate("/admin");
    }).catch(()=>{
      toast.error("failed update")
    })
    
  }
  return (
    <div>AdminUpdate

<form onSubmit={formSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            required
            placeholder="Enter Name"
            name="username"
            value={updateUser?.username}
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
            value={updateUser?.useremail}
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
            value={updateUser?.userpassword}
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
            value={updateUser?.userPhoneNo}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  )
}

export default AdminUpdate