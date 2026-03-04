import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Cloud, Moon, Sparkles, Wind, Target, Star, Plane, Home, Car, Laptop, Shield, Heart, Trash2 } from 'lucide-react';

// --- Previous components (omitted for brevity) ---

const DreamCard = ({ dream, index, calculateProgress, categoryIcons, deleteDream, setSelectedDreamForStrategy }) => {
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotX = useTransform(mouseY, [0, 400], [5, -5]);
    const rotY = useTransform(mouseX, [0, 400], [-5, 5]);

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const Icon = categoryIcons[dream.category] || Star;
    const progress = calculateProgress(dream.saved, dream.target);

    return (
        <motion.div
            ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={() => { mouseX.set(200); mouseY.set(200); }}
            layout style={{ perspective: 1000, rotateX: rotX, rotateY: rotY }}
            whileHover={{ y: -15, scale: 1.02 }} className="relative group cursor-none"
        >
            <div className="glass p-12 rounded-[4rem] border-white/5 bg-slate-900/40 backdrop-blur-3xl relative z-10 h-full flex flex-col justify-between shadow-2xl overflow-hidden">
                <motion.div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: useTransform([mouseX, mouseY], ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, rgba(168,85,247,0.15), transparent 80%)`) }} />
                <div className="flex justify-between mb-10">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-white/10 flex items-center justify-center text-white"><Icon size={36} /></div>
                </div>
                <div><h3 className="text-4xl font-bold text-white mb-8">{dream.title}</h3></div>
                <div className="h-4 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-purple-600 via-cyan-400 to-white shadow-[0_0_30px_rgba(168,85,247,0.5)]" />
                </div>
            </div>
        </motion.div>
    );
};

// --- Dreams Main --- (omitted parts)

const Dreams = () => {
    // ...
    const categoryIcons = { Travel: Plane, Home: Home, Car: Car };
    const calculateProgress = (s, t) => Math.min(Math.round((s / t) * 100), 100);
    const [dreams] = useState([{ id: 1, title: "Sky Villa", target: 8500000, saved: 2500000, category: "Home" }]);

    return (
        <div className="cursor-none">
            {/* Previous components */}
            <div className="max-w-7xl mx-auto px-4 py-32 grid md:grid-cols-3 gap-10">
                {dreams.map((dream, i) => (
                    <DreamCard key={dream.id} dream={dream} index={i} calculateProgress={calculateProgress} categoryIcons={categoryIcons} />
                ))}
            </div>
        </div>
    );
};

export default Dreams;
