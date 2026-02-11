import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndianRupee, TrendingDown, Calendar, Wallet, Zap, Brain, ChevronRight, AlertCircle, CheckCircle2, Info, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDebtCalculator } from '../hooks/useDebtCalculator';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DebtOptimizer = () => {
    const INITIAL_EMIS = [
        { id: '1', name: 'Home Loan', amount: 35000, rate: 8.5, balance: 4500000 },
        { id: '2', name: 'Car Loan', amount: 12000, rate: 9.5, balance: 800000 },
        { id: '3', name: 'Credit Card', amount: 5000, rate: 36.0, balance: 150000 },
    ];

    const [emis, setEmis] = useState(() => {
        const saved = localStorage.getItem('gullak_debt_emis');
        return saved ? JSON.parse(saved) : INITIAL_EMIS;
    });

    const [extraPayment, setExtraPayment] = useState(() => {
        const saved = localStorage.getItem('gullak_debt_extra');
        return saved ? Number(saved) : 5000;
    });

    const [income, setIncome] = useState(() => {
        const saved = localStorage.getItem('gullak_debt_income');
        return saved ? Number(saved) : 50000;
    });

    const [livingExpenses, setLivingExpenses] = useState(() => {
        const saved = localStorage.getItem('gullak_debt_expenses');
        return saved ? Number(saved) : 15000;
    });

    const [isExporting, setIsExporting] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('gullak_debt_emis', JSON.stringify(emis));
        localStorage.setItem('gullak_debt_extra', extraPayment.toString());
        localStorage.setItem('gullak_debt_income', income.toString());
        localStorage.setItem('gullak_debt_expenses', livingExpenses.toString());
    }, [emis, extraPayment, income, livingExpenses]);

    const updateEmi = (id, field, value) => {
        setEmis(emis.map(e => e.id === id ? { ...e, [field]: field === 'name' ? value : (Number(value) || 0) } : e));
    };

    const addEmi = () => {
        const newId = Math.random().toString(36).substr(2, 9);
        setEmis([...emis, { id: newId, name: '', amount: 0, rate: 0, balance: 0 }]);
    };

    const removeEmi = (id) => {
        setEmis(emis.filter(e => e.id !== id));
    };

    // Use the custom hook for debt calculations
    const { roadmap, totalInterest, baseline, suggestions, totalDuration } = useDebtCalculator(
        emis,
        income,
        livingExpenses,
        extraPayment
    );

    const generatePDF = async () => {
        setIsExporting(true);
        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const margin = 20;

            // 1. Create a hidden div for the Logo capture
            const logoDiv = document.createElement('div');
            logoDiv.style.position = 'absolute';
            logoDiv.style.top = '-9999px';
            logoDiv.style.backgroundColor = '#0A0A0A';
            logoDiv.style.padding = '40px';
            logoDiv.style.width = '600px';
            logoDiv.innerHTML = `
                <div style="font-family: 'Inter', sans-serif; color: #FFD700; background: #0A0A0A; padding: 20px;">
                    <div style="font-size: 24px; font-weight: bold; margin-bottom: 2px;">मेरा</div>
                    <div style="font-size: 60px; font-weight: 900; letter-spacing: -3px; line-height: 0.9;">
                        <span style="color: #FFD700;">GULL</span><span style="color: #FFFFFF;">AK</span><span style="color: #FFD700;">.com</span>
                    </div>
                </div>
            `;
            document.body.appendChild(logoDiv);

            const canvas = await html2canvas(logoDiv, { backgroundColor: '#0A0A0A', scale: 3 });
            const logoImg = canvas.toDataURL('image/png');
            document.body.removeChild(logoDiv);

            // Add Header Background
            pdf.setFillColor(10, 10, 10);
            pdf.rect(0, 0, pageWidth, 50, 'F');

            // Add Logo
            const imgWidth = 65;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(logoImg, 'PNG', margin, 12, imgWidth, imgHeight);

            pdf.setFontSize(10);
            pdf.setTextColor(150, 150, 150);
            pdf.text('PERSONAL DEBT FREEDOM ROADMAP', pageWidth - margin, 18, { align: 'right' });
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth - margin, 24, { align: 'right' });

            let y = 65;

            // Summary Grid
            pdf.setFillColor(245, 245, 245);
            pdf.roundedRect(margin, y, pageWidth - (margin * 2), 40, 3, 3, 'F');

            pdf.setTextColor(100, 100, 100);
            pdf.setFontSize(9);
            pdf.text('TOTAL DEBT', margin + 10, y + 12);
            pdf.text('INTEREST SAVED', margin + 65, y + 12);
            pdf.text('TIME SAVED', margin + 120, y + 12);

            pdf.setTextColor(0, 0, 0);
            pdf.setFontSize(16);
            pdf.setFont('helvetica', 'bold');
            pdf.text(`Rs. ${suggestions.stats.totalDebt.toLocaleString()}`, margin + 10, y + 25);
            pdf.setTextColor(16, 185, 129); // Success Green
            const interestSaved = baseline.totalInterest - totalInterest;
            pdf.text(`Rs. ${Math.max(0, Math.round(interestSaved)).toLocaleString()}`, margin + 65, y + 25);

            const monthsSaved = baseline.totalDuration - totalDuration;
            pdf.setTextColor(59, 130, 246); // Blue
            pdf.text(`${monthsSaved > 0 ? monthsSaved : 0} Months`, margin + 120, y + 25);

            y += 55;

            // Strategy Header
            pdf.setTextColor(0, 0, 0);
            pdf.setFontSize(14);
            pdf.text('REPAYMENT MILESTONES', margin, y);
            y += 10;

            // Table Header
            pdf.setFillColor(10, 10, 10);
            pdf.rect(margin, y, pageWidth - (margin * 2), 10, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(9);
            pdf.text('MONTH', margin + 5, y + 6.5);
            pdf.text('TARGET LOAN CLOSURE', margin + 40, y + 6.5);
            pdf.text('YEAR', pageWidth - margin - 5, y + 6.5, { align: 'right' });

            y += 10;
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(0, 0, 0);

            if (roadmap.length === 0) {
                pdf.text('No active loans found. You are debt free!', margin + 5, y + 10);
            } else {
                const displayRoadmap = roadmap.slice(0, 20); // Show up to 20 milestones
                displayRoadmap.forEach((step, i) => {
                    if (y > 260) {
                        pdf.addPage();
                        y = 20;
                    }
                    if (i % 2 === 0) {
                        pdf.setFillColor(252, 252, 252);
                        pdf.rect(margin, y, pageWidth - (margin * 2), 8, 'F');
                    }
                    pdf.text(`Month ${step.month}`, margin + 5, y + 5.5);
                    pdf.setFont('helvetica', 'bold');
                    pdf.text(step.loanName, margin + 40, y + 5.5);
                    pdf.setFont('helvetica', 'normal');
                    pdf.text(`Year ${step.year}`, pageWidth - margin - 5, y + 5.5, { align: 'right' });
                    y += 8;
                });
            }

            // Pro Tip section
            y += 40;
            if (y > 250) {
                pdf.addPage();
                y = 20;
            }
            pdf.setFillColor(255, 249, 230);
            pdf.roundedRect(margin, y, pageWidth - (margin * 2), 25, 3, 3, 'F');
            pdf.setTextColor(180, 140, 0);
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'bold');
            pdf.text('AI ADVISOR TIP:', margin + 10, y + 10);
            pdf.setTextColor(60, 60, 60);
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(9);
            pdf.text(`Stick to the ${suggestions.avalanche?.name} extra payment of Rs. ${extraPayment.toLocaleString()} to hit these targets.`, margin + 10, y + 17);

            pdf.save(`Gullak_Debt_Plan_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`);
        } catch (error) {
            console.error('PDF Export failed:', error);
            alert('Failed to generate PDF. Please try again.');
        }
        setIsExporting(false);
    };

    return (
        <div className="pt-28 pb-16 min-h-screen bg-background text-white" ref={contentRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-12">
                    <Link to="/calculate-expenses" className="text-primary text-sm font-bold flex items-center gap-1 mb-4 hover:underline">
                        <ChevronRight className="rotate-180" size={16} /> Back to Expenses
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="flex flex-col mb-4">
                            <span className="text-xl md:text-2xl font-bold text-primary -mb-1 ml-1 scale-y-110 origin-bottom">मेरा</span>
                            <div className="flex items-baseline">
                                <span className="text-4xl md:text-5xl font-black tracking-tighter text-gradient">GULLAK</span>
                                <span className="text-2xl md:text-3xl font-black text-white">.com</span>
                            </div>
                            <span className="mt-2 text-xl font-bold text-gray-400">Smart Debt Optimizer</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            Stop paying excessive interest. Our "CA-Logic" engine helps you prioritize loans and saves years of repayments.
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* EMI Input List */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="glass rounded-[2rem] overflow-hidden border-white/5 shadow-2xl">
                            <div className="p-6 bg-white/5 border-b border-white/10 flex justify-between items-center">
                                <h3 className="font-bold flex items-center gap-2">
                                    <Wallet className="text-primary" size={20} />
                                    Your Active Loans / EMIs
                                </h3>
                                <button onClick={addEmi} className="text-xs font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg hover:bg-primary/20 transition-all">
                                    + Add Loan
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                {emis.map((emi) => (
                                    <div key={emi.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all relative group">
                                        <div className="md:col-span-4">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Loan Name</label>
                                            <input
                                                type="text"
                                                value={emi.name}
                                                onChange={(e) => updateEmi(emi.id, 'name', e.target.value)}
                                                className="bg-transparent border-none text-white font-bold w-full focus:ring-0"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Monthly EMI</label>
                                            <input
                                                type="number"
                                                value={emi.amount}
                                                onChange={(e) => updateEmi(emi.id, 'amount', e.target.value)}
                                                className="bg-transparent border-none text-white font-bold w-full focus:ring-0"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Int. Rate (%)</label>
                                            <input
                                                type="number"
                                                value={emi.rate}
                                                onChange={(e) => updateEmi(emi.id, 'rate', e.target.value)}
                                                className="bg-transparent border-none text-white font-bold w-full focus:ring-0"
                                            />
                                        </div>
                                        <div className="md:col-span-3">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Outstanding Balance</label>
                                            <input
                                                type="number"
                                                value={emi.balance}
                                                onChange={(e) => updateEmi(emi.id, 'balance', e.target.value)}
                                                className="bg-transparent border-none text-white font-bold w-full focus:ring-0"
                                            />
                                        </div>
                                        <button
                                            onClick={() => removeEmi(emi.id)}
                                            className="absolute -right-2 top-1/2 -translate-y-1/2 p-2 bg-red-500/10 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <Zap size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Extra Repayment Section */}
                        <div className="glass p-8 rounded-[2.5rem] border-primary/20 bg-primary/5">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="p-4 rounded-3xl bg-primary/20">
                                    <Zap size={40} className="text-primary animate-pulse" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-2">Power Up Your Repayment</h3>
                                    <p className="text-gray-400 text-sm mb-4">Total amount you can pay extra every month across all loans.</p>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                                        <input
                                            type="number"
                                            value={extraPayment}
                                            onChange={(e) => setExtraPayment(Number(e.target.value))}
                                            className="w-full bg-background/50 border-2 border-primary/20 rounded-2xl pl-12 pr-6 py-4 text-2xl font-black focus:outline-none focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Suggestions Column */}
                    <div className="lg:col-span-4 space-y-6">
                        <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest px-2">Gullak Intelligence Suggestions</h3>

                        {/* Strategy 1: Avalanche */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass p-6 rounded-3xl border-secondary/20 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <TrendingDown size={80} />
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-black rounded-full mb-4">
                                <Brain size={12} /> HIGHEST INTEREST FIRST (AVALANCHE)
                            </div>
                            <h4 className="text-lg font-bold mb-2 text-white">Focus on: {suggestions.avalanche?.name || 'N/A'}</h4>
                            <p className="text-xs text-gray-400 leading-relaxed mb-4">
                                This loan is eating away your net worth with a <span className="text-secondary font-bold">{suggestions.avalanche?.rate}%</span> interest rate.
                                Put your extra ₹{extraPayment} here to save maximum total interest.
                            </p>
                            <div className="p-3 bg-secondary/5 border border-secondary/10 rounded-xl text-[10px] font-bold text-secondary flex items-center gap-2">
                                <CheckCircle2 size={14} /> Recommended for pure math savings.
                            </div>
                        </motion.div>

                        {/* Strategy 2: Snowball */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass p-6 rounded-3xl border-orange-500/20 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Zap size={80} />
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 text-[10px] font-black rounded-full mb-4">
                                <Zap size={12} /> SMALLEST BALANCE FIRST (SNOWBALL)
                            </div>
                            <h4 className="text-lg font-bold mb-2 text-white">Focus on: {suggestions.snowball?.name || 'N/A'}</h4>
                            <p className="text-xs text-gray-400 leading-relaxed mb-4">
                                This loan has only ₹{suggestions.snowball?.balance.toLocaleString()} left.
                                Closing this first will give you a psychological win and free up one EMI "headache" faster.
                            </p>
                            <div className="p-3 bg-orange-500/5 border border-orange-500/10 rounded-xl text-[10px] font-bold text-orange-400 flex items-center gap-2">
                                <Info size={14} /> Recommended for mental satisfaction & motivation.
                            </div>
                        </motion.div>

                        <div className="glass p-6 rounded-3xl border-primary/10 text-center">
                            <h4 className="text-sm font-bold mb-2">Want a Personalized Debt Plan?</h4>
                            <p className="text-xs text-gray-500 mb-4">Download your custom repayment schedule based on these EMIs.</p>
                            <button
                                onClick={generatePDF}
                                disabled={isExporting}
                                className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                            >
                                {isExporting ? <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" /> : <Download size={16} />}
                                {isExporting ? 'Generating...' : 'Generate PDF Schedule'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DebtOptimizer;
