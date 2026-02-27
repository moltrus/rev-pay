import { useState } from 'react';
import axios from 'axios';
import '../App.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('personal');

  const [businessName, setBusinessName] = useState('');
  const [taxId, setTaxId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: fullName,
      email: email,
      password: password,
      role: role,
      businessName: businessName,
      taxId: taxId,
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        payload,
      );
      alert(response.data.message);
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>RevPay Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="role-selector">
          <label>Account Type: </label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="personal">Personal</option>
            <option value="business">Business</option>
          </select>
        </div>

        {role === 'business' ? (
          <div className="business-section">
            <h4>Business Details</h4>
            <input
              type="text"
              placeholder="Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required={role === 'business'}
            />
            <input
              type="text"
              placeholder="Tax ID / Registration Number"
              value={taxId}
              onChange={(e) => setTaxId(e.target.value)}
              required={role === 'business'}
            />
          </div>
        ) : null}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
