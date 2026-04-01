// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Key, Plus, Edit2, Trash2, X, LogOut, Settings, Folder, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext'; 

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 
  const { user, logout } = useAuth(); 


  const [showModal, setShowModal] = useState(false);
  const [newItemContent, setNewItemContent] = useState('');
  const [newItemTag, setNewItemTag] = useState('general');

  // --- حالات (States) نافذة "التعديل" ---
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editItemContent, setEditItemContent] = useState('');
  const [editItemTag, setEditItemTag] = useState('general');

  useEffect(() => {
    fetchVaultItems();
  }, []);

  const fetchVaultItems = async () => {
    try {
      const res = await api.get('/vault');
      setItems(res.data.Data || []);
      setLoading(false);
    } catch (error) {
      console.error("Fetch failed:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout();
      }
      setLoading(false);
    }
  };

  // [CREATE] إضافة عنصر جديد
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/vault', {
        content: newItemContent,
        tags: newItemTag // نرسل 'tags' بالجمع لتطابق الباك اند
      });
      setItems([res.data.Data, ...items]);
      setNewItemContent('');
      setNewItemTag('general');
      setShowModal(false);
    } catch (error) {
      console.error("Add failed:", error.response?.data);
      alert("فشل إضافة العنصر.");
    }
  };

  // [UPDATE] تعديل عنصر
  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/vault/${editingItemId}`, {
        content: editItemContent,
        tags: editItemTag
      });
      // تحديث العنصر في القائمة فوراً
      setItems(items.map(item => item._id === editingItemId ? res.data.Data : item));
      setShowEditModal(false);
    } catch (error) {
      console.error("Update failed:", error.response?.data);
      alert("فشل التعديل.");
    }
  };

  
  const deleteItem = async (id) => {
    if(window.confirm("هل أنت متأكد من حذف هذا العنصر؟")) {
      try {
        await api.delete(`/vault/${id}`);
        setItems(items.filter(item => item._id !== id));
      } catch (error) {
        console.error({msg:"Delete failed", error});
      }
    }
  };

 
  const handleEditClick = (item) => {
    setEditingItemId(item._id);
    setEditItemContent(item.content);
    setEditItemTag(item.tags || 'general');
    setShowEditModal(true);
  };
{user?.name ? user.name.charAt(0).toUpperCase() : '?'}

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getTagBadge = (tag) => {
    const lowerTag = tag?.toLowerCase() || 'general';
    if (lowerTag === 'dev') return <span className="badge rounded-pill text-dark px-3 py-2" style={{ backgroundColor: '#00e5ff' }}>Dev</span>;
    if (lowerTag === 'learn') return <span className="badge rounded-pill text-dark px-3 py-2" style={{ backgroundColor: '#ffc107' }}>Learn</span>;
    return <span className="badge rounded-pill text-dark px-3 py-2" style={{ backgroundColor: '#ced4da' }}>General</span>;
  };

  return (
    <div className="d-flex min-vh-100 position-relative" style={{ backgroundColor: '#1e2124', color: '#fff' }}>
      
      {/* Sidebar */}
      <div className="d-flex flex-column flex-shrink-0" style={{ width: '280px', backgroundColor: '#2b2d31', borderRight: '1px solid #3f4147' }}>
        <div className="p-4 border-bottom border-secondary border-opacity-25 d-flex align-items-center gap-2">
          <Key className="text-cyan" size={28} />
          <h1 className="h5 fw-bold m-0 lh-1">SECRET <br/><span className="text-cyan">VAULT</span></h1>
        </div>
        
        <div className="p-4 border-bottom border-secondary border-opacity-25 d-flex align-items-center gap-3">
          <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-dark" style={{ width: '45px', height: '45px', backgroundColor: '#adb5bd', fontSize: '1.2rem' }}>
            {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
          </div>
          <div className="lh-sm">
            <small className="text-muted d-block">Welcome,</small>
            <span className="fw-bold">{user?.name || 'User'}</span>
            <small className="text-muted d-block mt-1 small">Role: {user?.role || 'user'}</small>
          </div>
        </div>

        <div className="p-3 flex-grow-1">
          <div className="sidebar-link active mb-2"> <Folder size={18} className="me-2"/> All Items</div>
        </div>

        <div className="p-3 mt-auto">
          <button onClick={handleLogout} className="btn btn-outline-danger w-100 d-flex align-items-center gap-2 border-0">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 p-md-5 overflow-auto">
        <h2 className="display-6 fw-bold mb-4">My Secure Vault</h2>
        
        <button onClick={() => setShowModal(true)} className="btn btn-cyan fw-bold px-4 py-2 rounded-3 mb-5 d-flex align-items-center gap-2 shadow">
          <Plus size={20} /> Add New Item
        </button>

        <div style={{ maxWidth: '850px' }}>
          {loading ? (
            <div className="text-center py-5"><div className="spinner-border text-cyan"></div></div>
          ) : items.map(item => (
            <div key={item._id} className="vault-card border border-light border-opacity-10 mb-3 p-4 rounded-4 bg-light text-dark shadow-sm">
              <div className="d-flex justify-content-between">
                <p className="mb-0 fw-medium text-break flex-grow-1 pe-4">{item.content}</p>
                <div className="d-flex gap-3">
                  <Edit2 size={19} className="text-primary cursor-pointer" style={{cursor: 'pointer'}} onClick={() => handleEditClick(item)} />
                  <Trash2 size={19} className="text-danger cursor-pointer" style={{cursor: 'pointer'}} onClick={() => deleteItem(item._id)} />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                {getTagBadge(item.tags)}
                <span className="small text-muted">ID: ...{item._id?.slice(-6)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

   
      {showModal && (
        <>
          <div className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-75" style={{ zIndex: 1040, backdropFilter: 'blur(4px)' }} onClick={() => setShowModal(false)}></div>
          <div className="position-fixed top-50 start-50 translate-middle w-100" style={{ maxWidth: '500px', zIndex: 1050, padding: '1rem' }}>
            <div className="bg-dark rounded-4 shadow-lg border border-secondary p-4">
              <h5 className="fw-bold mb-4">Add New Secret</h5>
              <form onSubmit={handleAddItem}>
                <textarea className="form-control mb-3 bg-secondary bg-opacity-25 text-white border-cyan" rows="4" value={newItemContent} onChange={(e) => setNewItemContent(e.target.value)} placeholder="Secret content..." required />
                <select className="form-select mb-4 bg-secondary bg-opacity-25 text-white border-cyan" value={newItemTag} onChange={(e) => setNewItemTag(e.target.value)}>
                  <option value="general">General</option>
                  <option value="dev">Dev</option>
                  <option value="learn">Learn</option>
                </select>
                <div className="d-flex gap-2 justify-content-end">
                  <button type="button" className="btn btn-link text-white text-decoration-none" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-cyan px-4 fw-bold">Save</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

    
      {showEditModal && (
        <>
          <div className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-75" style={{ zIndex: 1040, backdropFilter: 'blur(4px)' }} onClick={() => setShowEditModal(false)}></div>
          <div className="position-fixed top-50 start-50 translate-middle w-100" style={{ maxWidth: '500px', zIndex: 1050, padding: '1rem' }}>
            <div className="bg-dark rounded-4 shadow-lg border border-warning p-4">
              <h5 className="fw-bold mb-4 text-warning">Edit Secret</h5>
              <form onSubmit={handleUpdateItem}>
                <textarea className="form-control mb-3 bg-secondary bg-opacity-25 text-white border-warning shadow-none" rows="4" value={editItemContent} onChange={(e) => setEditItemContent(e.target.value)} required />
                <select className="form-select mb-4 bg-secondary bg-opacity-25 text-white border-warning shadow-none" value={editItemTag} onChange={(e) => setEditItemTag(e.target.value)}>
                  <option value="general">General</option>
                  <option value="dev">Dev</option>
                  <option value="learn">Learn</option>
                </select>
                <div className="d-flex gap-2 justify-content-end">
                  <button type="button" className="btn btn-link text-white text-decoration-none" onClick={() => setShowEditModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-warning px-4 fw-bold text-dark">Update</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

    </div>
  );
}