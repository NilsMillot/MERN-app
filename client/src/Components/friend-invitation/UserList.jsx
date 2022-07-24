import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Divider} from "@mui/material";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import {AuthContext} from "../../App";
import PersonIcon from '@mui/icons-material/Person';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [sendedInvitations, setSendedInvitations] = useState([]);
  const [receivedInvitations, setReceivedInvitations] = useState([]);
  const auth = React.useContext(AuthContext);

  const getUsers = async () => {
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await fetch('http://localhost:3000/users', requestOptions);
    const users = await response.json();
    setUsers(users);
  }

  const getInvitations = async () => {
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await fetch('http://localhost:3000/invitations', requestOptions);
    const invitations = await response.json();
    setSendedInvitations(invitations.sendedInvitations);
    setReceivedInvitations(invitations.receivedInvitations);
    console.log(invitations.sendedInvitations);
  }

  useEffect(() => {
    getUsers().catch(console.error);
    getInvitations().catch(console.error);
  }, [])

  const sendInvitation = async (receiverId) => {
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        receiverId: receiverId
      })
    };
    const response = await fetch('http://localhost:3000/invitations', requestOptions);
    const responseObj = await response.json();
    console.log(responseObj);
  }

  const checkUserInvitation = (userId) => {
    const sendedInviationFound = sendedInvitations.find(invitation => invitation.senderId === auth.id && invitation.receiverId === userId);
    const receivedInvitationFound = receivedInvitations.find(invitation => invitation.senderId === userId && invitation.receiverId === auth.id);
    return sendedInviationFound || receivedInvitationFound;
  }

  return (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Liste d'utilisateurs
      </Typography>
      <List>
        {users.map((user, index) => {
          return (
            <div key={index}>
              {/* AUTHENTICATED USER */}
              {auth.id === user.id && (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`${user.firstname} (vous)`}/>
                </ListItem>
              )}
              {/* USER HAS NO INVITATION YET */}
              {auth.id !== user.id && !checkUserInvitation(user.id) && (
                <ListItem secondaryAction={
                  <Button onClick={() => sendInvitation(user.id)} variant="contained" endIcon={<SendIcon />}>
                    Envoyer une invitation
                  </Button>
                }>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.firstname}/>
                </ListItem>
              )}
              {/* USER HAS ALREADY AN INVITATION */}
              {checkUserInvitation(user.id) && (
                <ListItem secondaryAction={`invitation ${checkUserInvitation(user.id).status}`}>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.firstname}/>
                </ListItem>
              )}
              <Divider variant="inset" component="li" />
            </div>
          )})}
      </List>
    </div>
  );
}
