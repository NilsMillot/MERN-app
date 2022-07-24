import * as React from 'react';
import UserList from "./UserList";
import InvitationList from "./InvitationList";

export default function FriendInvitation() {

  return (
    <div style={{width: 800, margin: 'auto'}}>
      <UserList />
      <InvitationList />
    </div>
  );
}
