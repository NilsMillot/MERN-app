import React, { useEffect, useState } from "react";
import { AuthContext } from "../App";
import { fakeAuthProvider } from "../utils/auth";

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  let [user, setUser] = useState(null);
  let [token, setToken] = useState(() => {
    if (hasJWT()) return localStorage.getItem("token");
  });

  function hasJWT() {
    let flag = false;
    localStorage.getItem("token") ? (flag = true) : (flag = false);
    return flag;
  }

  useEffect(() => {
    if (hasJWT()) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: localStorage.getItem("token")
        })
      };
      fetch("http://localhost:3000/checkToken", requestOptions).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            setUser(data);
          });
        }
      });
    }
  }, [token]);

  let signin = (newToken, callback) => {
    return fakeAuthProvider.signin(() => {
      setToken(newToken);
      callback();
    });
  };

  let signout = (callback) => {
    localStorage.removeItem("token");
    return fakeAuthProvider.signout(() => {
      setToken(null);
      callback();
    });
  };

  let value = { token, signin, signout, ...user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
