import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!form.email || !form.password) {
      return setError('Email va parol kiritilishi shart!');
    }

    setLoading(true);
    setError('');

    try {
      // Foydalanuvchini ro‘yxatdan o‘tkazish
      await axios.post('http://localhost:5000/register', form);

      // Ro‘yxatdan o‘tgach, avtomatik login
      const loginRes = await axios.post('http://localhost:5000/login', form);
      localStorage.setItem('token', loginRes.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Ro‘yxatdan o‘tishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2>🆕 Ro‘yxatdan o‘tish</h2>

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        style={styles.input}
      />

      <div style={styles.passwordWrapper}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Parol"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{ ...styles.input, flex: 1 }}
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          type="button"
          style={styles.toggleBtn}
        >
          {showPassword ? '🙈' : '👁'}
        </button>
      </div>

      <button onClick={handleRegister} style={styles.button} disabled={loading}>
        {loading ? '⏳ Ro‘yxatdan o‘tilmoqda...' : 'Ro‘yxatdan o‘tish'}
      </button>

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: 400,
    margin: '100px auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    padding: 20,
    border: '1px solid #ccc',
    borderRadius: 8,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial',
  },
  input: {
    padding: 10,
    fontSize: 16,
    border: '1px solid #ccc',
    borderRadius: 4,
    outline: 'none',
  },
  button: {
    padding: 12,
    fontSize: 16,
    backgroundColor: '#1a5bff',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 10,
  },
  passwordWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  toggleBtn: {
    background: '#eee',
    border: 'none',
    padding: '8px 10px',
    borderRadius: 4,
    cursor: 'pointer',
  },
};

export default Register;
