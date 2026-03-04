// ... (Previous imports and components)

const Dreams = () => {
    // ... (States and Logic)
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedDreamForStrategy, setSelectedDreamForStrategy] = useState(null);

    return (
        <div className="cursor-none">
            {/* ... (Previous Sections) */}

            {/* Modals */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="bg-[#0a0a0a] border border-white/10 rounded-[4rem] p-12 max-w-lg w-full shadow-2xl"
                        >
                            <h3 className="text-4xl font-black text-white mb-10">New <span className="text-purple-400">Dream.</span></h3>
                            <div className="space-y-8">
                                <input type="text" placeholder="Goal Identity" className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-white font-bold" />
                                <button className="w-full py-6 bg-white text-black font-black rounded-3xl hover:bg-purple-500 hover:text-white transition-all">MANIFEST REALITY 🚀</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
