import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login';
import Home from './pages/Home';
import Modal from './components/Modal';
import EnhancedTable from './components/EnhancedTable';
import Main from './pages/Main';
import ModifiedTable from './components/ModifiedTable';
import ModifiedTable2 from './components/ModifiedTable2';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/modal" element={<Modal />} />
        {/* <Route path="/table" element={<EnhancedTable />} /> */}
        {/* <Route path="/table" element={<ModifiedTable />} /> */}
        <Route path="/table" element={<ModifiedTable2 />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
