import { createContext, React } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import SignInPage from "./Components/SignInPage";
import SignUpPage from "./Components/SignUpPage";
import HomePage from "./Components/HomePage";
import { AuthProvider } from "./Components/AuthProvider";
import { RequireAuth } from "./Components/RequireAuth";
import FriendInvitation from "./Components/friend-invitation/FriendInvitation";

export let AuthContext = createContext(null);

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
          <Route
            path="/friends"
            element={
              <RequireAuth>
                <FriendInvitation />
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
