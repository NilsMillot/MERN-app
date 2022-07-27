import React from "react";

import { AuthContext } from "../../App";
import { Route, Routes } from "react-router-dom";

export default function AdminHome() {
  //   const { token } = React.useContext(AuthContext);
  const auth = React.useContext(AuthContext);

  if (auth?.isAdmin) {
    return (
      <>
        <h1>ADMIN PAGE</h1>
      </>
    );
  } else {
    return (
      <>
        <h1>Tu n'as pas le droit d'être ici ! </h1>
      </>
    );
  }
}
