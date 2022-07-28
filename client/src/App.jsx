import { createContext, React } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import SignInPage from "./Components/SignInPage";
import SignUpPage from "./Components/SignUpPage";
import HomePage from "./Components/HomePage";
import Messaging from "./Components/chat/Messaging";
import { AuthProvider } from "./Components/AuthProvider";
import { RequireAuth } from "./Components/RequireAuth";
import WelcomePage from "./Components/WelcomePage";
import ResetPasswordPage from "./Components/ResetPasswordPage";
import ProfilePage from "./Components/ProfilePage";
import FriendInvitation from "./Components/friend-invitation/FriendInvitation";
import LogList from "./Components/LogList";

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
              <Messaging/>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
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
          <Route
            path="/logs"
            element={
              <RequireAuth>
                <LogList />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/confirm/:confirmationCode" element={<WelcomePage />} />
          <Route path="/password-reset/:userId/:token" element={<ResetPasswordPage />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
