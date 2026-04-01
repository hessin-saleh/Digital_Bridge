// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { Key, User, Lock, Mail, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext'; // 1. استدعاء الـ Hook الخاص بنا

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login } = useAuth(); 
  
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/Signup', { name, email, password });
      
      login(res.data.Data, res.data.token);
      
      navigate('/dashboard');
    } catch (error) {
      console.error("Signup error:", error.response?.data);
      alert("فشل إنشاء الحساب. تأكد من صحة البيانات أو أن البريد مستخدم مسبقاً.");
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center p-4" style={{ backgroundColor: '#1e2124', color: '#fff' }}>

      <div className="d-flex align-items-center mb-4">
        <Key className="text-cyan me-2" size={36} />
        <h1 className="h4 fw-bold m-0 lh-sm">SECRET <br/><span className="text-cyan">VAULT</span></h1>
      </div>


      <div className="p-4 p-md-5 rounded-4 shadow-lg w-100" style={{ backgroundColor: '#2b2d31', maxWidth: '420px', border: '1px solid #3f4147' }}>
        <h2 className="h4 fw-bold text-center mb-4">Create Account</h2>
        
        <form onSubmit={handleSignup}>
        
          <div className="position-relative mb-3">
            <User className="position-absolute top-50 translate-middle-y text-secondary" size={20} style={{ left: '15px' }} />
            <input 
              type="text" placeholder="Full Name" value={name} 
              onChange={(e) => setName(e.target.value)}
              className="form-control border-cyan-2 text-white shadow-none"
              style={{ backgroundColor: '#383a40', paddingLeft: '45px', height: '50px' }}
              required
            />
          </div>

         
          <div className="position-relative mb-3">
            <Mail className="position-absolute top-50 translate-middle-y text-secondary" size={20} style={{ left: '15px' }} />
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
            Sign Up
          </button>
        </form>
      </div>

      
      <div className="p-3 rounded-4 mt-3 w-100 text-center" style={{ backgroundColor: '#2b2d31', maxWidth: '420px', border: '1px solid #3f4147' }}>
        <span className="text-muted small">Already have an account? </span>
        <Link to="/login" className="text-cyan text-decoration-none small hover-underline fw-bold">Login here</Link>
      </div>

    </div>
  );
}