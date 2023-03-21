import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login';
import Home from './pages/Home';
import Received from './pages/Received';
import Sent from './pages/Sent';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login user={user} setUser={setUser} />} />
        <Route path="/received" element={<Received user={user} setUser={setUser} />} />
        <Route path="/sent" element={<Sent user={user} setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
