import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', status: '' });
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/customers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCustomers(res.data);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate('/login');
      } else {
        console.error("❌ Mijozlarni olishda xatolik:", err.message);
      }
    }
  };

  const addCustomer = async () => {
    if (!form.name || !form.email) return alert("Ism va email majburiy!");
    try {
      await axios.post('http://localhost:5000/customers', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setForm({ name: '', email: '', phone: '', status: '' });
      fetchCustomers();
    } catch (err) {
      alert("❌ Mijozni qo‘shishda xatolik: " + (err.response?.data?.msg || err.message));
    }
  };

  const deleteCustomer = async (id) => {
    const confirm = window.confirm("Mijozni o‘chirmoqchimisiz?");
    if (!confirm) return;
    try {
      await axios.delete(`http://localhost:5000/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCustomers();
    } catch (err) {
      alert("❌ O‘chirishda xatolik: " + (err.response?.data?.msg || err.message));
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchCustomers();
    }
  }, []);

  return (
    <div style={styles.container}>
      <h2>📋 Mijozlar ro‘yxati</h2>

      <div style={styles.form}>
        <input
          placeholder="Ism"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Telefon"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />
        <input
          placeholder="Holat (masalan: Yangi, Qabul qilingan)"
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        />
        <button onClick={addCustomer}>➕ Qo‘shish</button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Ism</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Holat</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.status}</td>
              <td>
                <button onClick={() => deleteCustomer(c._id)} style={{ color: 'red' }}>
                  🗑 O‘chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 900,
    margin: '50px auto',
    fontFamily: 'Arial',
  },
  form: {
    display: 'flex',
    gap: 10,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
};

export default Customers;
