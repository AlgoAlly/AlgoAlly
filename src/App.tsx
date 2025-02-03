// import { useState } from "react";
import "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import Profile from "./pages/Profile";
import Problems from "./pages/Problems";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
