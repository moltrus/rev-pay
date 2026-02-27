import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        payload,
      );

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.user.role);
      localStorage.setItem('userName', response.data.user.fullName);

      alert('Welcome back, ' + response.data.user.fullName);


      navigate('/dashboard'); 
    } catch (err) {
      alert('Login failed. Check your email or password.');
    }
  };


  return (
    <div className="auth-container">
      <h2>RevPay Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;