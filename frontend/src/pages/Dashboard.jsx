import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/user/dashboard', {
          headers: { Authorization: token }
        });
        setData(res.data);
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };
    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="auth-container" style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Welcome, {data.fullName}</h1>
        <button onClick={handleLogout} style={{ background: '#e74c3c', width: 'auto', padding: '5px 15px' }}>Logout</button>
      </div>

      <div className="balance-card" style={{ background: '#27ae60', color: 'white', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
        <h3>Current Balance</h3>
        <h2>${data.balance.toFixed(2)}</h2>
      </div>

      <div className="actions" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
        <button>Send Money</button>
        <button>Request Money</button>
      </div>

      {data.role === 'business' ? (
        <div className="business-section" style={{ marginTop: '30px' }}>
          <h2>Business Tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button style={{ backgroundColor: '#3498db' }}>Create Invoice</button>
            <button style={{ backgroundColor: '#3498db' }}>Business Analytics</button>
            <button style={{ backgroundColor: '#3498db' }}>Apply for Loan</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;