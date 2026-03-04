import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

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

const Dreams = () => {
    const { mouseX, mouseY } = useMousePosition();
    return (
        <div className="cursor-none">
            <MagneticCursor mouseX={mouseX} mouseY={mouseY} />
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <h1 className="text-white text-4xl">Dream Kingdom Loading...</h1>
            </div>
        </div>
    );
};

export default Dreams;
