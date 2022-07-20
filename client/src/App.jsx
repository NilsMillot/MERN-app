import { React } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>home</h1>} />
        <Route path="about" element={<h1>login</h1>} />
      </Routes>
    </div>
  );
}

export default App;
