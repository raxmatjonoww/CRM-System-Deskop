// components/Navbar.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './navbar.css';
import { useEffect, useState } from 'react';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // true agar token mavjud bo‘lsa
  }, [location]); // Har safar sahifa o‘zgarganda tekshiradi

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  if (!isLoggedIn) return null; // Agar login bo‘lmagan bo‘lsa, navbarni ko‘rsatmaymiz

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">CRM System</Link>
      </div>
      <ul className="navbar__links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/customers">Customers</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
