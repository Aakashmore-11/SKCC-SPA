import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ allowedRoles }) => {
  const [status, setStatus] = useState('loading'); // 'loading' | 'authorized' | 'unauthorized'

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');

      // No token at all — instantly reject
      if (!token) {
        setStatus('unauthorized');
        return;
      }

      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/auth/verify`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) {
          // Token is invalid or expired — clear everything
          localStorage.removeItem('token');
          localStorage.removeItem('userRole');
          localStorage.removeItem('isAdminAuthenticated');
          setStatus('unauthorized');
          return;
        }

        const data = await res.json();

        // Check role access
        if (allowedRoles && !allowedRoles.includes(data.role)) {
          setStatus('unauthorized');
          return;
        }

        setStatus('authorized');
      } catch {
        // Server unreachable — deny access
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('isAdminAuthenticated');
        setStatus('unauthorized');
      }
    };

    verifyToken();
  }, [allowedRoles]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#06060A] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
          <p className="text-xs font-black uppercase tracking-widest text-gray-500">Verifying Access...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthorized') {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
