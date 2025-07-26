import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContexts';
import { useNavigate } from "react-router-dom";
import { ToastContext } from '../contexts/ToastContext';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    
    const navigate = useNavigate();
    //show cool feedback messages
    const { showToast } = useContext(ToastContext);
    //show loading
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
                email,
                password,
            });
            login(res.data.user, res.data.token);
            showToast(`Great to see you again ${res.data.user.username}`)
            //redirect to dashboard
            navigate("/");
        } catch (err) {
            showToast("Login failed: " + err.response?.data?.message, "danger");
        } finally {
            setLoading(false);
        }
    };
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("user", user);
            showToast(`Welcome ${user.displayName}`, "success");
            navigate("/");
        } catch (err) {
            console.error(err);
            showToast("Google login failed", "danger");
        }
    };
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <h5 className="mb-4 text-center">Login</h5>
                {loading ? <Loader message='Authenticating ...' /> : (
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

                        <button className="btn btn-primary w-100">Login</button>
                    </form>
                )}
                <button className="btn btn-outline-dark w-100 mt-2" onClick={handleGoogleLogin}>
                <i className="bi bi-google me-2"></i> Sign in with Google
                </button>

                <div className="text-center mt-3">
                    <span>New here? </span>
                    <Link to="/register">Create an account</Link>
                </div>

            </div>
        </div>

    );
}