import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Cloud, Moon, Sparkles, Wind, Target, Star, Plane, Home, Car, Laptop, Shield, Heart } from 'lucide-react';

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

const Dreams = () => {
    const { mouseX, mouseY } = useMousePosition();
    const mouseXSpring = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const mouseYSpring = useSpring(mouseY, { stiffness: 50, damping: 20 });

    return (
        <div className="cursor-none">
            <MagneticCursor mouseX={mouseX} mouseY={mouseY} />
            <div className="relative min-h-screen bg-[#020617] overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <ShootingStar />
                    <FloatingIsland mouseX={mouseXSpring} mouseY={mouseYSpring} pFactor={0.02} delay={0} top="15%" left="5%" scale={1.2} opacity={0.6} />
                    <CrystalShard mouseX={mouseXSpring} mouseY={mouseYSpring} pFactor={0.06} delay={1} top="25%" left="80%" scale={1} />
                </div>
                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <h1 className="text-white text-4xl font-black">Celestial Atmosphere Integrated...</h1>
                </div>
            </div>
        </div>
    );
};

export default Dreams;
