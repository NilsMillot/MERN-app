import * as React from "react";
import { useEffect, useState } from "react";
import UserTab from "./UserTab";

export default function adminUser() {
  const [users, setUsers] = useState([]);

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
    <div style={{ width: 800, margin: "auto" }}>
      <UserTab users={users} setUsers={setUsers} />
    </div>
  );
}
