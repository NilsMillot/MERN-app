import React from "react";
import { AuthContext } from "../App";

export default function HomePage() {
  //   const { token } = React.useContext(AuthContext);
  const auth = React.useContext(AuthContext);

  return (
    <>
      <h1>HomePage protected</h1>
      <div>Authenticated as {auth?.email}</div>
    </>
  );
}
