import { useState } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<h1>home</h1>} />
        <Route path="about" element={<h1>login</h1>} />
      </Routes>
    </div>
  );
}

export default App;
