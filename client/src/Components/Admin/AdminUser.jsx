import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import UserTab from "./UserTab";

export default function adminUser() {
  let auth = useAuth();
  const [users, setUsers] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    if (auth.isAdmin === false) navigate("/");
  }, [auth]);

  const getUsers = async () => {
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await fetch("http://localhost:3000/users", requestOptions);
    const users = await response.json();
    setUsers(users);
  };

  useEffect(() => {
    getUsers().catch(console.error);
  }, []);

  console.log(users);
  return (
    <div style={{ maxWidth: 1000, margin: "auto" }}>
      <UserTab users={users} setUsers={setUsers} />
    </div>
  );
}
