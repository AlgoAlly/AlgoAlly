// import { useState } from "react";
import 'react';
import { Route, Routes } from 'react-router-dom';

import Profile from './pages/Profile';
import Problems from './pages/Problems';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Workspace from './pages/Workspace';

function App() {
  return (
    <>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
