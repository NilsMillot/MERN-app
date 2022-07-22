import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";

export function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  console.log("%cAuthStatus.jsx line:9 auth", "color: #007acc;", auth);
  if (!auth.token) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth?.firstname}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}>
        Sign out
      </button>
    </p>
  );
}
