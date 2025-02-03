// import { useState } from "react";
import "react";
import { Route, Routes } from "react-router-dom";

import Profile from "./pages/Profile";
import Problems from "./pages/Problems";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
