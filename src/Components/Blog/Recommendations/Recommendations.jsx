// src/UserList.js
import React, { useEffect, useState } from "react";

import "./Recommendations.css";
import { getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../../Firebase/firebase";

function Recommendations() {
  /* testing db */
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const usersCollection = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(usersCollection);
        const res = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUsers(res);
      } catch (error) {
        alert(error);
      }
    };

    getUsers();
  }, []);

  function handleClick(id) {
    navigate(`/user/${id}`);
  }

  return (
    <div className="user-list">
      <h2>Your Recommendations</h2>
      {users.map((user, index) => (
        <div className="user-card" key={user.id}>
          <div className="user-profile-pic">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="pic"
                className="w-full rounded-full"
              />
            )}
          </div>
          <div className="user-details">
            <div className="user-name" onClick={() => handleClick(user.id)}>
              {user.name}
            </div>
            <div className="user-bio">{user.bio}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Recommendations;
