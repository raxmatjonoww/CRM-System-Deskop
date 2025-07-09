import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]); // navigate dependency sifatida qo‘shildi

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h1>🏠 CRM Bosh sahifa</h1>
      <button onClick={handleLogout} style={styles.logoutButton}>🔓 Logout</button>
    </div>
  );
}

const styles = {
  container: {
    padding: 40,
    fontFamily: 'Arial',
    textAlign: 'center',
  },
  logoutButton: {
    padding: '10px 20px',
    fontSize: 16,
    backgroundColor: '#1a5bff',
    color: 'white',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    marginTop: 20,
  },
};

export default Home;
