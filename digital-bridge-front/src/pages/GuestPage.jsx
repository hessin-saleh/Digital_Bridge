// src/pages/GuestPage.jsx
import React, { useState } from 'react';
import { Key } from 'lucide-react';
import api from '../api';

export default function GuestPage() {
  const [content, setContent] = useState('');
  const [expiresIn, setExpiresIn] = useState(15);
  const [generatedCode, setGeneratedCode] = useState(null);
  
  const [readCode, setReadCode] = useState('');
  const [secretMessage, setSecretMessage] = useState(null);

  const handleCreate = async () => {
    try {
      const res = await api.post('/guest/create', { content, expiresInMinutes: expiresIn });
      setGeneratedCode(res.data.data.code);
    } catch (error) {
      console.error("Error creating message", error);
    }
  };

  const handleRead = async () => {
    try {
      const res = await api.get(`/guest/${readCode}`);
      setSecretMessage(res.data.data.content);
    } catch (error) {
      alert("Message not found or expired!");
      console.log(error)
    }
  };

  return (
    <div className="container-fluid min-vh-100 p-4 p-md-5" style={{ backgroundColor: '#1e2124', color: '#fff' }}>
      
      {/* Header */}
      <div className="d-flex align-items-center mb-5">
        <Key className="text-cyan me-2" size={36} />
        <h1 className="h3 fw-bold m-0 lh-sm">SECRET <br/><span className="text-cyan">VAULT</span></h1>
      </div>

      <div className="row g-5 mx-auto" style={{ maxWidth: '1100px' }}>
        
        {/* Left Column: Create Message */}
        <div className="col-lg-6">
          <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>Guest for guest</p>
          <h2 className="h4 fw-bold mb-4">Create a Secret Message</h2>
          
          <div className="bg-white text-dark p-4 rounded-4 shadow">
            <div className="mb-3">
              <label className="form-label fw-bold small">Textarea</label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-control border-cyan-2 bg-light shadow-sm"
                rows="4" 
                placeholder="Your Secret Message"
              />
            </div>
            
            <div className="mb-4">
              <label className="form-label fw-bold small">Expires In</label>
              <select 
                value={expiresIn}
                onChange={(e) => setExpiresIn(Number(e.target.value))}
                className="form-select bg-light shadow-sm"
              >
                <option value={5}>5 Minutes</option>
                <option value={60}>1 Hour</option>
                <option value={1440}>24 Hours</option>
              </select>
            </div>

            <div className="position-relative">
              <button 
                onClick={handleCreate} 
                className="btn btn-dark-custom w-100 py-2 fw-bold rounded-3"
              >
                Generate Secret Code
              </button>

              {/* Popup Tooltip for Generated Code */}
              {generatedCode && (
                <div className="position-absolute top-100 start-50 translate-middle-x mt-3 bg-white p-4 rounded-4 shadow-lg border border-light text-center z-3" style={{ width: '280px' }}>
                  {/* Arrow pointing up */}
                  <div className="position-absolute top-0 start-50 translate-middle bg-white border-top border-start border-light" style={{ width: '16px', height: '16px', transform: 'rotate(45deg)' }}></div>
                  
                  {/* Close button */}
                  <button type="button" className="btn-close position-absolute top-0 end-0 m-3" aria-label="Close" onClick={() => setGeneratedCode(null)}></button>
                  
                  <p className="small fw-bold text-muted mb-1">Unique Code</p>
                  <h3 className="fw-bold tracking-wider mb-3 display-6">{generatedCode}</h3>
                  <div className="bg-light border px-3 py-1 rounded-2 small text-muted mb-3 d-inline-block w-100">
                    sec.v/{generatedCode}
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-dark-custom flex-grow-1 py-2" style={{ fontSize: '0.85rem' }}>Copy Code</button>
                    <button className="btn btn-dark-custom flex-grow-1 py-2" style={{ fontSize: '0.85rem' }}>Share Link</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Read Message */}
        <div className="col-lg-6">
          <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>Guest for guest</p>
          <h2 className="h4 fw-bold mb-4">Read a Secret Message</h2>
          
          <div className="bg-white text-dark p-4 rounded-4 shadow">
            <div className="mb-4">
              <label className="form-label fw-bold small">Input</label>
              <div className="d-flex gap-2">
                <input 
                  value={readCode}
                  onChange={(e) => setReadCode(e.target.value)}
                  type="text" 
                  className="form-control border-cyan-2 bg-light shadow-sm" 
                  placeholder="Enter Secret Code"
                />
                <button 
                  onClick={handleRead} 
                  className="btn btn-dark-custom px-4 fw-bold rounded-3 text-nowrap"
                >
                  Decipher & Read
                </button>
              </div>
            </div>

            {secretMessage && (
              <div className="border border-cyan-2 rounded-3 overflow-hidden bg-light mt-4">
                 <div className="bg-secondary bg-opacity-10 px-3 py-2 fw-bold d-flex justify-content-between align-items-center border-bottom border-light">
                   Message 
                   <span className="text-muted" style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>v</span>
                 </div>
                 <div className="p-3 bg-white">
                   <p className="small text-muted mb-2">This message will self-destruct in 12:34.</p>
                   <p className="fw-medium mb-0" style={{ fontSize: '1.1rem' }}>{secretMessage}</p>
                 </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}