// import { useState } from "react";
import 'react';
import { Route, Routes } from 'react-router-dom';

import Profile from './pages/Profile';
import Problems from './pages/Problems';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Friends from './pages/Friends';
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </>
  );
}

export default App;
