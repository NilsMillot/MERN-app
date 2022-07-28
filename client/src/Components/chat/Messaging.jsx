import React from "react";
import { AuthContext } from "../../App";
import ChatHeader from "./Chat_Header";

export default function HomePage() {
  //   const { token } = React.useContext(AuthContext);
  const auth = React.useContext(AuthContext);

  return (
    <>
      <ChatHeader/>
      <div>Authenticated as {auth?.email}</div>
    </>
  );
}