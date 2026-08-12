import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

export const AuthLogin: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(username, password);
      window.location.href = '/admin';
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#050505] font-sans flex flex-col">
      <div className="bg-[#1B1B1B] text-white px-4 py-2 text-xs font-mono flex items-center gap-3">
        <ShieldAlert className="w-4 h-4 text-amber-400" />
        <span>GRIZOLABS INTERNAL CONTROL</span>
        <span className="text-neutral-400">| Restricted Area</span>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="bg-white border border-[#E9E9E7] rounded-sm p-8 shadow-2xs space-y-6">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-black text-white rounded-sm flex items-center justify-center font-mono font-bold text-xl mx-auto">
                GZ
              </div>
              <h1 className="text-xl font-extrabold tracking-tight mt-3">Admin Sign In</h1>
              <p className="text-xs text-neutral-500 font-sans">
                Hanya untuk tim internal Grizolabs.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-mono font-bold px-3 py-2 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-neutral-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="w-full p-2.5 bg-white border border-[#E9E9E7] rounded text-xs font-sans focus:ring-1 focus:ring-black focus:outline-none"
                  placeholder="admin@grizolabs.app"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-neutral-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full p-2.5 bg-white border border-[#E9E9E7] rounded text-xs font-sans focus:ring-1 focus:ring-black focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-black hover:bg-neutral-800 text-white text-xs font-mono font-bold px-4 py-2.5 rounded-sm cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? 'SIGNING IN...' : 'MASUK KE DASHBOARD'}
              </button>
            </form>
          </div>

          <p className="text-center text-[11px] font-mono text-neutral-400 mt-6">
            <a href="/" className="hover:text-black underline">← Kembali ke Landing Page</a>
          </p>
        </div>
      </div>
    </div>
  );
};