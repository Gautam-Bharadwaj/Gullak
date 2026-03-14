import React, { useState, useEffect } from 'react';
import { Wallet, Menu, X, ChevronRight, LogOut, ShieldCheck, Copy, Check, Lock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import GlobalSearch from './GlobalSearch';
import { motion, AnimatePresence } from 'framer-motion';

// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [secret, setSecret] = useState('');
    const [token, setToken] = useState('');
    const [setupStep, setSetupStep] = useState(1); // 1: QR, 2: Success
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        const checkUser = () => {
            const savedUser = localStorage.getItem('gullak_user');
            if (savedUser) setUser(JSON.parse(savedUser));
        };

        window.addEventListener('scroll', handleScroll);
        checkUser();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('gullak_user');
        setUser(null);
        window.location.href = '/';
    };

    const start2FASetup = async () => {
        if (!user) return;
        setSetupStep(1);
        setToken('');
        setShow2FAModal(true);

        try {
            const res = await fetch(`${API_URL}/api/auth/2fa/setup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id })
            });
            const data = await res.json();
            if (data.qrCode) {
                setQrCodeUrl(data.qrCode);
                setSecret(data.secret);
            }
        } catch (err) {
            console.error("Failed to start 2FA setup", err);
            setShow2FAModal(false);
            alert("Connection Error: Could not reach the backend server.");
        }
    };

    const verify2FA = async () => {
        try {
            const res = await fetch(`${API_URL}/api/auth/2fa/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, token })
            });

            if (res.ok) {
                setSetupStep(2);
                const updatedUser = { ...user, twoFactorEnabled: true };
                localStorage.setItem('gullak_user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                setTimeout(() => setShow2FAModal(false), 3000);
            } else {
                alert("Invalid Code. Please try again.");
            }
        } catch (err) {
            alert("Verification failed.");
        }
    };

    const navItems = [
        { name: 'Home', path: '/' },
        {
            name: 'Financial Tools',
            dropdown: [
                { name: 'Calculate Expenses', path: '/calculate-expenses' },
                { name: 'EMI Optimization', path: '/#emi-optimization' },
                { name: 'Insights', path: '/insights' }
            ]
        },
        { name: 'Cards', path: '/cards' },
        { name: 'Dreams', path: '/dreams' },
    ];

    const isDreamsPage = location.pathname === '/dreams';

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isDreamsPage ? 'bg-black/90 backdrop-blur-2xl py-4 border-b border-white/5 shadow-2xl' : isScrolled ? 'glass py-4 shadow-lg' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="flex flex-col leading-none">
                            <span className={`text-[13px] font-bold tracking-widest -mb-1 ${isDreamsPage ? 'text-orange-500' : 'text-primary'}`}>मेरा</span>
                            <span className="text-2xl font-bold tracking-tighter flex items-center">
                                <span className={isDreamsPage ? 'text-orange-500' : 'text-primary'}>GUL</span>
                                <span className="text-white">LAK</span>
                                <span className={`text-sm lowercase self-end mb-0.5 ml-0.5 font-bold opacity-90 ${isDreamsPage ? 'text-orange-400' : 'text-primary'}`}>.com</span>
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            <div className="flex items-center gap-8 mr-4 border-r border-white/10 pr-8">
                                {navItems.map((item) => (
                                    item.dropdown ? (
                                        <div key={item.name} className="relative group py-2">
                                            <span className={`text-sm font-medium cursor-pointer transition-colors duration-200 ${isDreamsPage ? 'text-gray-400 hover:text-white' : 'text-gray-300 hover:text-primary'} flex items-center gap-1`}>
                                                {item.name} <ChevronRight size={14} className="group-hover:rotate-90 transition-transform" />
                                            </span>
                                            <div className="absolute top-full left-0 mt-0 w-56 rounded-xl bg-[#0a0a0a] border border-white/10 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col py-2 translate-y-2 group-hover:translate-y-0 z-50">
                                                {item.dropdown.map(subItem => (
                                                    subItem.path.startsWith('/#') ? (
                                                        <a
                                                            key={subItem.name}
                                                            href={subItem.path}
                                                            className={`block px-5 py-2.5 text-sm transition-colors duration-200 ${isDreamsPage ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-300 hover:text-primary hover:bg-white/5'}`}
                                                        >
                                                            {subItem.name}
                                                        </a>
                                                    ) : (
                                                        <Link
                                                            key={subItem.name}
                                                            to={subItem.path}
                                                            className={`block px-5 py-2.5 text-sm transition-colors duration-200 ${location.pathname === subItem.path ? (isDreamsPage ? 'text-orange-500 bg-white/5' : 'text-primary bg-white/5') : (isDreamsPage ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-300 hover:text-primary hover:bg-white/5')}`}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    ) : item.path.startsWith('/#') ? (
                                        <a
                                            key={item.name}
                                            href={item.path}
                                            className={`text-sm font-medium transition-colors duration-200 ${isDreamsPage ? 'text-gray-400 hover:text-white' : 'text-gray-300 hover:text-primary'}`}
                                        >
                                            {item.name}
                                        </a>
                                    ) : (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            className={`text-sm font-medium transition-colors duration-200 ${location.pathname === item.path ? (isDreamsPage ? 'text-orange-500' : 'text-primary') : (isDreamsPage ? 'text-gray-400 hover:text-white' : 'text-gray-300 hover:text-primary')}`}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                ))}
                            </div>

                            <div className="flex items-center gap-4">
                                <GlobalSearch />
                                {user ? (
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className={`text-[10px] font-black uppercase tracking-widest leading-none mb-1 ${isDreamsPage ? 'text-orange-400' : 'text-primary'}`}>Authenticated</div>
                                            <div className="text-sm font-bold text-white leading-none">{user.name}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={start2FASetup}
                                                className={`p-2 rounded-full transition-all ${user.twoFactorEnabled ? 'bg-green-500/10 text-green-500' : `bg-white/5 hover:bg-white/10 ${isDreamsPage ? 'text-gray-400 hover:text-orange-500' : 'text-gray-400 hover:text-primary'}`}`}
                                            >
                                                <ShieldCheck size={20} />
                                            </button>
                                            <button
                                                onClick={handleLogout}
                                                className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-red-400 transition-all"
                                            >
                                                <LogOut size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <Link to="/auth" className={`${isDreamsPage ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-primary hover:bg-primary-dark text-background'} px-6 py-2.5 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg`}>
                                        Login
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center gap-2 md:hidden">
                            <GlobalSearch />
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
                                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden glass absolute top-full left-0 right-0 border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="px-4 py-6 space-y-4 bg-background/95 backdrop-blur-xl text-center">
                            {navItems.map((item) => (
                                item.dropdown ? (
                                    <div key={item.name} className="space-y-2">
                                        <div className="text-sm font-bold uppercase tracking-widest text-gray-500 py-2">{item.name}</div>
                                        <div className="flex flex-col gap-2 bg-white/5 rounded-2xl p-4">
                                            {item.dropdown.map(subItem => (
                                                subItem.path.startsWith('/#') ? (
                                                    <a
                                                        key={subItem.name}
                                                        href={subItem.path}
                                                        className="block text-base font-medium py-2 text-gray-300"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {subItem.name}
                                                    </a>
                                                ) : (
                                                    <Link
                                                        key={subItem.name}
                                                        to={subItem.path}
                                                        className={`block text-base font-medium py-2 ${location.pathname === subItem.path ? (isDreamsPage ? 'text-orange-500' : 'text-primary') : 'text-gray-300'}`}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={`block text-lg font-medium py-2 ${location.pathname === item.path ? (isDreamsPage ? 'text-orange-500' : 'text-primary') : 'text-gray-300'}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            ))}
                            {!user && (
                                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className={`w-full ${isDreamsPage ? 'bg-orange-500 text-white' : 'bg-primary text-background'} py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-4`}>
                                    Get Started <ChevronRight size={20} />
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* 2FA Setup Modal */}
            <AnimatePresence>
                {show2FAModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-[#121212] border border-white/10 rounded-3xl p-8 max-w-sm w-full relative shadow-2xl"
                        >
                            <button onClick={() => setShow2FAModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20} /></button>
                            <div className="text-center mb-6">
                                <div className={`w-12 h-12 ${isDreamsPage ? 'bg-white/10 text-white' : 'bg-primary/10 text-primary'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                    <ShieldCheck size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Setup 2FA</h3>
                            </div>
                            {setupStep === 1 ? (
                                <div className="space-y-6">
                                    <div className="bg-white p-4 rounded-xl mx-auto w-48 h-48 flex items-center justify-center">
                                        <img src={qrCodeUrl} alt="QR" className="w-full h-full" />
                                    </div>
                                    <input
                                        type="text" placeholder="6-digit code" maxLength="6" value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                        className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center text-white font-mono tracking-widest focus:outline-none ${isDreamsPage ? 'focus:border-orange-500' : 'focus:border-primary'}`}
                                    />
                                    <button onClick={verify2FA} className={`w-full ${isDreamsPage ? 'bg-white text-black hover:bg-orange-500 hover:text-white' : 'bg-primary text-background hover:bg-primary-dark'} font-bold py-3 rounded-xl transition-all`}>Verify</button>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500"><Check size={40} /></div>
                                    <h4 className="text-2xl font-black text-white">Success!</h4>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
