import React, { useState } from 'react';
import api from '../server/api';
import NavLogReg from '../context/NavLogReg';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  RotateCcw, 
  AtSign, 
  ChevronRight, 
  ArrowLeft, 
  Lock, 
  MailCheck,
  AlertCircle 
} from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await api.post('/user/forgot-password', { email });
      setIsSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <><NavLogReg />
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans relative overflow-hidden selection:bg-emerald-100 selection:text-emerald-900">
       
      <div className="fixed inset-0 opacity-[0.4] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <main className="relative z-10 flex flex-col items-center justify-center px-4 py-12 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-125 bg-white overflow-hidden border border-slate-100"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div 
                key="form-state"
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Card Top Decorative Area */}
                <div className="w-full h-40 bg-linear-to-b from-slate-50 to-white flex items-center justify-center relative overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-[0.05]" 
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #15803d 1px, transparent 0)', backgroundSize: '24px 24px' }}
                  ></div>
                  <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent"></div>
                  
                  <div className="relative z-10 w-20 h-20 flex items-center justify-center ">
                    <div className="absolute inset-0 bg-amber-500/5 blur-xl rounded-full"></div>
                    <RotateCcw className="text-[#b38f1f] w-10 h-10" />
                  </div>
                </div>

                <div className="p-8 md:p-12 pt-4">
                  <div className="text-center mb-10">
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <ShieldCheck className="text-[#b38f1f] w-5 h-5" />
                        <span className="text-xs font-bold tracking-widest uppercase text-slate-400">CareerGuideX</span>
                    </div>
                    <h1 className="text-slate-900 text-3xl font-extrabold tracking-tight mb-4">Forgot Password?</h1>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-70 mx-auto font-medium">
                      Enter your registered email address to receive a secure recovery link.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col gap-2">
                      <label className="flex flex-col">
                        <span className="text-[#b38f1f] text-[11px] uppercase tracking-widest font-bold mb-2 ml-1">
                          Email Address
                        </span>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <AtSign className="text-slate-300 group-focus-within:text-[#b38f1f] transition-colors w-5 h-5" />
                          </div>
                          <input 
                            type="email"
                            required
                            disabled={isLoading}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full pl-12 pr-4 py-4 rounded-xl text-slate-900 bg-slate-50 border-slate-200 focus:bg-white focus:border-[#b38f1f] focus:ring-4 focus:ring-amber-500/5 transition-all placeholder:text-slate-400 text-base font-medium outline-none disabled:opacity-50" 
                            placeholder="nature@domain.com"
                          />
                        </div>
                      </label>
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
                        className="w-full flex items-center justify-center rounded-xl h-14 px-6 bg-linear-to-r from-[#1A0B3B] to-indigo-900  hover:bg-[#166534] text-white text-base font-bold tracking-wide shadow-lg shadow-emerald-900/10 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <>
                            <span>Send Reset Link</span>
                            <ChevronRight className="ml-2 w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  <div className="mt-10 text-center">
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
                  <MailCheck className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Check your Email</h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
                  We've dispatched a recovery link to <br />
                  <span className="text-emerald-700 font-bold">{email}</span>. <br />
                  Please check your inbox to proceed.
                </p>
                <button 
                  onClick={() => window.location.href = '/login'}
                  className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-all active:scale-[0.98]"
                >
                  Return to Login
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 flex flex-col items-center gap-5 max-w-100 text-center">
          <div className="h-px w-12 bg-slate-200"></div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50 border border-slate-100">
            <Lock className="text-[#b38f1f] w-4 h-4" />
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

export default ForgotPassword;