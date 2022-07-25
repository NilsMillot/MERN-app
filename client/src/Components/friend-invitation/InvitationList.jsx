import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Divider} from "@mui/material";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import PersonIcon from '@mui/icons-material/Person';

export default function InvitationList(props) {
  const { pendingSendedInvitations, pendingReceivedInvitations, updateInvitation } = props;

  return (
    <>
      <div>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Invitations en attente
        </Typography>
        {pendingSendedInvitations.length === 0 && <p>Aucune invitations envoyées</p>}
        {pendingSendedInvitations.length > 0 && (
          <List>
            {pendingSendedInvitations.map((invitation, index) => {
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
        {pendingReceivedInvitations.length === 0 && <p>Aucune invitations reçues</p>}
        {pendingReceivedInvitations.length > 0 && (
          <List>
            {pendingReceivedInvitations.map((invitation, index) => {
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
