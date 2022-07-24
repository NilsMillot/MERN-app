import { createContext, React } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import HomePage from "./components/HomePage";
import { AuthProvider } from "./components/AuthProvider";
import { RequireAuth } from "./components/RequireAuth";
import WelcomePage from "./components/WelcomePage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import ProfilePage from "./components/ProfilePage";

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
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
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
