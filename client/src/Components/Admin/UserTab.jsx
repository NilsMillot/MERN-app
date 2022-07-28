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
import { useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../../utils/auth";
// import ModalEditUser from "../modalEditUser";

// eslint-disable-next-line react/prop-types
export default function UserTab({ users, setUsers }) {
  function createData(id, firstname, email, createdAt, isAdmin, status) {
    return { id, firstname, email, createdAt, isAdmin, status };
  }
  const auth = useAuth();
  console.log("myauth", auth);
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
    const newFirstname = "JohnDoe";
    const newEmail = uuidv4() + "@gmail.com";
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        id: id,
        firstname: newFirstname,
        email: newEmail
      })
    };
    await fetch(`http://localhost:3000/users/${id}`, requestOptions).then((response) => {
      if (response.status === 200) {
        console.log("Ola");
        setUsers(
          users.map((user) =>
            user.id === currentIdUser ? { ...user, firstname: newFirstname, email: newEmail } : user
          )
        );
        // setUsers(users.filter((user) => user.id !== id));
      }
    });
  };

  const handleDelete = async (event) => {
    await DeleteUser(event);
    console.log("delete", event);
  };

  const handleSubmitNewUser = async () => {
    console.log("%cUserTab.jsx line:57 newFirstname", "color: #007acc;", newFirstname);
    console.log("%cUserTab.jsx line:57 newEmail", "color: #007acc;", newEmail);
    console.log("%cUserTab.jsx line:57 currentIdUser", "color: #007acc;", currentIdUser);
    // const id = event;
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        id: currentIdUser,
        firstname: newFirstname,
        email: newEmail
      })
    };
    await fetch(`http://localhost:3000/users/${currentIdUser}`, requestOptions).then((response) => {
      if (response.status === 200) {
        setUsers(
          users.map((user) =>
            user.id === currentIdUser ? { ...user, firstname: newFirstname, email: newEmail } : user
          )
        );
      }
    });
  };

  const handleSubmitCreateUser = async () => {
    const newPassword = "changeme";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.token}`
      },
      body: JSON.stringify({
        firstname: newFirstname,
        email: newEmail,
        password: newPassword,
        isAdmin: false
      })
    };
    await fetch("http://localhost:3000/users/", requestOptions).then((response) => {
      if (response.status === 201) {
        setUsers([
          ...users,
          {
            id: users.length + 1,
            firstname: newFirstname,
            email: newEmail,
            createdAt: "2022-07-28 13:49:04.193000 +00:00",
            isAdmin: false,
            status: "active"
          }
        ]);
      }
    });
  };

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalNew, setIsOpenModalNew] = useState(false);
  const [currentIdUser, setCurrentIdUser] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newFirstname, setNewFirstname] = useState("");

  return (
    <div style={{ marginTop: "5%" }}>
      <AddIcon onClick={() => setIsOpenModalNew(true)} sx={{ color: "green" }} />
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
            {users.map((user) => (
              <TableRow
                hover
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                tabIndex={-1}
                key={user.id}>
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell align="right">{user.firstname}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.createdAt}</TableCell>
                <TableCell align="right">{user.isAdmin}</TableCell>
                <TableCell align="right">{user.status}</TableCell>
                <TableCell align="right">
                  <EditIcon
                    onClick={() => {
                      setCurrentIdUser(user.id);
                      setNewEmail(user.email);
                      setNewFirstname(user.firstname);
                      setIsOpenModal(true);
                    }}
                    sx={{ color: "orange" }}
                  />
                  <DeleteIcon onClick={() => handleDelete(user.id)} sx={{ color: "red" }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            textAlign: "center",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4
          }}>
          <TextField
            id="outlined-basic"
            label="email"
            variant="outlined"
            value={currentIdUser}
            disabled={true}
            sx={{ width: "100%", marginBottom: "1rem" }}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="email"
            variant="outlined"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            sx={{ width: "100%", marginBottom: "1rem" }}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="firstname"
            variant="outlined"
            value={newFirstname}
            onChange={(e) => setNewFirstname(e.target.value)}
            sx={{ width: "100%", marginBottom: "1rem" }}
          />
          <br />
          <Button onClick={handleSubmitNewUser}>Modifier</Button>
        </Box>
      </Modal>
      <Modal open={isOpenModalNew} onClose={() => setIsOpenModalNew(false)}>
        <Box
          sx={{
            position: "absolute",
            textAlign: "center",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4
          }}>
          <TextField
            id="outlined-basic"
            label="email"
            variant="outlined"
            onChange={(e) => setNewEmail(e.target.value)}
            sx={{ width: "100%", marginBottom: "1rem" }}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="firstname"
            variant="outlined"
            onChange={(e) => setNewFirstname(e.target.value)}
            sx={{ width: "100%", marginBottom: "1rem" }}
          />
          <br />
          <Button onClick={handleSubmitCreateUser}>Créer</Button>
        </Box>
      </Modal>
    </div>
  );
}
