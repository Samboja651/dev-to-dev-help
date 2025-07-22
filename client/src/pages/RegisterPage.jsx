import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContexts';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, {
        email,
        password,
      });
      login(res.data.user, res.data.token); // auto login after registration
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
      <h5 className="mb-3">Register</h5>
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control mb-3" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" className="form-control mb-3" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="btn btn-success w-100">Create Account</button>
      </form>
    </div>
  );
}
