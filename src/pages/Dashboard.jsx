import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [stats, setStats] = useState({ users: 0, customers: 0 });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Token yo‘q bo‘lsa login sahifasiga o'tkazish
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(res.data);
      } catch (err) {
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          navigate('/login');
        } else {
          setError(err.response?.data?.msg || "Serverdan ma’lumot olishda xatolik yuz berdi.");
        }
      }
    };

    fetchStats();
  }, [navigate]);

  return (
    <div style={styles.wrapper}>
      <h1>📊 Dashboard</h1>

      {error && <p style={{ color: 'red', marginBottom: 20 }}>{error}</p>}

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>👥 Foydalanuvchilar</h3>
          <p style={styles.number}>{stats.users}</p>
        </div>
        <div style={styles.card}>
          <h3>📇 Mijozlar</h3>
          <p style={styles.number}>{stats.customers}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: 800,
    margin: '50px auto',
    fontFamily: 'Arial',
    padding: 20,
  },
  cardContainer: {
    display: 'flex',
    gap: 20,
    marginTop: 30,
    flexWrap: 'wrap',
  },
  card: {
    flex: 1,
    padding: 20,
    border: '1px solid #ccc',
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    minWidth: 200,
  },
  number: {
    fontSize: 36,
    color: '#1a5bff',
    marginTop: 10,
  },
};

export default Dashboard;
