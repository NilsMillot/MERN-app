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

export default function UserList(props) {
  const { users, sendInvitation, sendedInvitations, receivedInvitations } = props;
  const auth = React.useContext(AuthContext);

  const checkUserInvitation = (userId) => {
    const sendedInvitationFound = sendedInvitations.find(invitation => invitation.senderId === auth.id && invitation.receiverId === userId);
    const receivedInvitationFound = receivedInvitations.find(invitation => invitation.senderId === userId && invitation.receiverId === auth.id);
    if (sendedInvitationFound) return `invitation ${sendedInvitationFound.status}`
    if (receivedInvitationFound && receivedInvitationFound.style === "envoyé") return "invitation reçue"
    if (receivedInvitationFound && receivedInvitationFound.style !== "envoyé") return `invitation ${receivedInvitationFound.status}`
    if (!sendedInvitationFound && !receivedInvitationFound) return false;
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
                <ListItem secondaryAction={`${checkUserInvitation(user.id)}`}>
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
