import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Divider} from "@mui/material";
import Button from "@mui/material/Button";
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';

export default function FriendList(props) {
  const { friends, deleteFriend } = props;

  return (
    <>
      <div>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Liste d'amis
        </Typography>
        {friends.length === 0 && <p>Aucun amis</p>}
        {friends.map(friend => (
          <List key={friend.id}>
            <div>
              <ListItem secondaryAction={
                <Button onClick={() => deleteFriend(friend)} color="error" variant="contained" endIcon={<DeleteIcon />}>
                  Supprimer
                </Button>
              }>
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
