import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login';
import Home from './pages/Home';
import Modal from './components/Modal';
import EnhancedTable from './components/EnhancedTable';
import Main from './pages/Home';
import Received from './pages/Received';
import Sent from './pages/Sent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/table" element={<EnhancedTable />} />
        <Route path="/received" element={<Received />} />
        <Route path="/sent" element={<Sent />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
