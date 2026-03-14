import React from 'react';

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-12 lg:gap-8">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center p-8 glass rounded-3xl border border-white/5 hover:border-primary/20 transition-colors">
                        <div className="w-20 h-20 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">Input Finances</h3>
                        <p className="text-gray-400 text-base leading-relaxed">
                            Securely log your expenses and active EMIs to see your full financial picture.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center p-8 glass rounded-3xl border border-white/5 hover:border-primary/20 transition-colors">
                        <div className="w-20 h-20 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">AI Optimization</h3>
                        <p className="text-gray-400 text-base leading-relaxed">
                            Our engine scans for interest-saving opportunities and spending leaks.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center p-8 glass rounded-3xl border border-white/5 hover:border-primary/20 transition-colors">
                        <div className="w-20 h-20 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">Financial Growth</h3>
                        <p className="text-gray-400 text-base leading-relaxed">
                            Follow automated suggestions to clear debt faster and reach your Dreams.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
