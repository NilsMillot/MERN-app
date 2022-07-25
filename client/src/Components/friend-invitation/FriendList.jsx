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

export default function FriendList(props) {
  const { friends } = props;

  return (
    <>
      <div>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Liste d'amis
        </Typography>
        {friends.map(friend => (
          <List>
            <div key={friend.id}>
              <ListItem secondaryAction={`amis`}>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={friend.firstname}/>
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          </List>
        ))}
      </div>
    </>
  );
}
