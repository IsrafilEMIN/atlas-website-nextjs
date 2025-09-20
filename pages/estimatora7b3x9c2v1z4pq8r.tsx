import React, { useState, useRef, useEffect } from 'react';

// --- TYPE DEFINITIONS ---
type ServiceType = '' | 'interior' | 'exterior' | 'cabinets';
// PrepCondition and PaintQuality types removed
type AreaType = '' | 'floor' | 'wall';

interface SelectableCardProps { label: string; selected: boolean; onClick: () => void; children?: React.ReactNode; }

// --- HELPER COMPONENTS ---
const SelectableCard: React.FC<SelectableCardProps> = ({ label, selected, onClick, children = null }) => (
    <div 
        className={`relative overflow-hidden border rounded-2xl p-6 cursor-pointer text-center transition-all duration-300 ${
            selected 
                ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg scale-[1.02]' 
                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md hover:scale-[1.01]'
        }`} 
        onClick={onClick}
    >
        {selected && (
            <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </div>
        )}
        <h4 className={`font-semibold text-lg mb-1 transition-colors ${selected ? 'text-blue-700' : 'text-gray-800'}`}>
            {label}
        </h4>
        {children}
    </div>
);

// --- MAIN APP COMPONENT ---
export default function App() {
    const [serviceType, setServiceType] = useState<ServiceType>('');
    const [stories, setStories] = useState<number>(1);
    const [hasBasement, setHasBasement] = useState<boolean>(false);
    const [areaType, setAreaType] = useState<AreaType>('');
    const [floorArea, setFloorArea] = useState<string>('');
    const [wallArea, setWallArea] = useState<string>('');
    const [cabinetsArea, setCabinetsArea] = useState<string>('');
    // selectedPrep and selectedPaintQuality states removed
    const [estimate, setEstimate] = useState({ low: 0, high: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [activeAreaInput, setActiveAreaInput] = useState<AreaType>('');

    const estimatorRef = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        if (estimatorRef.current) {
            const headerOffset = 300;
            const elementPosition = estimatorRef.current.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToTop();
    }, []);

    useEffect(() => {
        scrollToTop();
    }, [serviceType, showResult]);

    const getTitle = () => {
        switch (serviceType) {
            case 'interior': return 'Interior Painting';
            case 'exterior': return 'Exterior Painting';
            case 'cabinets': return 'Cabinet Refinishing';
            default: return 'Home Improvement';
        }
    };

    const calculateEstimate = () => {
        let currentArea: number;
        if (serviceType === 'cabinets') {
            currentArea = parseInt(cabinetsArea) || 0;
        } else {
            currentArea = areaType === 'floor' ? (parseInt(floorArea) || 0) : (parseInt(wallArea) || 0);
        }
        
        // Updated validation to remove checks for prep and paint quality
        if (currentArea <= 0 || (serviceType !== 'cabinets' && !areaType)) {
            alert("Please fill in all required fields.");
            return;
        }
        
        setIsLoading(true);
        setTimeout(() => {
            let paintedArea: number;
            if (serviceType === 'cabinets') {
                paintedArea = parseInt(cabinetsArea) || 0; // doors & drawers count
            } else {
                const inputArea = areaType === 'floor' ? (parseInt(floorArea) || 0) : (parseInt(wallArea) || 0);
                if (areaType === 'floor') {
                    if (serviceType === 'interior') {
                        paintedArea = inputArea * 2.5;
                    } else {
                        paintedArea = inputArea * 1.5;
                    }
                } else {
                    paintedArea = inputArea;
                }
            }

            // --- LOGIC MODIFIED ---
            // Removed laborRate and materialRate switch statements.
            // Using a single, hardcoded rate for simplicity and realism.
            let rate: number;
            if (serviceType === 'cabinets') {
                // Assuming an average price per door/drawer.
                rate = 180; 
            } else if (serviceType == 'interior') {
                rate = 1; 
            } else {
                rate = 2;
            }
            // --- END MODIFICATION ---

            if (serviceType !== 'cabinets') {
                if (stories === 2) rate *= 1.1;
                if (stories >= 3) rate *= 1.2;
                if (hasBasement && serviceType === 'interior') rate *= 1.1;
            }

            const prepCost = 0;
            const base = paintedArea * rate + prepCost;
            const low = Math.round(base * 0.9); // Adjusted range to be a bit tighter
            const high = Math.round(base * 1.1);

            setEstimate({ low, high });
            setIsLoading(false);
            setShowResult(true);
        }, 1000);
    };

    const startOver = () => {
        setServiceType('');
        setStories(1);
        setHasBasement(false);
        setAreaType('');
        setFloorArea('');
        setWallArea('');
        setCabinetsArea('');
        // setSelectedPrep and setSelectedPaintQuality resets removed
        setShowResult(false);
        setActiveAreaInput('');
    };

    const formatCurrency = (num: number) => `$${num.toLocaleString()} CAD`;

    const renderServiceSelection = () => (
        <div className="text-center space-y-8">
            <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What service do you need?</h2>
                <p className="text-lg text-gray-600">Choose your project type to get started</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <SelectableCard label="Interior Painting" selected={false} onClick={() => setServiceType('interior')}>
                    <p className="text-sm text-gray-500 mt-2">Transform your indoor spaces</p>
                </SelectableCard>
                <SelectableCard label="Exterior Painting" selected={false} onClick={() => setServiceType('exterior')}>
                    <p className="text-sm text-gray-500 mt-2">Refresh your home's curb appeal</p>
                </SelectableCard>
                <SelectableCard label="Cabinet Refinishing" selected={false} onClick={() => setServiceType('cabinets')}>
                    <p className="text-sm text-gray-500 mt-2">Update your kitchen or bath</p>
                </SelectableCard>
            </div>
        </div>
    );

    const renderAreaInputs = () => {
        const wallLabel = serviceType === 'exterior' ? 'Surface Area of Sidings (sq ft)' : 'Wall Surface Area (sq ft)';
        const wallPlaceholder = serviceType === 'exterior' ? 'Enter surface area of sidings to be painted' : 'Enter wall surface area to be painted';

        return (
            <div className="relative min-h-[120px] flex items-center justify-center">
                {!activeAreaInput ? (
                    // Side by side view
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700">Floor Area (sq ft)</label>
                            <input
                                type="text"
                                value={floorArea}
                                onFocus={() => { setAreaType('floor'); setActiveAreaInput('floor'); }}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    setFloorArea(value);
                                }}
                                className="w-full px-4 py-3 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                                placeholder="Enter total floor area"
                            />
                        </div>
                        
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700">{wallLabel}</label>
                            <input
                                type="text"
                                value={wallArea}
                                onFocus={() => { setAreaType('wall'); setActiveAreaInput('wall'); }}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    setWallArea(value);
                                }}
                                className="w-full px-4 py-3 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                                placeholder={wallPlaceholder}
                            />
                        </div>
                    </div>
                ) : (
                    // Centered single field view
                    <div className="w-full max-w-md mx-auto animate-[slideIn_0.3s_ease-out]">
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700">
                                {activeAreaInput === 'floor' ? 'Floor Area (sq ft)' : wallLabel}
                            </label>
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setActiveAreaInput('');
                                        if (activeAreaInput === 'floor') setFloorArea('');
                                        if (activeAreaInput === 'wall') setWallArea('');
                                        setAreaType('');
                                    }}
                                    className="absolute -left-12 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors animate-[fadeIn_0.3s_ease-out]"
                                >
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <input
                                    type="text"
                                    value={activeAreaInput === 'floor' ? floorArea : wallArea}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, '');
                                        if (activeAreaInput === 'floor') setFloorArea(value);
                                        if (activeAreaInput === 'wall') setWallArea(value);
                                    }}
                                    className="w-full px-4 py-3 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                    placeholder={activeAreaInput === 'floor' ? 'Enter total floor area' : wallPlaceholder}
                                    autoFocus
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderCabinetsInput = () => (
        <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-3">
                Total Number of Doors & Drawers
            </label>
            <input
                type="text"
                value={cabinetsArea}
                onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setCabinetsArea(value);
                }}
                className="w-full px-4 py-3 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                placeholder="e.g., 20"
            />
        </div>
    );

    const renderForm = () => {
        let isDisabled = false;
        if (serviceType === 'cabinets') {
            isDisabled = !cabinetsArea;
        } else {
            if (!areaType) isDisabled = true;
            else if (areaType === 'floor') isDisabled = !floorArea;
            else if (areaType === 'wall') isDisabled = !wallArea;
        }

        return (
            <div className="text-center space-y-10">
                <div className="space-y-3">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {getTitle()} Estimate
                    </h2>
                </div>
                
                <div className="max-w-3xl mx-auto space-y-10">
                    {serviceType !== 'cabinets' && (
                        <div className="space-y-4 text-left">
                            <label className="block text-sm font-medium text-gray-700">Stories (Excluding Basement)</label>
                            <select 
                                value={stories} 
                                onChange={(e) => setStories(parseInt(e.target.value))}
                                className="w-full px-4 py-3 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            >
                                <option value={1}>1 Story</option>
                                <option value={2}>2 Stories</option>
                                <option value={3}>3+ Stories</option>
                            </select>
                        </div>
                    )}
                    
                    {serviceType === 'interior' && (
                        <div className="text-left">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={hasBasement} 
                                    onChange={(e) => setHasBasement(e.target.checked)}
                                    className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-gray-700 font-medium">Has basement?</span>
                            </label>
                        </div>
                    )}
                    
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800">
                            {serviceType === 'cabinets' ? 'Enter Cabinet Details' : 'Enter Area Details'}
                        </h3>
                        {serviceType === 'cabinets' ? renderCabinetsInput() : renderAreaInputs()}
                    </div>
                    
                    {/* Surface Condition and Paint Quality UI sections have been removed */}
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                        <button 
                            onClick={() => setServiceType('')}
                            className="px-8 py-3 text-lg font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Back to Services
                        </button>
                        <button 
                            onClick={calculateEstimate}
                            disabled={isDisabled}
                            className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-lg"
                        >
                            Calculate Estimate
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderResult = () => (
        <div className="text-center space-y-8">
            <div className="space-y-3">
                <h2 className="text-3xl font-bold text-gray-900">Your Estimated Project Range</h2>
                <p className="text-gray-600">Based on your specifications</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
                <div className="text-4xl md:text-5xl font-bold text-blue-700 min-h-[60px] flex items-center justify-center">
                    {isLoading ? (
                        <span className="animate-pulse">Calculating...</span>
                    ) : (
                        <span>{formatCurrency(estimate.low)} - {formatCurrency(estimate.high)}</span>
                    )}
                </div>
            </div>
            
            <div className="max-w-2xl mx-auto text-left space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Understanding Your Estimate</h3>
                <p className="text-gray-600">
                    This is a rough estimate based on standard pricing in Richmond Hill, Ontario. 
                    Actual costs may vary based on precise measurements and other factors.
                </p>
            </div>
            
            <div className="space-y-6">
                <button 
                    onClick={() => window.location.href = '/painting-landing?utm_source=estimator_tool&utm_medium=lead_magnet'}
                    className="px-10 py-4 text-xl font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
                >
                    Schedule a Free, Exact Quote
                </button>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                        onClick={() => setShowResult(false)}
                        className="px-6 py-3 font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        Back
                    </button>
                    <button 
                        onClick={startOver}
                        className="px-6 py-3 font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        Start Over
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-12">
            <style>{`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
            <div ref={estimatorRef} className="w-full max-w-5xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                    {!serviceType ? renderServiceSelection() : (showResult ? renderResult() : renderForm())}
                </div>
            </div>
        </div>
    );
}