import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContexts';
import { useNavigate } from "react-router-dom";
import { ToastContext } from '../contexts/ToastContext';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken();
        // send idtoken to server
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/google`, { idToken });
        login(res.data.user, res.data.token);
        // show success message 
        showToast(`Welcome ${result.user.displayName}`, "success");
        navigate("/");
    } catch (err) {
        console.error(err); 
        showToast("Google login failed", "danger");
    } finally { 
        setLoading(false);
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, {
        username,
        email,
        password,
      });
      login(res.data.user, res.data.token); // auto login after registration
      // show feedback
      showToast(`Its a pressure to meet you, ${res.data.user.username}`, "success");
      navigate("/");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed";
      showToast(errorMsg, "danger");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
            <h5 className="mb-4 text-center">Create an Account</h5>
            {loading ? <Loader message='Setting up account...' /> : (
                <form onSubmit={handleSubmit}>
                
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-person"></i>
                            </span>
                            <input
                                type="name"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                
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
            )}
            <button className="btn btn-outline-dark w-100 mt-2" onClick={handleGoogleSignup}>
                <i className="bi bi-google me-2"></i> Sign up with Google
            </button>
            <div className="text-center mt-3">
                <span>Have an account? </span>
                <Link to="/login">login</Link>
            </div>

        </div>
    </div>

  );
}
