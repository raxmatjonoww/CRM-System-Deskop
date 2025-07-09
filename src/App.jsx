import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Customers from './pages/Customers';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar'; // 🆕

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* 🔼 Navbar har doim ko‘rinadi */}
      <Routes>
        {/* 🛡 Himoyalangan sahifalar */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/customers" element={<PrivateRoute><Customers /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

        {/* 🔓 Ochiq sahifalar */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
