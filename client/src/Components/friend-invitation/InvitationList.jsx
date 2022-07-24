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
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import PersonIcon from '@mui/icons-material/Person';

export default function InvitationList() {
  const [sendedInvitations, setSendedInvitations] = useState([]);
  const [pendingInvitations, setPendingInvitations] = useState([]);
  const [receivedInvitations, setReceivedInvitations] = useState([]);
  const auth = React.useContext(AuthContext);

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

    const pendingInvitations = invitations.sendedInvitations.filter(invitation => invitation.status === "envoyé");
    setPendingInvitations(pendingInvitations);
  }

  const updateInvitation = async (invitationId, newStatus) => {
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        status: newStatus
      })
    };
    const response = await fetch(`http://localhost:3000/invitations/${invitationId}`, requestOptions);
    const msg = await response.json();
    console.log(msg);
  }

  useEffect(() => {
    getInvitations().catch(console.error);
  }, [])

  return (
    <>
      <div>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Invitations en attente
        </Typography>
        {pendingInvitations.length === 0 && <p>Aucune invitations envoyées</p>}
        {pendingInvitations.length > 0 && (
          <List>
            {sendedInvitations.map((invitation, index) => {
              return (
                <div key={index}>
                  <ListItem secondaryAction={`invitation ${invitation.status}`}>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={invitation.receiver.firstname}/>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              )})}
          </List>
        )}
      </div>
      <div>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Invitations reçues
        </Typography>
        {receivedInvitations.length === 0 && <p>Aucune invitations reçues</p>}
        {receivedInvitations.length > 0 && (
          <List>
            {receivedInvitations.map((invitation, index) => {
              return (
                <div key={index}>
                  <ListItem secondaryAction={invitation.status === 'envoyé' ? (
                    <div>
                      <Button style={{marginRight: 10}} onClick={() => updateInvitation(invitation.id, "accepté")} color="success" variant="contained" endIcon={<CheckIcon />}>
                        Accepter
                      </Button>
                      <Button onClick={() => updateInvitation(invitation.id, "refusé")} color="error" variant="contained" endIcon={<ClearIcon />}>
                        Refuser
                      </Button>
                    </div>
                  ) : (
                    <p>{invitation.status}</p>
                    )
                  }>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={invitation.sender.firstname}/>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              )})}
          </List>
        )}
      </div>
    </>
  );
}
