import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import RoomPage from './pages/RoomPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Index user={user} setUser={setUser} />} />
        <Route path="/room/:roomId" element={<RoomPage user={user} />} />
      </Routes>
    </div>
  );
}

export default App;