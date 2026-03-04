import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence, useScroll } from 'framer-motion';
import { Cloud, Moon, Sparkles, Wind, Target, Star, Plane, Home, Car, Laptop, Shield, Heart, Trash2, Plus, ChevronRight, Briefcase, Coins, CheckCircle2 } from 'lucide-react';

// ... (Sub-components: MousePosition, MagneticCursor, FloatingIsland, ShootingStar, CrystalShard, DreamPortal, DreamCard)

const Dreams = () => {
    const [isEntering, setIsEntering] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const { mouseX, mouseY } = useMousePosition();
    const mouseXSpring = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const mouseYSpring = useSpring(mouseY, { stiffness: 50, damping: 20 });

    return (
        <div className="cursor-none">
            <MagneticCursor mouseX={mouseX} mouseY={mouseY} />
            <AnimatePresence>{isEntering && <DreamPortal onComplete={() => setIsEntering(false)} />}</AnimatePresence>
            <div className="relative pt-28 pb-16 min-h-screen bg-[#020617] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col items-center text-center mb-36 mt-12">
                        <motion.div
                            style={{ x: useTransform(mouseXSpring, (x) => (x - window.innerWidth / 2) * 0.05), y: useTransform(mouseYSpring, (y) => (y - window.innerHeight / 2) * 0.05) }}
                            initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", damping: 12, delay: 0.2 }}
                            className="w-32 h-32 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-[3rem] flex items-center justify-center text-white mb-12 backdrop-blur-3xl border border-white/10 shadow-[0_0_80px_rgba(168,85,247,0.4)] relative group overflow-hidden"
                        >
                            <Sparkles size={48} strokeWidth={1} className="animate-pulse relative z-10" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                        </motion.div>
                        <div className="overflow-hidden mb-10 pb-4">
                            <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }} className="text-8xl lg:text-[11.5rem] font-black tracking-[-0.04em] leading-[0.8] text-white">
                                Dream <br />
                                <div className="flex justify-center flex-wrap gap-x-2">
                                    {"Kingdom.".split("").map((char, i) => (
                                        <motion.span key={i} initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)", y: 50 }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }} transition={{ duration: 1, delay: 0.8 + i * 0.08, ease: "easeOut" }} className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_0_80px_rgba(168,85,247,0.4)] cursor-default uppercase">{char}</motion.span>
                                    ))}
                                </div>
                            </motion.h1>
                        </div>
                        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="text-slate-400 text-2xl max-w-3xl leading-relaxed font-light tracking-tight mb-16">
                            Where your <span className="text-white font-bold italic">Deepest Thoughts</span> transform into foundations within the <span className="text-purple-400 border-b border-purple-800/50">Celestial Realm.</span>
                        </motion.p>
                        <motion.button onClick={() => setShowAddModal(true)} className="bg-white text-black px-24 py-8 rounded-full font-black text-2xl flex items-center gap-5 transition-all tracking-tighter shadow-2xl relative group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/40 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                            <Plus size={36} strokeWidth={4} /> MANIFEST REALITY
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dreams;
