import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import ModalEditUser from "../modalEditUser";

export default function UserTab({ users, setUsers }) {
  const [user, setUser] = useState([]);
  // const [isModalOpened, setIsModalOpened] = useState(false);
  function createData(id, firstname, email, createdAt, isAdmin, status) {
    return { id, firstname, email, createdAt, isAdmin, status };
  }

  //   const rows = [createData(users.map((user) => (user.id, user.firstname, user.email)))];
  const rows = [];
  let admin = "";
  users.map((user) => {
    if (user.isAdmin) {
      admin = "Admin";
    } else {
      admin = "Utilisateur";
    }
    rows.push(createData(user.id, user.firstname, user.email, user.createdAt, admin, user.status));
  });

  const DeleteUser = async (event) => {
    const id = event;
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        id: id
      })
    };
    await fetch(`http://localhost:3000/users/${id}`, requestOptions).then((response) => {
      if (response.status === 204) {
        setUsers(users.filter((user) => user.id !== id));
      }
    });
  };

  const handleDelete = async (event) => {
    await DeleteUser(event);
    console.log("delete", event);
  };

  const EditUser = async (event) => {
    const id = event;
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        id: id,
        lastaname: ""
      })
    };
    await fetch(`http://localhost:3000/users/${id}`, requestOptions).then((response) => {
      if (response.status === 200) {
        setUsers(users.filter((user) => user.id !== id));
      }
    });
  };

  const handleEdit = async (event) => {
    console.log("edit", event);
  };

  function handleEdit1(userid) {
    console.log("edit", user);
    setUser;
  }

  return (
    <div style={{ marginTop: "5%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Firstname</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">createdAt</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                hover
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                tabIndex={-1}
                key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.firstname}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
                <TableCell align="right">{row.isAdmin}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">
                  <EditIcon onClick={() => handleEdit1(row.id)} sx={{ color: "orange" }} />
                  <DeleteIcon onClick={() => handleDelete(row.id)} sx={{ color: "red" }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalEditUser user={editThisUser} />
    </div>
  );
}
