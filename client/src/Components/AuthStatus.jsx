import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";

export function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.token) {
    return <p>You are not logged in.</p>;
  }

  useEffect(() => {
    console.log("%cAuthStatus.jsx line:26 auth.token", "color: #007acc;", auth.token);
    fetch("http://localhost:3000/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    }).then((response) => {
      if (response.status === 401) {
        auth.logout();
        navigate("/login");
      }
      response.json().then((data) => {
        if (data.preferedStack === null) navigate("/setPreferences");
      });
    });
  }, [auth.token]);

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
