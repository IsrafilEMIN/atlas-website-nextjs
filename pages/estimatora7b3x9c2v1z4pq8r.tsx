import React, { useState, useEffect, useCallback } from 'react';

// --- TYPE DEFINITIONS ---
interface Room {
    id: number;
    type: 'Bedroom' | 'Bathroom' | 'Living Room' | 'Dining Room' | 'Kitchen' | 'Hallway' | 'Entryway' | 'Office';
    length: number | string;
    width: number | string;
    ceilingHeight: number | string;
    paintWalls: boolean;
    paintCeiling: boolean;
    paintTrim: boolean;
    doors: number | string;
    paintDoorsCheck: boolean;
    closetDoors?: number | string;
    paintVanity?: boolean;
    vanityDoors?: number | string;
    vanityDrawers?: number | string;
    useMoldResistantPaint?: boolean;
    paintCrownMolding?: boolean;
    paintFireplaceMantel?: boolean;
    paintStairwell?: boolean;
    paintCabinets?: boolean;
    cabinetDoors?: number | string;
    cabinetDrawers?: number | string;
}

interface ExteriorItem {
    id: number;
    siding: string;
    sqft: number | string;
    stories: string;
    trimLft: number | string;
    doors: number | string;
    shutters?: number | string;
    windowFrames?: number | string;
    gutterLft?: number | string;
    deckSqft?: number | string;
}

type PrepCondition = 'good' | 'fair' | 'poor' | '';
type PaintQuality = 'good' | 'better' | 'best' | '';

// --- PROPS TYPE DEFINITIONS ---
interface SelectableCardProps { label: string; selected: boolean; onClick: () => void; children?: React.ReactNode; }
interface RoomModalProps { room: Room | null; onSave: (roomData: Room) => void; onClose: () => void; }
interface ExteriorModalProps { item: ExteriorItem | null; onSave: (itemData: ExteriorItem) => void; onClose: () => void; }

// --- HELPER & MODAL COMPONENTS ---
const SelectableCard: React.FC<SelectableCardProps> = ({ label, selected, onClick, children = null }) => (
    <div className={`selectable-card border-2 rounded-lg p-4 cursor-pointer text-center transition-all duration-200 ${selected ? 'border-[#0F52BA] shadow-lg scale-105' : 'border-gray-200 hover:border-blue-400'}`} onClick={onClick}>
        <h4 className="font-bold text-lg text-[#162733]">{label}</h4>
        {children}
    </div>
);

const RoomModal: React.FC<RoomModalProps> = ({ room, onSave, onClose }) => {
    const initialRoomState: Room = {
        id: Date.now(), type: 'Bedroom', length: '', width: '', ceilingHeight: 8,
        paintWalls: true, paintCeiling: false, paintTrim: false, doors: '', paintDoorsCheck: false,
        closetDoors: '', paintVanity: false, vanityDoors: '', vanityDrawers: '', useMoldResistantPaint: false,
        paintCrownMolding: false, paintFireplaceMantel: false, paintStairwell: false,
        paintCabinets: false, cabinetDoors: '', cabinetDrawers: ''
    };
    const [formData, setFormData] = useState<Room>(room || initialRoomState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };
    
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value as Room['type'];
        setFormData(prev => ({
            ...initialRoomState,
            id: prev.id,
            length: prev.length,
            width: prev.width,
            ceilingHeight: prev.ceilingHeight,
            type: newType,
        }));
    };

    const handleSave = () => {
        if (!formData.length || !formData.width) {
            alert("Please enter valid room dimensions."); return;
        }
        onSave(formData);
    };

    const renderCustomFields = () => {
        switch (formData.type) {
            case 'Bedroom':
                return (
                    <div><label htmlFor="closet-doors" className="block text-sm text-gray-600">Closet Doors (qty)</label><input type="number" id="closet-doors" name="closetDoors" value={formData.closetDoors} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0F52BA] focus:ring-[#0F52BA]" /></div>
                );
            case 'Bathroom':
                return (
                    <div className="space-y-4">
                        <label className="flex items-center"><input type="checkbox" name="useMoldResistantPaint" checked={formData.useMoldResistantPaint} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-[#0F52BA] focus:ring-[#0F52BA] mr-2" />Use Mold-Resistant Paint (Recommended)</label>
                        <label className="flex items-center"><input type="checkbox" name="paintVanity" checked={formData.paintVanity} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-[#0F52BA] focus:ring-[#0F52BA] mr-2" />Paint Vanity</label>
                        {formData.paintVanity && (
                            <div className="grid grid-cols-2 gap-4 pl-6">
                                <div><label htmlFor="vanity-doors" className="block text-sm text-gray-600">Vanity Doors</label><input type="number" id="vanity-doors" name="vanityDoors" value={formData.vanityDoors} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0F52BA] focus:ring-[#0F52BA]" /></div>
                                <div><label htmlFor="vanity-drawers" className="block text-sm text-gray-600">Vanity Drawers</label><input type="number" id="vanity-drawers" name="vanityDrawers" value={formData.vanityDrawers} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0F52BA] focus:ring-[#0F52BA]" /></div>
                            </div>
                        )}
                    </div>
                );
            case 'Living Room':
            case 'Dining Room':
                return (
                    <div className="space-y-2">
                        <label className="flex items-center"><input type="checkbox" name="paintCrownMolding" checked={formData.paintCrownMolding} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-[#0F52BA] focus:ring-[#0F52BA] mr-2" />Paint Crown Molding</label>
                        <label className="flex items-center"><input type="checkbox" name="paintFireplaceMantel" checked={formData.paintFireplaceMantel} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-[#0F52BA] focus:ring-[#0F52BA] mr-2" />Paint Fireplace Mantel</label>
                    </div>
                );
            case 'Hallway':
            case 'Entryway':
                return (
                     <label className="flex items-center"><input type="checkbox" name="paintStairwell" checked={formData.paintStairwell} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-[#0F52BA] focus:ring-[#0F52BA] mr-2" />Includes Stairwell Walls / Risers</label>
                );
            case 'Kitchen':
                return (
                    <div className="space-y-2">
                        <label className="flex items-center"><input type="checkbox" name="paintCabinets" checked={formData.paintCabinets} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-[#0F52BA] focus:ring-[#0F52BA] mr-2" />Refinish Kitchen Cabinets</label>
                        {formData.paintCabinets && (
                            <div className="grid grid-cols-2 gap-4 pl-6">
                                <div><label htmlFor="cabinet-doors" className="block text-sm text-gray-600">Cabinet Doors</label><input type="number" id="cabinet-doors" name="cabinetDoors" value={formData.cabinetDoors} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0F52BA] focus:ring-[#0F52BA]" /></div>
                                <div><label htmlFor="cabinet-drawers" className="block text-sm text-gray-600">Cabinet Drawers</label><input type="number" id="cabinet-drawers" name="cabinetDrawers" value={formData.cabinetDrawers} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0F52BA] focus:ring-[#0F52BA]" /></div>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full animate-fade-in-up max-h-[90vh] overflow-y-auto">
                <h3 className="text-2xl font-serif font-semibold text-[#162733] mb-6">{room ? 'Edit' : 'Add'} Interior Space</h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="room-type" className="block text-sm font-medium text-gray-700">Room Type</label>
                        <select id="room-type" name="type" value={formData.type} onChange={handleTypeChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#0F52BA] focus:border-[#0F52BA]">
                            <option>Bedroom</option><option>Living Room</option><option>Kitchen</option><option>Bathroom</option><option>Hallway</option><option>Entryway</option><option>Office</option><option>Dining Room</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label htmlFor="room-length" className="block text-sm font-medium text-gray-700">Length (ft)</label><input type="number" id="room-length" name="length" value={formData.length} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0F52BA] focus:ring-[#0F52BA]" placeholder="e.g., 12" /></div>
                        <div><label htmlFor="room-width" className="block text-sm font-medium text-gray-700">Width (ft)</label><input type="number" id="room-width" name="width" value={formData.width} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0F52BA] focus:ring-[#0F52BA]" placeholder="e.g., 15" /></div>
                    </div>
                    <div><label htmlFor="ceiling-height" className="block text-sm font-medium text-gray-700">Ceiling Height (ft)</label><select id="ceiling-height" name="ceilingHeight" value={String(formData.ceilingHeight)} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#0F52BA] focus:border-[#0F52BA]"><option value="8">8 ft (Standard)</option><option value="9">9 ft</option><option value="10">10 ft</option><option value="12">12+ ft (High/Vaulted)</option></select></div>
                    <div>
                        <p className="block text-sm font-medium text-gray-700 mb-2">Standard Items to Paint</p>
                        <div className="space-y-2">
                            <label className="flex items-center"><input type="checkbox" name="paintWalls" checked={formData.paintWalls} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-[#0F52BA] focus:ring-[#0F52BA] mr-2" />Walls</label>
                            <label className="flex items-center"><input type="checkbox" name="paintCeiling" checked={formData.paintCeiling} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-[#0F52BA] focus:ring-[#0F52BA] mr-2" />Ceiling</label>
                            <label className="flex items-center"><input type="checkbox" name="paintTrim" checked={formData.paintTrim} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-[#0F52BA] focus:ring-[#0F52BA] mr-2" />Trim & Baseboards</label>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center"><input type="checkbox" name="paintDoorsCheck" checked={formData.paintDoorsCheck} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-[#0F52BA] focus:ring-[#0F52BA] mr-2" />Room Doors</label>
                                <input type="number" name="doors" value={formData.doors} onChange={handleChange} className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-[#0F52BA] focus:ring-[#0F52BA]" placeholder="Qty" disabled={!formData.paintDoorsCheck} />
                            </div>
                        </div>
                    </div>
                     <div className="pt-4 border-t">
                        <p className="block text-sm font-medium text-gray-700 mb-2">Room-Specific Features</p>
                        {renderCustomFields()}
                    </div>
                </div>
                <div className="mt-8 flex justify-end gap-4">
                    <button onClick={onClose} className="btn-secondary font-bold py-2 px-6 rounded-lg">Cancel</button>
                    <button onClick={handleSave} className="btn-primary font-bold py-2 px-6 rounded-lg">Save Space</button>
                </div>
            </div>
        </div>
    );
};

const ExteriorModal: React.FC<ExteriorModalProps> = ({ item, onSave, onClose }) => {
    const [formData, setFormData] = useState<ExteriorItem>(item || {
        id: Date.now(), siding: 'Vinyl', sqft: '', stories: '1', trimLft: '', doors: '',
        shutters: '', windowFrames: '', gutterLft: '', deckSqft: ''
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
    const handleSave = () => {
        if (!formData.sqft) { alert("Please enter a valid surface area."); return; }
        onSave(formData);
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full animate-fade-in-up max-h-[90vh] overflow-y-auto">
                <h3 className="text-2xl font-serif font-semibold text-[#162733] mb-6">{item ? 'Edit' : 'Add'} Exterior Surface</h3>
                <div className="space-y-4">
                    <div><label htmlFor="siding-type" className="block text-sm font-medium text-gray-700">Siding Material</label><select id="siding-type" name="siding" value={formData.siding} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#0F52BA] focus:border-[#0F52BA]"><option>Vinyl</option><option>Wood</option><option>Stucco</option><option>Brick</option><option>Metal</option><option>Fiber Cement</option></select></div>
                    <div className="grid grid-cols-2 gap-4"><div><label htmlFor="surface-sqft" className="block text-sm font-medium text-gray-700">Siding Area (sq ft)</label><input type="number" id="surface-sqft" name="sqft" value={formData.sqft} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0F52BA] focus:ring-[#0F52BA]" placeholder="e.g., 1500" /></div><div><label htmlFor="stories" className="block text-sm font-medium text-gray-700">Number of Stories</label><select id="stories" name="stories" value={formData.stories} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#0F52BA] focus:border-[#0F52BA]"><option value="1">1 Story</option><option value="2">2 Stories</option><option value="3">3 Stories</option></select></div></div>
                    <div><label htmlFor="exterior-trim-lft" className="block text-sm font-medium text-gray-700">Trim (linear ft)</label><input type="number" id="exterior-trim-lft" name="trimLft" value={formData.trimLft} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0F52BA] focus:ring-[#0F52BA]" /></div>
                    <div><label htmlFor="exterior-doors-qty" className="block text-sm font-medium text-gray-700">Exterior Doors (qty)</label><input type="number" id="exterior-doors-qty" name="doors" value={formData.doors} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0F52BA] focus:ring-[#0F52BA]" /></div>
                    <div className="pt-4 border-t">
                        <p className="block text-sm font-medium text-gray-700 mb-2">Additional Exterior Items (Optional)</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label htmlFor="shutters" className="block text-sm text-gray-600">Shutters (qty)</label><input type="number" id="shutters" name="shutters" value={formData.shutters} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0F52BA] focus:ring-[#0F52BA]" /></div>
                            <div><label htmlFor="window-frames" className="block text-sm text-gray-600">Window Frames (qty)</label><input type="number" id="window-frames" name="windowFrames" value={formData.windowFrames} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0F52BA] focus:ring-[#0F52BA]" /></div>
                            <div><label htmlFor="gutter-lft" className="block text-sm text-gray-600">Gutters/Fascia (lft)</label><input type="number" id="gutter-lft" name="gutterLft" value={formData.gutterLft} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0F52BA] focus:ring-[#0F52BA]" /></div>
                            <div><label htmlFor="deck-sqft" className="block text-sm text-gray-600">Deck Staining (sq ft)</label><input type="number" id="deck-sqft" name="deckSqft" value={formData.deckSqft} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0F52BA] focus:ring-[#0F52BA]" /></div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-end gap-4">
                    <button onClick={onClose} className="btn-secondary font-bold py-2 px-6 rounded-lg">Cancel</button>
                    <button onClick={handleSave} className="btn-primary font-bold py-2 px-6 rounded-lg">Save Surface</button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---
export default function App() {
    const [currentStep, setCurrentStep] = useState(1);
    const [postalCode, setPostalCode] = useState('');
    const [postalCodeError, setPostalCodeError] = useState('');
    const [projectType, setProjectType] = useState('');
    const [rooms, setRooms] = useState<Room[]>([]);
    const [exteriorItems, setExteriorItems] = useState<ExteriorItem[]>([]);
    const [selectedPrep, setSelectedPrep] = useState<PrepCondition>('');
    const [selectedPaintQuality, setSelectedPaintQuality] = useState<PaintQuality>('');
    const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
    const [isExteriorModalOpen, setIsExteriorModalOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);
    const [editingExteriorItem, setEditingExteriorItem] = useState<ExteriorItem | null>(null);
    
    const [estimate, setEstimate] = useState({ low: 0, high: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [hasCalculated, setHasCalculated] = useState(false);

    const fetchEstimate = useCallback(async () => {
        if ((rooms.length === 0 && exteriorItems.length === 0) || !selectedPrep || !selectedPaintQuality) {
            setEstimate({ low: 0, high: 0 });
            setHasCalculated(false);
            return;
        }
        setIsLoading(true);
        setHasCalculated(true);
        try {
            const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
            const response = await fetch(`${baseUrl}/api/calculate-estimate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rooms, exteriorItems, projectType, selectedPrep, selectedPaintQuality }),
            });
            if (!response.ok) throw new Error('API Error');
            const data = await response.json();
            setEstimate(data);
        } catch (error) {
            console.error("Failed to fetch estimate:", error);
        }
        setIsLoading(false);
    }, [rooms, exteriorItems, projectType, selectedPrep, selectedPaintQuality]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (currentStep >= 3) {
                 fetchEstimate();
            }
        }, 500);
        return () => clearTimeout(handler);
    }, [fetchEstimate, currentStep]);

    const handleSaveRoom = (roomData: Room) => {
        const index = rooms.findIndex(r => r.id === roomData.id);
        if (index > -1) { setRooms(rooms.map(r => r.id === roomData.id ? roomData : r)); } 
        else { setRooms([...rooms, roomData]); }
        setIsRoomModalOpen(false); setEditingRoom(null);
    };

    const handleSaveExterior = (itemData: ExteriorItem) => {
        const index = exteriorItems.findIndex(i => i.id === itemData.id);
        if (index > -1) { setExteriorItems(exteriorItems.map(i => i.id === itemData.id ? itemData : i)); }
        else { setExteriorItems([...exteriorItems, itemData]); }
        setIsExteriorModalOpen(false); setEditingExteriorItem(null);
    };
    
    const handleStart = () => { if (validatePostalCode(postalCode, true)) { setCurrentStep(2); } };
    const startOver = () => {
        setPostalCode(''); setPostalCodeError(''); setProjectType(''); setRooms([]); setExteriorItems([]);
        setSelectedPrep(''); setSelectedPaintQuality(''); setCurrentStep(1);
    };
    const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (value.length > 3) { value = value.slice(0, 3) + ' ' + value.slice(3); }
        setPostalCode(value.slice(0, 7));
        validatePostalCode(value.slice(0, 7), false);
    };
    const validatePostalCode = (pc: string, isSubmitting: boolean) => {
        const ontarioRegex = /^[KLMNP]/; const gtaRegex = /^[LM]/;
        if (pc.length < 7) { if (isSubmitting) setPostalCodeError("Please enter a valid 6-character postal code."); return false; }
        if (!ontarioRegex.test(pc)) { setPostalCodeError("Sorry, we currently only serve projects in Ontario."); return false; }
        if (!gtaRegex.test(pc)) { setPostalCodeError("Note: Outside GTA. Estimates may be less accurate."); } else { setPostalCodeError(''); }
        return true;
    };
    const formatCurrency = (num: number) => `$${num.toLocaleString()}`;

    // --- RENDER METHODS ---
    const renderStep1 = () => (
        <div className="relative text-center text-white rounded-2xl overflow-hidden flex flex-col items-center justify-center min-h-[500px] -m-6 md:-m-10">
            <div className="absolute inset-0 bg-cover bg-center z-0" style={{backgroundImage: "url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"}}></div>
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
            <div className="relative z-20 p-8">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Your Project, Your Price</h1>
                <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">Get a transparent cost estimate in 90 seconds. This tool provides a realistic price range for a professional, high-quality paint job.</p>
                <div className="max-w-sm mx-auto">
                    <label htmlFor="zip-code" className="block text-sm font-medium text-gray-200 mb-2">Project Postal Code</label>
                    <input type="text" id="zip-code" value={postalCode} onChange={handlePostalCodeChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#0F52BA] focus:border-[#0F52BA] text-gray-800" placeholder="A1A 1A1" />
                    <p className="text-red-400 text-sm mt-1 h-5">{postalCodeError}</p>
                </div>
                <button onClick={handleStart} className="btn-primary font-bold py-3 px-8 rounded-lg mt-8 text-lg shadow-lg transform hover:scale-105 transition-transform duration-200 flex items-center gap-2 mx-auto">
                    Let's Get Started
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </button>
            </div>
        </div>
    );
    
    const renderStep2 = () => (
        <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#162733] mb-8">What are we painting today?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <SelectableCard label="Interior" selected={projectType === 'interior'} onClick={() => setProjectType('interior')} />
                <SelectableCard label="Exterior" selected={projectType === 'exterior'} onClick={() => setProjectType('exterior')} />
                <SelectableCard label="Both" selected={projectType === 'both'} onClick={() => setProjectType('both')} />
            </div>
            <div className="mt-10 flex justify-center gap-4">
                <button onClick={() => setCurrentStep(1)} className="btn-secondary font-bold py-2 px-6 rounded-lg">Back</button>
                <button onClick={() => setCurrentStep(3)} className="btn-primary font-bold py-2 px-6 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!projectType}>Continue</button>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center text-[#162733] mb-6">Build Your Project</h2>
            <div className="md:grid md:grid-cols-12 md:gap-8">
                <div className="md:col-span-7 space-y-8">
                    {(projectType === 'interior' || projectType === 'both') && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Interior Spaces</h3>
                            <div className="space-y-4 mb-6">{rooms.length > 0 ? rooms.map(room => (
                                <div key={room.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                                    <div><p className="font-bold text-lg text-[#162733]">{room.type}</p><p className="text-sm text-gray-600">{room.length}&apos;x{room.width}&apos;</p></div>
                                    <div className="flex gap-2"><button onClick={() => { setEditingRoom(room); setIsRoomModalOpen(true); }} className="text-blue-600 hover:text-blue-800 font-semibold">Edit</button><button onClick={() => setRooms(rooms.filter(r => r.id !== room.id))} className="text-red-600 hover:text-red-800 font-semibold">Delete</button></div>
                                </div>
                            )) : <p className="text-center text-gray-500 py-4">No spaces added yet.</p>}</div>
                            <button onClick={() => { setEditingRoom(null); setIsRoomModalOpen(true); }} className="w-full btn-secondary font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>Add Interior Space</button>
                        </div>
                    )}
                     {(projectType === 'exterior' || projectType === 'both') && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Exterior Surfaces</h3>
                            <div className="space-y-4 mb-6">{exteriorItems.length > 0 ? exteriorItems.map(item => (
                                <div key={item.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                                    <div><p className="font-bold text-lg text-[#162733]">{item.sqft} sq ft {item.siding}</p><p className="text-sm text-gray-600">{item.stories}-story</p></div>
                                    <div className="flex gap-2"><button onClick={() => { setEditingExteriorItem(item); setIsExteriorModalOpen(true); }} className="text-blue-600 hover:text-blue-800 font-semibold">Edit</button><button onClick={() => setExteriorItems(exteriorItems.filter(i => i.id !== item.id))} className="text-red-600 hover:text-red-800 font-semibold">Delete</button></div>
                                </div>
                            )) : <p className="text-center text-gray-500 py-4">No surfaces added yet.</p>}</div>
                            <button onClick={() => { setEditingExteriorItem(null); setIsExteriorModalOpen(true); }} className="w-full btn-secondary font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>Add Exterior Surface</button>
                        </div>
                    )}
                </div>
                <div className="md:col-span-5 mt-8 md:mt-0">
                    <div className="bg-[#f9f6f2] p-6 rounded-xl sticky top-8">
                        <h3 className="font-serif text-xl font-semibold text-[#162733] mb-4">Estimated Range</h3>
                        <div className="text-3xl md:text-4xl font-bold text-[#162733] mb-4 min-h-[50px] flex items-center justify-center">
                            {isLoading ? (
                                <span className="text-2xl text-gray-400 animate-pulse">Calculating...</span>
                            ) : hasCalculated ? (
                                <span>{formatCurrency(estimate.low)} - {formatCurrency(estimate.high)}</span>
                            ) : (
                                <span className="text-lg text-gray-500 text-center">Price range appears after final step</span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 mb-6">This price will update in real-time.</p>
                        <button onClick={() => setCurrentStep(4)} className="w-full btn-primary font-bold py-3 px-6 rounded-lg shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={(rooms.length === 0 && exteriorItems.length === 0)}>Next: Prep & Quality</button>
                        <button onClick={() => setCurrentStep(2)} className="w-full btn-secondary text-center font-bold py-2 px-6 rounded-lg mt-4">Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
     
     const renderStep4 = () => (
        <div>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center text-[#162733] mb-8">The Details That Matter</h2>
            <div className="mb-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">How much prep work is needed?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                    <SelectableCard label="Good Condition" selected={selectedPrep === 'good'} onClick={() => setSelectedPrep('good')}><p className="text-sm text-gray-600 mt-1">Minor prep. Surfaces have few, if any, holes to fill.</p></SelectableCard>
                    <SelectableCard label="Fair Condition" selected={selectedPrep === 'fair'} onClick={() => setSelectedPrep('fair')}><p className="text-sm text-gray-600 mt-1">Moderate prep. Some scuffs, scratches, and minor patching needed.</p></SelectableCard>
                    <SelectableCard label="Poor Condition" selected={selectedPrep === 'poor'} onClick={() => setSelectedPrep('poor')}><p className="text-sm text-gray-600 mt-1">Extensive prep. Significant repairs or wallpaper removal needed.</p></SelectableCard>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">What quality of paint do you have in mind?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                    <SelectableCard label="Good (Builder)" selected={selectedPaintQuality === 'good'} onClick={() => setSelectedPaintQuality('good')}><p className="text-sm text-gray-600 mt-1">Meets basic needs. Good for low-traffic areas.</p></SelectableCard>
                    <SelectableCard label="Better (Professional)" selected={selectedPaintQuality === 'better'} onClick={() => setSelectedPaintQuality('better')}><p className="text-sm text-gray-600 mt-1">Our most popular choice. Excellent durability and finish.</p></SelectableCard>
                    <SelectableCard label="Best (Premium)" selected={selectedPaintQuality === 'best'} onClick={() => setSelectedPaintQuality('best')}><p className="text-sm text-gray-600 mt-1">Superior longevity, richer color, and a truly luxurious finish. (e.g., BM Aura, SW Emerald)</p></SelectableCard>
                </div>
            </div>
            <div className="text-center mt-10 flex justify-center gap-4">
                <button onClick={() => setCurrentStep(3)} className="btn-secondary font-bold py-3 px-8 rounded-lg text-lg">Back</button>
                <button onClick={() => setCurrentStep(5)} className="btn-primary font-bold py-3 px-8 rounded-lg text-lg shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!selectedPrep || !selectedPaintQuality}>See My Estimate</button>
            </div>
        </div>
    );

     const renderStep5 = () => (
        <div className="text-center">
            <h2 className="text-2xl font-serif text-[#162733] mb-2">Your Estimated Project Range</h2>
            <div className="text-4xl md:text-6xl font-bold text-[#0F52BA] my-4 min-h-[72px] flex items-center justify-center">
                {hasCalculated && !isLoading ? (
                    <span>{formatCurrency(estimate.low)} - {formatCurrency(estimate.high)}</span>
                ) : (
                    <span className="animate-pulse">Calculating...</span>
                )}
            </div>
            <div className="text-left max-w-2xl mx-auto">
                <h3 className="text-xl font-serif font-semibold text-[#162733] mb-4">Understanding Your Estimate</h3>
                <p className="text-gray-600 mb-4">Our estimates assume a professional, insured crew that properly prepares all surfaces (the single most important factor for a lasting paint job) and uses high-quality materials.</p>
            </div>
            <div className="mt-8 flex flex-col items-center gap-4">
                <button className="btn-primary font-bold py-4 px-10 rounded-lg text-xl shadow-xl">Schedule a Free, Exact Quote</button>
                <div className="flex items-center gap-4">
                    <button onClick={() => setCurrentStep(4)} className="btn-secondary font-bold py-2 px-6 rounded-lg">Back</button>
                    <button onClick={startOver} className="btn-secondary font-bold py-2 px-6 rounded-lg">Start Over</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-[#f0f2f5] p-4 md:p-6 min-h-screen flex items-center justify-center font-sans">
            <style>{`
                .btn-primary { background-color: #0F52BA; color: #ffffff; }
                .btn-primary:hover { background-color: #0c4194; }
                .btn-secondary { background-color: #e0e7ff; color: #162733; }
                .btn-secondary:hover { background-color: #c7d2fe; }
                @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Inter:wght@400;700&display=swap');
                .font-serif { font-family: 'Lora', serif; }
                .font-sans { font-family: 'Inter', sans-serif; }
                @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
            `}</style>
            <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl">
                <div className="relative app-container p-6 md:p-10">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                    {currentStep === 4 && renderStep4()}
                    {currentStep === 5 && renderStep5()}
                </div>
            </div>
            {isRoomModalOpen && <RoomModal room={editingRoom} onSave={handleSaveRoom} onClose={() => { setIsRoomModalOpen(false); setEditingRoom(null); }} />}
            {isExteriorModalOpen && <ExteriorModal item={editingExteriorItem} onSave={handleSaveExterior} onClose={() => { setIsExteriorModalOpen(false); setEditingExteriorItem(null); }} />}
        </div>
    );
}
