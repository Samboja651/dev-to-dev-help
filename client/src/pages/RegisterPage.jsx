import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContexts';
import { useNavigate } from "react-router-dom";
import { ToastContext } from '../contexts/ToastContext';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, {
        email,
        password,
      });
      login(res.data.user, res.data.token); // auto login after registration
      // show feedback
      showToast("Its a pressure to meet you");
      navigate("/");
    } catch (err) {
      showToast(err.response?.data?.message, "danger");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
            <h5 className="mb-4 text-center">Create an Account</h5>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-envelope"></i>
                        </span>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-lock"></i>
                        </span>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button className="btn btn-primary w-100">Register</button>
            </form>
            <div className="text-center mt-3">
                <span>Have an account? </span>
                <Link to="/login">login</Link>
            </div>

        </div>
    </div>

  );
}
