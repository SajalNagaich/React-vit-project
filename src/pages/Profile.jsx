import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./profile.module.css";

const Profile = () => {
  let userID = localStorage.getItem("userID");

  let [profileUser, setProfileUser] = useState(null);
  let [APIUsers, setAPIUsers] = useState(null);

  useEffect(() => {
    async function fetchAuthUser() {
      //! Fetching inidividual user dynamically
      let { data } = await axios.get(`http://localhost:5000/users/${userID}`);
      setProfileUser(data);
    }
    fetchAuthUser();
  }, []);

  useEffect(() => {
    async function fetchAPIUsers() {
      let { data } = await axios.get("https://api.github.com/users");
      setAPIUsers(data);
    }
    fetchAPIUsers();
  }, []);

  return (
    <div id={style.profilecontainer}>
      <h1>Welcome {profileUser?.username}</h1>

      {APIUsers?.map((user) => {
        let { login, avatar_url, html_url, type, id } = user;
        return (
          <section key={id} id={style.card}>
            <img src={avatar_url} height={100} width={100} />
            <div>
              <h1>{login}</h1>

              <p>Type: {type}</p>
              <p>
                <a href={html_url}>view more</a>
              </p>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Profile;
