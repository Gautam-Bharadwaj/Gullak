// ... (Previous imports and components)
// (Focusing onAdding the Stats Grid inside Dreams component)

const Dreams = () => {
    // ... (States and Hooks)
    const [totalNeeded] = useState(10200000);
    const [totalSaved] = useState(4050000);
    const overallProgress = 40;

    return (
        <div className="cursor-none">
            {/* ... (Previous content) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* ... (Header Content) */}

                <div className="grid md:grid-cols-3 gap-10 mb-32">
                    {[
                        { label: "Materialization Value", val: (totalNeeded / 100000).toFixed(2), unit: "L", color: "from-purple-600/30 border-purple-500/30" },
                        { label: "Current Density", val: (totalSaved / 100000).toFixed(2), unit: "L", color: "from-cyan-600/20 border-cyan-500/20" },
                        { label: "Sync Status", val: overallProgress, unit: "%", color: "from-indigo-600/30 border-indigo-500/30" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 + i * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className={`glass p-12 rounded-[4rem] border ${stat.color} bg-gradient-to-br to-transparent backdrop-blur-[80px] border-t-white/30 relative overflow-hidden group`}
                        >
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-[60px] group-hover:bg-white/10 transition-all" />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] block mb-6">{stat.label}</span>
                            <div className="text-6xl font-black flex items-baseline gap-3 text-white tracking-tighter">
                                {stat.val} <span className="text-2xl text-slate-500 font-bold">{stat.unit}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
