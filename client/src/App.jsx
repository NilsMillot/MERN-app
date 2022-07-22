import { createContext, React, useState, useContext, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import HomePage from "./components/HomePage";
import { fakeAuthProvider } from "./utils/auth";

export let AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  let [user, setUser] = useState(null);
  let [name, setName] = useState("");
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

  console.log("%cApp.jsx line:61 name", "color: #007acc;", name);
  let value = { token, signin, signout, ...user, setName, name };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/messaging"
            element={
              <RequireAuth>
                <h1>Votre messagerie</h1>
              </RequireAuth>
            }
          />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
