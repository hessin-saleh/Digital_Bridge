import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GuestPage from './pages/GuestPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GuestPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
      </Routes>
    </Router>
  );
}

export default App;