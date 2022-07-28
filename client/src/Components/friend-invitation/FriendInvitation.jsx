import * as React from 'react';
import UserList from "./UserList";
import InvitationList from "./InvitationList";
import FriendList from "./FriendList";
import {useEffect, useState} from "react";

export default function FriendInvitation() {
  const [users, setUsers] = useState([]);
  const [sendedInvitations, setSendedInvitations] = useState([]);
  const [receivedInvitations, setReceivedInvitations] = useState([]);
  const [pendingSendedInvitations, setPendingSendedInvitations] = useState([]);
  const [pendingReceivedInvitations, setPendingReceivedInvitations] = useState([]);
  const [friends, setFriends] = useState([]);

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

    const pendingSendedInvitations = invitations.sendedInvitations.filter(invitation => invitation.status === "envoyé");
    setPendingSendedInvitations(pendingSendedInvitations);
    const pendingReceivedInvitations = invitations.receivedInvitations.filter(invitation => invitation.status === "envoyé");
    setPendingReceivedInvitations(pendingReceivedInvitations);
  }

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
    getInvitations().catch(console.error)
  }

  const updateInvitation = async (invitationId, newStatus) => {
    console.log(invitationId, newStatus);
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
    await fetch(`http://localhost:3000/invitations/${invitationId}`, requestOptions);
    await getInvitations().catch(console.error);
    await getFriends().catch(console.error);
  }

  const getFriends = async () => {
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await fetch('http://localhost:3000/friends', requestOptions);
    const friends = await response.json();
    setFriends(friends);
    console.log(friends);
  }

  const deleteFriend = async (friend) => {
    const id = friend.id;
    const userId = friend.userId;
    const friendId = friend.friendId;

    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        userId: userId,
        friendId: friendId
      })
    };
    await fetch(`http://localhost:3000/friends/${id}`, requestOptions);
    getInvitations().catch(console.error);
    getFriends().catch(console.error);
  }

  useEffect(() => {
    getUsers().catch(console.error);
    getInvitations().catch(console.error);
    getFriends().catch(console.error);
  }, [])

  return (
    <div style={{width: 800, margin: 'auto'}}>
      <UserList users={users} sendInvitation={sendInvitation} sendedInvitations={sendedInvitations} receivedInvitations={receivedInvitations} />
      <InvitationList updateInvitation={updateInvitation} pendingSendedInvitations={pendingSendedInvitations} pendingReceivedInvitations={pendingReceivedInvitations} />
      <FriendList friends={friends} deleteFriend={deleteFriend} />
    </div>
  );
}
