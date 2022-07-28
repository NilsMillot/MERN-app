import { createContext, React } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import HomePage from "./components/HomePage";
import Messaging from "./Components/chat/Messaging";
import { AuthProvider } from "./components/AuthProvider";
import { RequireAuth } from "./components/RequireAuth";

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
          <Route path="/login" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
