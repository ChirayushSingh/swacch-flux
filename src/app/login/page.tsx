'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/authService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await AuthService.login({ email, password });
      router.push('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-10"
      >
        <div className="p-8 border-b border-border bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
            <Activity className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your municipal command center</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="p-3 bg-rose-100 border border-rose-200 text-rose-700 text-sm rounded-lg animate-shake">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bmc.gov.in"
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold">Password</label>
              <button type="button" className="text-xs text-primary hover:underline">Forgot password?</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Are you a citizen reporting an issue? <br />
              <button type="button" onClick={() => router.push('/citizen')} className="text-primary font-bold hover:underline mt-1">Use Citizen Portal</button>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
