// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Key, User, Lock, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext'; // 1. استدعاء الـ Hook الخاص بنا

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login } = useAuth(); 
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      const res = await api.post('/auth/Login', { email, password });
      
     
      login(res.data.Data, res.data.token);
      
   
      navigate('/dashboard');
    } catch (error) {
      alert("فشل تسجيل الدخول. يرجى التأكد من البيانات.");
      console.error({msg:error})
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center p-4" style={{ backgroundColor: '#1e2124', color: '#fff' }}>
      
      <div className="d-flex align-items-center mb-4">
        <Key className="text-cyan me-2" size={36} />
        <h1 className="h4 fw-bold m-0 lh-sm">SECRET <br/><span className="text-cyan">VAULT</span></h1>
      </div>

      <div className="p-4 p-md-5 rounded-4 shadow-lg w-100" style={{ backgroundColor: '#2b2d31', maxWidth: '420px', border: '1px solid #3f4147' }}>
        <h2 className="h4 fw-bold text-center mb-4">Secure Login</h2>
        
        <form onSubmit={handleLogin}>
          <div className="position-relative mb-3">
            <User className="position-absolute top-50 translate-middle-y text-secondary" size={20} style={{ left: '15px' }} />
            <input 
              type="email" placeholder="Email Address" value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="form-control border-cyan-2 text-white shadow-none"
              style={{ backgroundColor: '#383a40', paddingLeft: '45px', height: '50px' }}
              required
            />
          </div>

          <div className="position-relative mb-4">
            <Lock className="position-absolute top-50 translate-middle-y text-secondary" size={20} style={{ left: '15px' }} />
            <input 
              type="password" placeholder="Password" value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="form-control border-cyan-2 text-white shadow-none"
              style={{ backgroundColor: '#383a40', paddingLeft: '45px', paddingRight: '45px', height: '50px' }}
              required
            />
            <EyeOff className="position-absolute top-50 translate-middle-y text-secondary" size={20} style={{ right: '15px', cursor: 'pointer' }} />
          </div>

          <button type="submit" className="btn btn-cyan w-100 fw-bold rounded-3 shadow" style={{ height: '50px', fontSize: '1.05rem' }}>
            Unlock Vault
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="#" className="text-muted text-decoration-none small">Forgot Password?</a>
        </div>
      </div>

      <div className="p-3 rounded-4 mt-3 w-100 text-center" style={{ backgroundColor: '#2b2d31', maxWidth: '420px', border: '1px solid #3f4147' }}>
        <span className="text-muted small">First time? </span>
        <Link to="/signup" className="text-cyan text-decoration-none small hover-underline fw-bold">Create an Account</Link>
      </div>
    </div>
  );
}