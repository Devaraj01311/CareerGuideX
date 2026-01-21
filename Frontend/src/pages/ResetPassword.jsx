import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../server/api';
import NavLogReg from '../context/NavLogReg';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  RotateCcw, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  ShieldAlert
} from 'lucide-react';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    let score = 0;
    if (!password) score = 0;
    else {
      if (password.length > 7) score += 25;
      if (/[A-Z]/.test(password)) score += 25;
      if (/[0-9]/.test(password)) score += 25;
      if (/[^A-Za-z0-9]/.test(password)) score += 25;
    }
    setStrength(score);
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    if (strength < 50) {
      return setError('Please create a stronger password');
    }

    setIsLoading(true);
    setError('');

    try {
      await api.post(`/user/reset-password/${token}`, { password });
      setIsSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || "Invalid or expired token. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavLogReg />
      <div className="min-h-screen bg-gray-50 text-slate-900 font-sans relative overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
        
        <div className="fixed inset-0 opacity-[0.4] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <main className="relative z-10 flex flex-col items-center justify-center px-4 py-12 md:py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-125 bg-white overflow-hidden border border-slate-100 "
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div 
                  key="form-state"
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                

                  <div className="p-8 md:p-12 pt-4">
                    <div className="text-center mb-10">
                      <div className="flex justify-center items-center gap-2 mb-4">
                        <ShieldCheck className="text-[#b38f1f] w-5 h-5" />
                        <span className="text-xs font-bold tracking-widest uppercase text-slate-400">CareerGuideX</span>
                      </div>
                      <h1 className="text-slate-900 text-3xl font-extrabold tracking-tight mb-4">Reset Password</h1>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-70 mx-auto font-medium">
                        Create a new secure password for your account.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                   
                      <div className="flex flex-col gap-2">
                        <label className="text-[#b38f1f] text-[11px] uppercase tracking-widest font-bold ml-1">
                          New Password
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="text-slate-300 group-focus-within:text-[#b38f1f] transition-colors w-5 h-5" />
                          </div>
                          <input 
                            type={showPass ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full pl-12 pr-12 py-4 rounded-xl text-slate-900 bg-slate-50 border-slate-200 focus:bg-white focus:border-[#b38f1f] focus:ring-4 focus:ring-amber-500/5 transition-all placeholder:text-slate-400 text-base font-medium outline-none" 
                            placeholder="••••••••"
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#b38f1f]"
                          >
                            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">Security Strength</span>
                          <span className={`text-[10px] font-bold ${strength > 50 ? 'text-emerald-500' : 'text-amber-500'}`}>{strength}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${strength}%` }}
                            className={`h-full transition-colors duration-500 ${strength > 75 ? 'bg-emerald-500' : strength > 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[#b38f1f] text-[11px] uppercase tracking-widest font-bold ml-1">
                          Confirm Password
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <ShieldCheck className="text-slate-300 group-focus-within:text-[#b38f1f] transition-colors w-5 h-5" />
                          </div>
                          <input 
                            type={showConfirmPass ? "text" : "password"}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="block w-full pl-12 pr-12 py-4 rounded-xl text-slate-900 bg-slate-50 border-slate-200 focus:bg-white focus:border-[#b38f1f] focus:ring-4 focus:ring-amber-500/5 transition-all placeholder:text-slate-400 text-base font-medium outline-none" 
                            placeholder="••••••••"
                          />
                          <button 
                            type="button"
                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#b38f1f]"
                          >
                            {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      {error && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }} 
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 p-3 rounded-lg text-sm font-medium"
                        >
                          <AlertCircle size={16} /> {error}
                        </motion.div>
                      )}

                      <div className="pt-2">
                        <button 
                          type="submit"
                          disabled={isLoading}
                          className="w-full flex items-center justify-center rounded-xl h-14 px-6 bg-linear-to-r from-[#1A0B3B] to-indigo-900 hover:brightness-110 text-white text-base font-bold tracking-wide shadow-lg shadow-indigo-900/20 transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                          {isLoading ? (
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>Updating...</span>
                            </div>
                          ) : "Update Password"}
                        </button>
                      </div>
                    </form>

                    <div className="mt-8 text-center">
                      <a href="/login" className="inline-flex items-center text-slate-400 hover:text-[#b38f1f] text-sm font-bold transition-colors gap-2 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Login
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="success-state"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-10 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-100">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Password Updated</h3>
                  <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
                    Your password has been successfully reset. You can now use your new credentials to log in.
                  </p>
                  <button 
                    onClick={() => navigate('/login')}
                    className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-all active:scale-[0.98]"
                  >
                    Go to Login
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <div className="mt-12 flex flex-col items-center gap-5 max-w-100 text-center">
            <div className="h-px w-12 bg-slate-200"></div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50 border border-slate-100">
              <ShieldAlert className="text-[#b38f1f] w-4 h-4" />
              <p className="text-[11px] text-slate-400 font-bold tracking-wide uppercase">
                Secure Encryption Enabled
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ResetPassword;