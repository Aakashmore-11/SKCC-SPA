import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok) {
        if (data.role !== 'Admin') {
          setError('Unauthorized: Admin access only');
          return;
        }

        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('isAdminAuthenticated', 'true');
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection failed. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06060A] flex items-center justify-center p-6 bg-[grid-white-5] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3">
             <ShieldCheck className="text-black w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-white italic" style={{ fontFamily: "'Playfair Display', serif" }}>SKCC Control Center</h1>
          <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest font-bold">Authorized Access Only</p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 ml-1">Admin Email</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                <input
                  type="email"
                  placeholder="admin@skcc.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white focus:outline-none focus:border-yellow-400/50 transition-colors"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 ml-1">Security Key</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white focus:outline-none focus:border-yellow-400/50 transition-colors"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-[10px] font-black text-center uppercase tracking-widest bg-red-500/10 py-3 rounded-xl border border-red-500/20">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-primary py-5 flex items-center justify-center space-x-3 text-base shadow-lg shadow-yellow-400/10 ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? (
                <>
                   <Loader2 className="w-5 h-5 animate-spin" />
                   <span>Verifying Identity...</span>
                </>
              ) : (
                <>
                   <span>Unlock Dashboard</span>
                   <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="mt-10 text-center">
          <button onClick={() => navigate('/')} className="text-gray-600 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
            ← Return to Public Site
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
