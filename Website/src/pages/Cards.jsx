import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Star, Zap, ShoppingBag, Plane, Coffee, ShieldCheck, ChevronRight, Info, ExternalLink, CheckCircle2 } from 'lucide-react';

const CardDemo = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedCountry, setSelectedCountry] = useState('🇮🇳 India');
    const [searchQuery, setSearchQuery] = useState('');

    const cardData = [
        // --- INDIA ---
        {
            id: 1,
            name: "HDFC Millennia",
            type: "Credit Card",
            color: "from-blue-600 to-indigo-900",
            category: "Personal",
            country: "🇮🇳 India",
            bank: "HDFC BANK",
            benefits: [
                "5% Cashback on Amazon, Flipkart, Myntra",
                "1% Cashback on all other spends",
                "8 Domestic Lounge accesses per year",
                "Dining discount up to 20% via Swiggy Dineout"
            ],
            bestFor: "Daily Lifestyle & Shopping",
            fee: "₹1,000 (Waived on ₹1L spend)",
            rating: 4.8,
            image: ""
        },
        {
            id: 2,
            name: "IDFC First WOW",
            type: "Credit Card",
            color: "from-emerald-600 to-teal-900",
            category: "Students",
            country: "🇮🇳 India",
            bank: "IDFC FIRST",
            benefits: [
                "No Income Proof required (FD based)",
                "Zero Forex Markup on International spends",
                "6X Rewards on all spends",
                "Buy 1 Get 1 on Movie Tickets"
            ],
            bestFor: "Students & First-time Card Users",
            fee: "₹0 (Life Time Free)",
            rating: 4.9,
            image: ""
        },
        {
            id: 3,
            name: "Axis Atlas",
            type: "Credit Card",
            color: "from-amber-500 to-amber-800",
            category: "Travelers",
            country: "🇮🇳 India",
            bank: "AXIS BANK",
            benefits: [
                "5 EDGE Miles per ₹100 on Flights/Hotels",
                "Tiered benefits (Silver, Gold, Platinum)",
                "Concierge & Airport Assistance",
                "Miles transferable to 20+ Airlines"
            ],
            bestFor: "Frequent Flyers & Global Travelers",
            fee: "₹5,000 (Waived on ₹10L spend)",
            rating: 4.7,
            image: ""
        },
        // --- USA ---
        {
            id: 101,
            name: "Chase Sapphire Preferred",
            type: "Credit Card",
            color: "from-blue-800 to-blue-950",
            category: "Travelers",
            country: "🇺🇸 USA",
            bank: "CHASE",
            benefits: [
                "60,000 Bonus Points after $4,000 spend",
                "5x on travel purchased through Chase",
                "3x on dining and streaming services",
                "$50 Annual Ultimate Rewards Hotel Credit"
            ],
            bestFor: "Travel & Dining Rewards",
            fee: "$95 Annual Fee",
            rating: 4.9,
            image: ""
        },
        {
            id: 102,
            name: "Amex Platinum",
            type: "Credit Card",
            color: "from-slate-300 to-slate-500",
            category: "Luxury",
            country: "🇺🇸 USA",
            bank: "AMERICAN EXPRESS",
            benefits: [
                "80,000 Membership Rewards points",
                "5x points on flights and hotels",
                "$200 Hotel Credit & $200 Airline Credit",
                "Global Lounge Collection access"
            ],
            bestFor: "Luxury Travel & Lifestyle",
            fee: "$695 Annual Fee",
            rating: 4.8,
            image: ""
        }
    ];

    const categories = ['All', 'Students', 'Personal', 'Business', 'Travelers', 'Luxury'];
    const countries = ['🇮🇳 India', '🇺🇸 USA', '🇬🇧 UK', '🇦🇪 UAE', '🇨🇦 Canada', '🇪🇺 Europe', '🇯🇵 Japan', '🇭🇰 Hong Kong', '🇸🇬 Singapore', '🇦🇺 Australia', 'Global'];

    const filteredCards = cardData.filter(card => {
        const matchesCategory = selectedCategory === 'All' || card.category === selectedCategory;
        const matchesCountry = selectedCountry === 'Global' || card.country === selectedCountry;
        const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.bank.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesCountry && matchesSearch;
    });

    return (
        <div className="pt-28 pb-20 min-h-screen bg-background text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Area */}
                <div className="mb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-4 tracking-widest uppercase">
                            <CreditCard size={14} />
                            <span>Global Card Intelligence</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                            The World's <span className="text-gradient">Card Vault</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            Search and filter through 1,000+ cards from India, USA, UK, and beyond.
                            Find the perfect plastic for your persona.
                        </p>
                    </motion.div>
                </div>

                {/* Search & Filters Row */}
                <div className="flex flex-col gap-6 mb-12">
                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto w-full">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Info size={20} className="text-gray-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by card name or bank (e.g. Amex, HDFC, Chase)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-primary transition-all text-lg font-medium"
                        />
                    </div>

                    {/* Country Selector */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {countries.map((country) => (
                            <button
                                key={country}
                                onClick={() => setSelectedCountry(country)}
                                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${selectedCountry === country
                                    ? 'bg-secondary text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                                    }`}
                            >
                                {country}
                            </button>
                        ))}
                    </div>

                    {/* Categories Filter */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${selectedCategory === cat
                                    ? 'bg-primary text-background'
                                    : 'bg-white/5 text-gray-500 border border-white/5 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDemo;
