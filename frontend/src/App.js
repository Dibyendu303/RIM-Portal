import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login';
import Home from './pages/Home';
import Received from './pages/Received';
import Sent from './pages/Sent';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/received" element={<Received setUser={setUser} />} />
        <Route path="/sent" element={<Sent setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
