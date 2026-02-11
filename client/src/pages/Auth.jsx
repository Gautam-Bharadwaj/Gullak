import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Wallet, CheckCircle2, ShieldCheck, AlertTriangle, Smartphone, Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const Auth = () => {
    const [mode, setMode] = useState('login'); // 'login', 'signup', 'forgot', 'verify-2fa'
    const [formData, setFormData] = useState({ name: '', email: '', password: '', token: '' });
    const [tempUserId, setTempUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [emailOtpSent, setEmailOtpSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        const savedUser = localStorage.getItem('gullak_user');
        if (savedUser) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            let endpoint = '';
            let body = {};

            if (mode === 'login') {
                endpoint = '/api/auth/login';
                body = { email: formData.email, password: formData.password };
            } else if (mode === 'signup') {
                endpoint = '/api/auth/signup';
                body = formData;
            } else if (mode === 'forgot') {
                endpoint = '/api/forgot-password';
                body = { email: formData.email };
            } else if (mode === 'verify-2fa') {
                endpoint = '/api/auth/login/2fa';
                body = { userId: tempUserId, token: formData.token };
            }

            const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
            const fullUrl = `${baseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;

            const res = await fetch(fullUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Action failed');
            }

            if (mode === 'forgot') {
                setSuccess(data.message);
                setTimeout(() => setMode('login'), 3000);
            }
            else if (mode === 'login') {
                if (data.require2fa) {
                    setTempUserId(data.userId);
                    setMode('verify-2fa');
                    setSuccess('Please enter your 2FA code.');
                } else {
                    completeLogin(data.user);
                }
            }
            else if (mode === 'verify-2fa') {
                completeLogin(data.user);
            }
            else { // signup
                completeLogin(data.user);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendEmailOtp = async () => {
        if (!tempUserId) return;
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/auth/login/2fa/send-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: tempUserId })
            });

            if (res.ok) {
                setEmailOtpSent(true);
                setSuccess('OTP sent to your registered email.');
            } else {
                throw new Error('Failed to send email OTP');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const completeLogin = (user) => {
        localStorage.setItem('gullak_user', JSON.stringify(user));
        navigate('/calculate-expenses');
        setTimeout(() => window.location.reload(), 100);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 pt-28 text-white">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] -z-10"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[1000px] grid md:grid-cols-2 glass rounded-[3rem] overflow-hidden border-white/5 shadow-2xl shadow-primary/5"
            >
                {/* Left Side: Brand/Info */}
                <div className="hidden md:flex flex-col justify-between p-12 bg-primary/5 border-r border-white/5 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
                    <div className="relative z-10">
                        <Link to="/" className="flex flex-col leading-none mb-12">
                            <span className="text-[13px] font-bold text-primary tracking-widest -mb-1">मेरा</span>
                            <span className="text-3xl font-black tracking-tighter">
                                <span className="text-primary">GUL</span>
                                <span className="text-white">LAK</span>
                                <span className="text-sm text-primary lowercase self-end mb-1 ml-0.5 font-bold opacity-90">.com</span>
                            </span>
                        </Link>
                        <h2 className="text-4xl font-black leading-tight mb-6">
                            Start your journey to <span className="text-primary text-gradient">Financial Freedom.</span>
                        </h2>
                        <div className="space-y-4 text-gray-400">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-secondary" size={20} />
                                <span className="text-sm font-medium">Precision Expense Tracking</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-secondary" size={20} />
                                <span className="text-sm font-medium">Smart Debt Optimization</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="text-secondary" size={20} />
                                <span className="text-sm font-medium">Bank-level Data Security</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="p-8 md:p-16 flex flex-col justify-center bg-white/[0.01]">
                    <div className="mb-10">
                        <h1 className="text-3xl font-black mb-2">
                            {mode === 'login' ? 'Welcome Back' :
                                mode === 'signup' ? 'Create Account' :
                                    mode === 'verify-2fa' ? 'Two-Factor Auth' : 'Reset Password'}
                        </h1>
                        <p className="text-gray-500 text-sm">
                            {mode === 'login' && "Enter your credentials to access your vault."}
                            {mode === 'signup' && "Join 10,000+ Indians mastering their money."}
                            {mode === 'verify-2fa' && "Enter the 6-digit code from your authenticator app."}
                            {mode === 'forgot' && "We'll send you a link to get back into your account."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-4 bg-red-400/10 border border-red-400/20 rounded-2xl text-red-400 text-xs font-bold flex items-center gap-2">
                                <AlertTriangle size={16} />
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-2xl text-secondary text-xs font-bold flex items-center gap-2">
                                <CheckCircle2 size={16} />
                                {success}
                            </div>
                        )}

                        <AnimatePresence mode="wait">
                            {mode === 'signup' && (
                                <motion.div
                                    key="signup-fields"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-5"
                                >
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all text-sm font-medium"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                        <input
                                            type="email"
                                            required
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all text-sm font-medium"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-primary transition-all text-sm font-medium"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {mode === 'login' && (
                                <motion.div
                                    key="login-fields"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-5"
                                >
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                        <input
                                            type="email"
                                            required
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all text-sm font-medium"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-primary transition-all text-sm font-medium"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {mode === 'forgot' && (
                                <motion.div
                                    key="forgot-fields"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-5"
                                >
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                        <input
                                            type="email"
                                            required
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all text-sm font-medium"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {mode === 'verify-2fa' && (
                                <motion.div
                                    key="2fa-field"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="relative"
                                >
                                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                                    <input
                                        type="text"
                                        required
                                        maxLength="6"
                                        placeholder="000 000"
                                        value={formData.token}
                                        onChange={(e) => setFormData({ ...formData, token: e.target.value.replace(/\D/g, '') })}
                                        className="w-full bg-white/5 border border-primary/50 rounded-2xl py-4 pl-12 pr-4 text-white text-xl tracking-[0.5em] font-mono text-center focus:outline-none focus:border-primary transition-all"
                                    />
                                    <div className="text-center mt-4">
                                        <button type="button" onClick={handleSendEmailOtp} className="text-xs font-bold text-primary underline">
                                            {emailOtpSent ? 'Code Sent' : 'Send Code via Email'}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {mode === 'login' && (
                            <div className="text-right">
                                <Link to="/forgot-password" size="sm" className="text-xs font-bold text-gray-500 hover:text-primary transition-colors uppercase tracking-widest">
                                    Forgot Password?
                                </Link>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-black py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
                        >
                            {isLoading ? "Loading..." : (
                                <>
                                    {mode === 'login' ? 'Login to Vault' : mode === 'signup' ? 'Secure my Gullak' : mode === 'verify-2fa' ? 'Verify' : 'Send Reset Link'}
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        {mode === 'login' ? "First time here?" : "Back to"}
                        <button
                            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                            className="ml-2 text-primary font-bold"
                        >
                            {mode === 'login' ? 'Create Account' : 'Login'}
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;
