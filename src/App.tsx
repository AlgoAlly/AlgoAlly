// import { useState } from "react";
import 'react';
import { Route, Routes } from 'react-router-dom';

import Profile from './pages/Profile';
import Problems from './pages/Problems';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Workspace from './pages/Workspace';
import Home from './pages/Home';
import Game from './pages/Game';
import WorkspaceWrapper from './pages/WorkspaceWrapper';

function App() {
    return (
        <>
            <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/problems" element={<Problems />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/workspace" element={<Workspace />} />
                <Route path="/workspace/:id" element={<WorkspaceWrapper />} />
                <Route path="/game" element={<Game />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    );
}

export default App;
