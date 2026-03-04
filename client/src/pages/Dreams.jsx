import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
    Cloud,
    Plus,
    Target,
    TrendingUp,
    IndianRupee,
    Calendar,
    ChevronRight,
    Trash2,
    CheckCircle2,
    Star,
    Plane,
    Home,
    Car,
    Laptop,
    Shield,
    Heart,
    Sparkles,
    Lightbulb,
    Briefcase,
    Coins,
    Moon,
    Wind,
    Navigation
} from 'lucide-react';

const categoryIcons = {
    Travel: Plane,
    Home: Home,
    Automobile: Car,
    Gadgets: Laptop,
    Security: Shield,
    Health: Heart,
    Other: Star
};

// --- Custom Hooks ---
const useMousePosition = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);
    return { mouseX, mouseY };
};

const MagneticCursor = ({ mouseX, mouseY }) => {
    const cursorX = useSpring(mouseX, { stiffness: 500, damping: 28 });
    const cursorY = useSpring(mouseY, { stiffness: 500, damping: 28 });

    return (
        <motion.div
            style={{
                translateX: cursorX,
                translateY: cursorY,
            }}
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-purple-500/50 pointer-events-none z-[999] flex items-center justify-center mix-blend-screen"
        >
            <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_15px_2px_#a855f7]" />
            <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full"
            />
        </motion.div>
    );
};

// --- Surreal UI Sub-components ---

const FloatingIsland = ({ delay, top, left, scale, opacity, mouseX, mouseY, pFactor = 0.05 }) => (
    <motion.div
        style={{
            top, left, scale, opacity,
            x: useTransform(mouseX, (x) => (x - window.innerWidth / 2) * pFactor),
            y: useTransform(mouseY, (y) => (y - window.innerHeight / 2) * pFactor),
        }}
        animate={{
            y: [0, -30, 0],
            rotate: [0, 2, -2, 0]
        }}
        transition={{
            duration: 12,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
        }}
        className="absolute pointer-events-none z-0"
    >
        <div className="w-64 h-24 bg-gradient-to-b from-purple-500/10 to-transparent blur-3xl rounded-[100%] absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-40"></div>
        <div className="relative group">
            <div className="w-56 h-8 bg-gradient-to-r from-cyan-500/10 via-purple-500/20 to-indigo-500/10 backdrop-blur-3xl rounded-full border border-white/5 shadow-[0_0_50px_rgba(168,85,247,0.1)]"></div>
            <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 opacity-20">
                <Cloud size={100} className="text-white/20 blur-xl" />
            </div>
        </div>
    </motion.div>
);

const ShootingStar = () => (
    <motion.div
        initial={{ x: "-100%", y: "0%", opacity: 0 }}
        animate={{
            x: ["0%", "200%"],
            y: ["0%", "100%"],
            opacity: [0, 1, 0]
        }}
        transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            repeatDelay: Math.random() * 10 + 5,
            ease: "linear"
        }}
        className="absolute w-[150px] h-[1px] bg-gradient-to-r from-transparent via-white to-transparent rotate-[35deg] pointer-events-none"
        style={{
            top: `${Math.random() * 50}%`,
            left: `${Math.random() * 100}%`
        }}
    />
);

const CrystalShard = ({ delay, top, left, scale, mouseX, mouseY, pFactor = 0.08 }) => (
    <motion.div
        style={{
            top, left,
            x: useTransform(mouseX, (x) => (x - window.innerWidth / 2) * pFactor),
            y: useTransform(mouseY, (y) => (y - window.innerHeight / 2) * pFactor),
        }}
        animate={{
            y: [0, -50, 0],
            rotate: [45, 60, 45],
            scale: [scale, scale * 1.1, scale]
        }}
        transition={{
            duration: 8,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
        }}
        className="absolute pointer-events-none z-0 opacity-20"
    >
        <div className="w-6 h-20 bg-gradient-to-t from-cyan-400 via-purple-500 to-transparent clip-path-polygon-[50%_0%,100%_100%,0%_100%] blur-[1px] shadow-[0_0_40px_rgba(168,85,247,0.4)]"></div>
    </motion.div>
);

const DreamPortal = ({ onComplete }) => {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 2000), // Desires appearing
            setTimeout(() => setPhase(2), 4500), // Epiphany
            setTimeout(() => setPhase(3), 6500), // The realization
            setTimeout(onComplete, 9000)         // Launch to Lunar Base
        ];

        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    const phases = [
        {
            text: "Searching...",
            sub: "In the quiet space between dreams and reality",
            color: "text-blue-400",
            thought: "I wonder if I could ever reach it...",
            glow: "shadow-[0_0_100px_rgba(59,130,246,0.2)]"
        },
        {
            text: "Visualizing...",
            sub: "Naming the things that set my soul on fire",
            color: "text-purple-400",
            thought: "The sanctuary, the adventure, the legacy...",
            glow: "shadow-[0_0_100px_rgba(168,85,247,0.3)]"
        },
        {
            text: "Wait.",
            sub: "This isn't just a wish anymore.",
            color: "text-white",
            thought: "Wait... This is actually within reach!",
            glow: "shadow-[0_0_150px_rgba(255,255,255,0.4)]"
        },
        {
            text: "Build Reality.",
            sub: <span>Igniting the <span className="text-orange-500">GUL</span>LAK Engine. Trajectory set to Success.</span>,
            color: "text-emerald-400",
            thought: "Manifestation Mode: ACTIVATED.",
            glow: "shadow-[0_0_200px_rgba(52,211,153,0.5)]"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                filter: 'blur(100px) brightness(3)',
                scale: 1.5,
                transition: { duration: 1.5, ease: "circIn" }
            }}
            className="fixed inset-0 z-[250] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Dynamic Background Nebula */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 45, -45, 0],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15)_0%,transparent_60%)]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -90, 0],
                        opacity: [0.05, 0.15, 0.05]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-20%] right-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_60%)]"
                />
            </div>

            {/* Floating Dust Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        opacity: 0
                    }}
                    animate={{
                        y: [null, Math.random() * -100],
                        opacity: [0, 0.3, 0],
                        scale: [0, 1, 0]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
                />
            ))}

            {/* The Ethereal Core */}
            <motion.div
                animate={{
                    y: [0, -15, 0],
                    scale: phase === 3 ? [1, 1.2, 1] : 1
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-50 mb-16"
            >
                {/* Core Sphere */}
                <motion.div
                    animate={{
                        boxShadow: [
                            "0 0 40px rgba(168,85,247,0.1)",
                            "0 0 100px rgba(168,85,247,0.3)",
                            "0 0 40px rgba(168,85,247,0.1)"
                        ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className={`w-36 h-36 rounded-full bg-slate-900/40 backdrop-blur-3xl border border-white/10 flex items-center justify-center ${phases[phase].glow} transition-all duration-1000`}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={phase}
                            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 1.5, rotate: 45 }}
                            transition={{ duration: 0.8 }}
                        >
                            {phase === 0 && <Moon size={48} className="text-blue-400" strokeWidth={1} />}
                            {phase === 1 && <Sparkles size={48} className="text-purple-400" strokeWidth={1} />}
                            {phase === 2 && <Wind size={48} className="text-white" strokeWidth={1} />}
                            {phase === 3 && <Target size={48} className="text-emerald-400" strokeWidth={1} />}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Orbiting Rings */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border border-white/5"
                        style={{ scale: 1.2 + i * 0.3, opacity: 0.3 - i * 0.1 }}
                    />
                ))}

                {/* Thought Icons appearing around */}
                <AnimatePresence>
                    {phase >= 1 && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                animate={{ opacity: 1, scale: 1, x: 120, y: -80 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="absolute p-4 rounded-full bg-purple-500/10 backdrop-blur-md border border-purple-500/20 shadow-lg shadow-purple-500/10"
                            >
                                <Home size={28} className="text-purple-300" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                animate={{ opacity: 1, scale: 1, x: -140, y: -40 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="absolute p-4 rounded-full bg-cyan-500/10 backdrop-blur-md border border-cyan-500/20 shadow-lg shadow-cyan-500/10"
                            >
                                <Plane size={28} className="text-cyan-300" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                animate={{ opacity: 1, scale: 1, x: 40, y: -160 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="absolute p-4 rounded-full bg-indigo-500/10 backdrop-blur-md border border-indigo-500/20 shadow-lg shadow-indigo-500/10"
                            >
                                <Car size={28} className="text-indigo-300" />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Content Display */}
            <div className="text-center space-y-4 px-6">
                <motion.div
                    key={`thought-${phase}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    className="h-6"
                >
                    <p className="italic text-slate-400 font-medium tracking-wide">
                        "{phases[phase].thought}"
                    </p>
                </motion.div>

                <motion.div
                    key={phase}
                    initial={{ opacity: 0, scale: 0.9, letterSpacing: "0.5em" }}
                    animate={{ opacity: 1, scale: 1, letterSpacing: "0.1em" }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <h1 className={`text-6xl md:text-8xl font-black ${phases[phase].color} tracking-tighter mb-4 uppercase`}>
                        {phases[phase].text}
                    </h1>
                    <p className="text-slate-500 font-bold tracking-[0.4em] uppercase text-xs md:text-sm">
                        {phases[phase].sub}
                    </p>
                </motion.div>
            </div>

            {/* Hyper-speed Effect (Phase 3) */}
            <AnimatePresence>
                {phase === 3 && (
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        {[...Array(40)].map((_, i) => (
                            <motion.div
                                key={`warp-${i}`}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: [0, 15, 0],
                                    opacity: [0, 0.7, 0],
                                    x: (Math.random() - 0.5) * 1500,
                                    y: (Math.random() - 0.5) * 1500
                                }}
                                transition={{ duration: 1, repeat: Infinity, delay: Math.random() }}
                                className="absolute w-[2px] h-[100px] bg-gradient-to-t from-transparent via-cyan-400 to-transparent blur-[1px]"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    rotate: `${Math.atan2((Math.random() - 0.5) * 1500, (Math.random() - 0.5) * 1500) * (180 / Math.PI)}deg`
                                }}
                            />
                        ))}
                    </div>
                )}
            </AnimatePresence>

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#020617_100%)] pointer-events-none z-40"></div>
        </motion.div>
    );
};

const DreamCard = ({ dream, index, totalSaved, totalNeeded, calculateProgress, categoryIcons, deleteDream, setSelectedDreamForStrategy }) => {
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 3D Tilt Values
    const rotX = useTransform(mouseY, [0, 400], [5, -5]);
    const rotY = useTransform(mouseX, [0, 400], [-5, 5]);

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
        mouseX.set(200); // Reset to center
        mouseY.set(200);
    };

    const Icon = categoryIcons[dream.category] || Star;
    const progress = calculateProgress(dream.saved, dream.target);

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{
                perspective: 1000,
                rotateX: rotX,
                rotateY: rotY,
            }}
            whileHover={{ y: -15, scale: 1.02 }}
            transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 20 }}
            className="relative group h-full cursor-none"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

            {/* Holographic Rim */}
            <div className="absolute inset-[-1px] rounded-[4rem] bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-50 z-0" />

            <div className="glass p-12 rounded-[4rem] border-white/5 bg-slate-900/40 backdrop-blur-3xl relative z-10 h-full flex flex-col justify-between shadow-2xl border-t-white/10 group-hover:border-white/20 transition-all overflow-hidden border-r-white/5 border-l-white/5">
                {/* Individual Mouse Glow */}
                <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background: useTransform(
                            [mouseX, mouseY],
                            ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, rgba(168,85,247,0.15), transparent 80%)`
                        )
                    }}
                />

                <div>
                    <div className="flex justify-between items-start mb-10">
                        <div className="w-20 h-20 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center text-white group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-500 border border-white/5">
                            <Icon size={36} strokeWidth={1.5} />
                        </div>
                        <button onClick={() => deleteDream(dream.id)} className="p-3 text-white/20 hover:text-red-400 transition-all hover:bg-white/5 rounded-full relative z-20">
                            <Trash2 size={24} />
                        </button>
                    </div>

                    <div className="mb-10">
                        <div className="text-[10px] font-black text-purple-400/80 uppercase tracking-[0.3em] mb-3">{dream.category}</div>
                        <h3 className="text-4xl font-bold tracking-tighter leading-[1.1] text-white group-hover:text-purple-300 transition-colors">{dream.title}</h3>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="flex justify-between items-end px-1">
                        <div className="text-3xl font-black text-white italic tracking-tighter">₹{dream.target.toLocaleString()}</div>
                        <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">{progress}% Solidified</div>
                    </div>

                    <div className="h-4 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 2, ease: "circOut" }}
                            className={`h-full rounded-full bg-gradient-to-r from-purple-600 via-cyan-400 to-white shadow-[0_0_30px_rgba(168,85,247,0.5)] relative`}
                        >
                            {progress > 5 && (
                                <motion.div
                                    animate={{ x: ["-100%", "200%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                />
                            )}
                        </motion.div>
                    </div>

                    <button
                        onClick={() => setSelectedDreamForStrategy(dream)}
                        className="w-full py-5 bg-white/5 hover:bg-white text-white hover:text-black rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-500 border border-white/5 relative z-20"
                    >
                        <Sparkles size={16} />
                        Explore Blueprint
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// --- Main Dreams Component ---

const Dreams = () => {
    const [isEntering, setIsEntering] = useState(true);
    const [dreams, setDreams] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newDream, setNewDream] = useState({
        title: '', target: '', saved: '', category: 'Other', deadline: ''
    });
    const [selectedDreamForStrategy, setSelectedDreamForStrategy] = useState(null);
    const [userIncome, setUserIncome] = useState(0);

    const containerRef = useRef(null);
    const { mouseX, mouseY } = useMousePosition();

    // Smooth versions for parallax
    const mouseXSpring = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const mouseYSpring = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    useEffect(() => {
        const savedIncome = localStorage.getItem('gullak_income');
        if (savedIncome) setUserIncome(Number(savedIncome));

        const savedDreams = localStorage.getItem('gullak_dreams');
        if (savedDreams) {
            setDreams(JSON.parse(savedDreams));
        } else {
            const initialDreams = [
                { id: 1, title: "Sky Villa Residency", target: 8500000, saved: 2500000, category: "Home", deadline: "2026-12-31" },
                { id: 2, title: "Global Explorer Pass", target: 1200000, saved: 400000, category: "Travel", deadline: "2025-08-20" },
                { id: 3, title: "Next-Gen Tech Setup", target: 500000, saved: 1500000, category: "Gadgets", deadline: "2024-11-15" },
            ];
            setDreams(initialDreams);
            localStorage.setItem('gullak_dreams', JSON.stringify(initialDreams));
        }
    }, []);

    const saveToLocal = (updatedDreams) => {
        setDreams(updatedDreams);
        localStorage.setItem('gullak_dreams', JSON.stringify(updatedDreams));
    };

    const addDream = () => {
        if (!newDream.title || !newDream.target) return;
        const dream = {
            ...newDream,
            id: Date.now(),
            target: Number(newDream.target),
            saved: Number(newDream.saved) || 0
        };
        saveToLocal([...dreams, dream]);
        setNewDream({ title: '', target: '', saved: '', category: 'Other', deadline: '' });
        setShowAddModal(false);
    };

    const deleteDream = (id) => {
        saveToLocal(dreams.filter(d => d.id !== id));
    };

    const calculateProgress = (saved, target) => {
        return Math.min(Math.round((saved / target) * 100), 100);
    };

    const getStrategy = (dream) => {
        const remaining = dream.target - dream.saved;
        const today = new Date();
        const deadline = new Date(dream.deadline);
        const diffTime = Math.abs(deadline - today);
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30)) || 1;

        const monthlyNeeded = Math.round(remaining / diffMonths);

        // --- Reality Check Logic ---
        let difficulty = "Moderate";
        let difficultyColor = "text-orange-400";
        if (userIncome > 0) {
            const ratio = monthlyNeeded / userIncome;
            if (ratio < 0.1) {
                difficulty = "Easy Reach";
                difficultyColor = "text-emerald-400";
            } else if (ratio > 0.4) {
                difficulty = "Ambitious";
                difficultyColor = "text-red-400";
            }
        }

        let advice = [];
        if (remaining <= 0) {
            advice.push({ icon: CheckCircle2, title: "Goal Achieved", desc: "Your dream has materialized. Time to celebrate!", color: "text-green-400" });
        } else {
            advice.push({
                icon: Target,
                title: "Mathematical Path",
                desc: `Save ₹${monthlyNeeded.toLocaleString()}/month to hit your target by ${deadline.toLocaleDateString()}.`,
                color: "text-purple-400"
            });

            // Speed Up Engine
            advice.push({
                icon: Briefcase,
                title: "Launch Side Quest",
                desc: "Boost income via React/UI-UX freelancing to reach this goal 3 months faster.",
                color: "text-blue-400"
            });

            advice.push({
                icon: Coins,
                title: "Asset Liquidation",
                desc: "Have old gadgets? Sell on OLX to inject ₹15,000 immediately into this dream.",
                color: "text-orange-400"
            });

            advice.push({
                icon: Wind,
                title: "Shield Your Wealth",
                desc: "Cut 15% of impulse spends (Zomato/OTT) to save extra ₹2,000/month.",
                color: "text-cyan-400"
            });
        }
        return { monthlyNeeded, advice, diffMonths, difficulty, difficultyColor };
    };

    const totalNeeded = dreams.reduce((acc, curr) => acc + curr.target, 0);
    const totalSaved = dreams.reduce((acc, curr) => acc + curr.saved, 0);
    const overallProgress = calculateProgress(totalSaved, totalNeeded);

    return (
        <div
            className="cursor-none"
        >
            <MagneticCursor mouseX={mouseX} mouseY={mouseY} />

            <AnimatePresence>
                {isEntering && <DreamPortal onComplete={() => setIsEntering(false)} />}
            </AnimatePresence>

            <div
                ref={containerRef}
                className="relative pt-28 pb-16 min-h-screen bg-[#020617] overflow-hidden selection:bg-purple-500/30 selection:text-white"
            >
                {/* Celestial Parallax Background */}
                <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none">
                    {/* Galactic Sunset Glow */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(168,85,247,0.3),transparent_70%)]"></div>
                    <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_120%,rgba(6,182,212,0.15),transparent_50%)]"></div>

                    {/* Nebula Atmosphere */}
                    <motion.div
                        animate={{
                            opacity: [0.05, 0.1, 0.05],
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"
                    />

                    {/* Shooting Stars */}
                    <ShootingStar />
                    <ShootingStar />
                    <ShootingStar />

                    {/* Parallax Elements */}
                    <FloatingIsland mouseX={mouseXSpring} mouseY={mouseYSpring} pFactor={0.02} delay={0} top="15%" left="5%" scale={1.2} opacity={0.6} />
                    <FloatingIsland mouseX={mouseXSpring} mouseY={mouseYSpring} pFactor={0.04} delay={5} top="65%" left="75%" scale={0.8} opacity={0.4} />
                    <FloatingIsland mouseX={mouseXSpring} mouseY={mouseYSpring} pFactor={0.03} delay={2} top="40%" left="40%" scale={0.5} opacity={0.3} />

                    <CrystalShard mouseX={mouseXSpring} mouseY={mouseYSpring} pFactor={0.06} delay={1} top="25%" left="80%" scale={1} />
                    <CrystalShard mouseX={mouseXSpring} mouseY={mouseYSpring} pFactor={0.08} delay={4} top="75%" left="10%" scale={0.8} />

                    {/* Distant Sun */}
                    <motion.div
                        animate={{ opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 blur-[200px] rounded-full"
                    />

                    {/* Starfield */}
                    {[...Array(120)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ opacity: [0.1, 0.9, 0.1], scale: [1, 1.5, 1] }}
                            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
                            className="absolute w-[1px] h-[1px] bg-white rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`
                            }}
                        />
                    ))}
                </motion.div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    {/* Celestial Header */}
                    <div className="flex flex-col items-center text-center mb-36 relative mt-12">
                        {/* Magnet Floating Icon */}
                        <motion.div
                            style={{
                                x: useTransform(mouseXSpring, (x) => (x - window.innerWidth / 2) * 0.05),
                                y: useTransform(mouseYSpring, (y) => (y - window.innerHeight / 2) * 0.05),
                            }}
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", damping: 12, delay: 0.2 }}
                            className="w-32 h-32 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-[3rem] flex items-center justify-center text-white mb-12 backdrop-blur-3xl border border-white/10 shadow-[0_0_80px_rgba(168,85,247,0.4)] relative group overflow-hidden"
                        >
                            <Sparkles size={48} strokeWidth={1} className="animate-pulse relative z-10" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                        </motion.div>

                        <div className="overflow-hidden mb-10 pb-4">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                                className="text-8xl lg:text-[11.5rem] font-black tracking-[-0.04em] leading-[0.8] text-white"
                            >
                                Dream <br />
                                <div className="flex justify-center flex-wrap gap-x-2">
                                    {"Kingdom.".split("").map((char, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)", y: 50 }}
                                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
                                            transition={{ duration: 1, delay: 0.8 + i * 0.08, ease: "easeOut" }}
                                            className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_0_80px_rgba(168,85,247,0.4)] hover:text-purple-400 transition-colors duration-500 cursor-default uppercase"
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.h1>
                        </div>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-slate-400 text-2xl max-w-3xl leading-relaxed font-light tracking-tight mb-16"
                        >
                            Where your <span className="text-white font-bold italic">Deepest Thoughts</span> transform into <br />
                            solid foundations within the <span className="text-purple-400 border-b border-purple-800/50">Celestial Realm.</span>
                        </motion.p>

                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 100px rgba(168,85,247,0.5)", letterSpacing: "0.2em" }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                x: useTransform(mouseXSpring, (x) => (x - window.innerWidth / 2) * 0.05),
                                y: useTransform(mouseYSpring, (y) => (y - window.innerHeight / 2) * 0.05),
                            }}
                            onClick={() => setShowAddModal(true)}
                            className="bg-white text-black px-24 py-8 rounded-full font-black text-2xl flex items-center gap-5 transition-all tracking-tighter shadow-2xl overflow-hidden group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/40 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                            <Plus size={36} strokeWidth={4} />
                            MANIFEST REALITY
                        </motion.button>
                    </div>

                    {/* Celestial Stats Grid */}
                    <div className="grid md:grid-cols-3 gap-10 mb-32">
                        {[
                            { label: "Materialization Value", val: (totalNeeded / 100000).toFixed(2), unit: "L", color: "from-purple-600/30 border-purple-500/30" },
                            { label: "Current Density", val: (totalSaved / 100000).toFixed(2), unit: "L", color: "from-cyan-600/20 border-cyan-500/20" },
                            { label: "Sync Status", val: overallProgress, unit: "%", color: "from-indigo-600/30 border-indigo-500/30" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className={`glass p-12 rounded-[4rem] border ${stat.color} bg-gradient-to-br to-transparent backdrop-blur-[80px] border-t-white/30 relative overflow-hidden group`}
                            >
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-[60px] group-hover:bg-white/10 transition-all" />
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] block mb-6">{stat.label}</span>
                                <div className="text-6xl font-black flex items-baseline gap-3 text-white tracking-tighter">
                                    {stat.val}
                                    <span className="text-2xl text-slate-500 font-bold">{stat.unit}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Daily Nudges / Motivation Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-32 p-12 rounded-[4rem] bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 border border-white/5 backdrop-blur-3xl text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                        <Sparkles className="mx-auto mb-6 text-purple-400" size={32} />
                        <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight italic">
                            "Every bachat you make brings you one step closer to your destiny."
                        </h4>
                        <p className="text-slate-500 text-[10px] uppercase tracking-[0.5em] font-black">Daily Manifestation Nudge</p>
                    </motion.div>

                    {/* The Dream Islands Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        <AnimatePresence mode="popLayout">
                            {dreams.map((dream, index) => (
                                <DreamCard
                                    key={dream.id}
                                    dream={dream}
                                    index={index}
                                    totalSaved={totalSaved}
                                    totalNeeded={totalNeeded}
                                    calculateProgress={calculateProgress}
                                    categoryIcons={categoryIcons}
                                    deleteDream={deleteDream}
                                    setSelectedDreamForStrategy={setSelectedDreamForStrategy}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* --- Modals --- */}
                <AnimatePresence>
                    {showAddModal && (
                        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 50 }}
                                className="bg-[#0a0a0a] border border-white/10 rounded-[4rem] p-12 max-w-lg w-full relative shadow-[0_0_100px_rgba(168,85,247,0.15)]"
                            >
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-4xl font-black tracking-tighter text-white">New <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Dream.</span></h3>
                                    <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-white transition-all"><Plus size={32} className="rotate-45" /></button>
                                </div>
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Goal Identity</label>
                                        <input type="text" placeholder="e.g. MacBook Pro M3" className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 focus:border-purple-500 transition-all text-white font-bold placeholder:text-slate-600" value={newDream.title} onChange={(e) => setNewDream({ ...newDream, title: e.target.value })} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Target Amount (₹)</label>
                                            <input type="number" placeholder="85,000" className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 focus:border-purple-500 transition-all text-white font-bold" value={newDream.target} onChange={(e) => setNewDream({ ...newDream, target: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Already Saved (₹)</label>
                                            <input type="number" placeholder="5,000" className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 focus:border-purple-500 transition-all text-white font-bold" value={newDream.saved} onChange={(e) => setNewDream({ ...newDream, saved: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Manifestation Deadline</label>
                                        <input type="date" className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 focus:border-purple-500 transition-all text-white font-bold" value={newDream.deadline} onChange={(e) => setNewDream({ ...newDream, deadline: e.target.value })} />
                                    </div>
                                    <button onClick={addDream} className="w-full py-6 mt-4 bg-white text-black font-black rounded-3xl hover:bg-purple-500 hover:text-white transition-all transform hover:scale-[1.02] active:scale-95 shadow-2xl uppercase tracking-tighter text-xl">MANIFEST REALITY 🚀</button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {selectedDreamForStrategy && (() => {
                        const strategy = getStrategy(selectedDreamForStrategy);
                        return (
                            <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/98 backdrop-blur-3xl overflow-y-auto">
                                <motion.div
                                    initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
                                    className="bg-[#020617] border border-white/10 rounded-[4rem] p-12 max-w-2xl w-full relative shadow-2xl my-8 border-t-white/20"
                                >
                                    <div className="flex justify-between items-start mb-12">
                                        <div>
                                            <h3 className="text-5xl font-black tracking-tighter text-white mb-2">The <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Blueprint.</span></h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Reality Check:</span>
                                                <span className={`text-sm font-black uppercase tracking-widest ${strategy.difficultyColor}`}>{strategy.difficulty}</span>
                                            </div>
                                        </div>
                                        <button onClick={() => setSelectedDreamForStrategy(null)} className="p-4 hover:bg-white/5 rounded-full text-gray-500 transition-all"><Plus size={32} className="rotate-45" /></button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-8 mb-12">
                                        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5">
                                            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Cycles Left</div>
                                            <div className="text-4xl font-black text-white">{strategy.diffMonths} <span className="text-sm text-slate-500">Months</span></div>
                                        </div>
                                        <div className="p-8 rounded-[2.5rem] bg-purple-500/5 border border-purple-500/20">
                                            <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-4">Required Rate</div>
                                            <div className="text-4xl font-black text-white">₹{strategy.monthlyNeeded.toLocaleString()} <span className="text-sm text-slate-500">/mo</span></div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2 px-1">Speed Up Engine</div>
                                        {strategy.advice.map((item, i) => (
                                            <div key={i} className="flex gap-6 p-7 rounded-[2.5rem] bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-all items-center group">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 ${item.color} group-hover:scale-110 transition-transform`}><item.icon size={28} /></div>
                                                <div>
                                                    <div className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors">{item.title}</div>
                                                    <div className="text-sm text-gray-400 font-medium">{item.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => setSelectedDreamForStrategy(null)} className="w-full py-6 mt-12 bg-white text-black font-black rounded-3xl hover:bg-purple-500 hover:text-white transition-all uppercase tracking-widest text-lg shadow-[0_0_50px_rgba(255,255,255,0.1)]">I SHALL MANIFEST THIS.</button>
                                </motion.div>
                            </div>
                        );
                    })()}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Dreams;
