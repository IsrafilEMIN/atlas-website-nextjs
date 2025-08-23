import type { NextApiRequest, NextApiResponse } from 'next';

// --- TYPE DEFINITIONS for the request body ---
// These should mirror the types on your front-end for consistency.
interface Room {
    id: number;
    type: string;
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

// --- SECURE PRICING CONFIGURATION (HIDDEN ON THE SERVER) ---
const PRICING = {
    PROFIT_MARKUP: 2.0, PAINTER_BURDENED_HOURLY_COST: 40.00,
    PAINT_COST_PER_GALLON: { good: 30, better: 50, best: 65 },
    SUPPLIES_PERCENTAGE: 0.15, PAINTING_SQFT_PER_HOUR: 175,
    BASE_PREP_HOURS_PER_ROOM: 2.0, BASE_PREP_HOURS_EXTERIOR: 4.0,
    COST_PER_DOOR: 75.00, COST_PER_EXTERIOR_DOOR: 125.00,
    COST_PER_CABINET_PIECE: 100.00, COST_PER_CLOSET_DOOR: 40.00,
    COST_PER_VANITY_PIECE: 60.00, COST_MOLD_RESISTANT_PAINT_UPCHARGE: 75.00,
    COST_CROWN_MOLDING: 250.00, COST_FIREPLACE_MANTEL: 200.00, COST_STAIRWELL: 450.00,
    COST_PER_SHUTTER: 25.00, COST_PER_WINDOW_FRAME: 40.00,
    COST_GUTTERS_PER_LFT: 3.00, COST_DECK_STAIN_PER_SQFT: 2.50,
    PREP_CONDITION_MULTIPLIERS: { good: 1.0, fair: 1.5, poor: 2.5 },
    HIGH_CEILING_MULTIPLIER: 1.20,
    SIDING_LABOR_MULTIPLIERS: { 'Vinyl': 1.0, 'Wood': 1.4, 'Stucco': 1.6, 'Brick': 1.7, 'Metal': 1.1, 'Fiber Cement': 1.1 },
    STORY_MULTIPLIERS: { '1': 1.0, '2': 1.25, '3': 1.5 },
    COVERAGE_PER_GALLON: 350, RANGE_MULTIPLIER_LOW: 0.95, RANGE_MULTIPLIER_HIGH: 1.20,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { rooms, exteriorItems, projectType, selectedPrep, selectedPaintQuality } = req.body;

        if ((!rooms || rooms.length === 0) && (!exteriorItems || exteriorItems.length === 0)) {
             return res.status(200).json({ low: 0, high: 0 });
        }

        let totalPaintableSqFt = 0, totalPaintingHours = 0, totalPrepHours = 0, addonCOGS = 0;
        const prepMultiplier = PRICING.PREP_CONDITION_MULTIPLIERS[selectedPrep as keyof typeof PRICING.PREP_CONDITION_MULTIPLIERS] || 1.0;

        if (projectType === 'interior' || projectType === 'both') {
            rooms.forEach((room: Room) => { // FIX: Use the defined Room type instead of 'any'
                const length = parseFloat(String(room.length)) || 0;
                const width = parseFloat(String(room.width)) || 0;
                const ceilingHeight = parseFloat(String(room.ceilingHeight)) || 8;
                
                let roomSqFt = 0;
                const ceilingMultiplier = ceilingHeight > 10 ? PRICING.HIGH_CEILING_MULTIPLIER : 1;

                if (room.paintWalls) roomSqFt += (length + width) * 2 * ceilingHeight;
                if (room.paintCeiling) roomSqFt += length * width;
                if (room.paintTrim) totalPaintingHours += ((length + width) * 2) / 40;

                totalPaintableSqFt += roomSqFt;
                totalPaintingHours += (roomSqFt * 2 * ceilingMultiplier) / PRICING.PAINTING_SQFT_PER_HOUR;
                totalPrepHours += PRICING.BASE_PREP_HOURS_PER_ROOM;

                // --- COMPLETED: Full interior addon calculation ---
                if (room.paintDoorsCheck) addonCOGS += (parseFloat(String(room.doors)) || 0) * PRICING.COST_PER_DOOR;
                if (room.closetDoors) addonCOGS += (parseFloat(String(room.closetDoors)) || 0) * PRICING.COST_PER_CLOSET_DOOR;
                if (room.useMoldResistantPaint) addonCOGS += PRICING.COST_MOLD_RESISTANT_PAINT_UPCHARGE;
                if (room.paintVanity) {
                    const vanityCount = (parseFloat(String(room.vanityDoors)) || 0) + (parseFloat(String(room.vanityDrawers)) || 0);
                    addonCOGS += vanityCount * PRICING.COST_PER_VANITY_PIECE;
                }
                if (room.paintCrownMolding) addonCOGS += PRICING.COST_CROWN_MOLDING;
                if (room.paintFireplaceMantel) addonCOGS += PRICING.COST_FIREPLACE_MANTEL;
                if (room.paintStairwell) addonCOGS += PRICING.COST_STAIRWELL;
                if (room.paintCabinets) {
                    const cabinetCount = (parseFloat(String(room.cabinetDoors)) || 0) + (parseFloat(String(room.cabinetDrawers)) || 0);
                    addonCOGS += cabinetCount * PRICING.COST_PER_CABINET_PIECE;
                }
            });
        }
        
        if (projectType === 'exterior' || projectType === 'both') {
            exteriorItems.forEach((item: ExteriorItem) => { // FIX: Use the defined ExteriorItem type
                const sqft = parseFloat(String(item.sqft)) || 0;
                const sidingMultiplier = PRICING.SIDING_LABOR_MULTIPLIERS[item.siding as keyof typeof PRICING.SIDING_LABOR_MULTIPLIERS] || 1;
                const storyMultiplier = PRICING.STORY_MULTIPLIERS[item.stories as keyof typeof PRICING.STORY_MULTIPLIERS] || 1;
                
                totalPaintableSqFt += sqft;
                totalPaintingHours += (sqft * 2 * sidingMultiplier * storyMultiplier) / PRICING.PAINTING_SQFT_PER_HOUR;
                totalPrepHours += PRICING.BASE_PREP_HOURS_EXTERIOR;

                // --- COMPLETED: Full exterior addon calculation ---
                if (item.trimLft) totalPaintingHours += (parseFloat(String(item.trimLft)) || 0) / 30;
                if (item.doors) addonCOGS += (parseFloat(String(item.doors)) || 0) * PRICING.COST_PER_EXTERIOR_DOOR;
                if (item.shutters) addonCOGS += (parseFloat(String(item.shutters)) || 0) * PRICING.COST_PER_SHUTTER;
                if (item.windowFrames) addonCOGS += (parseFloat(String(item.windowFrames)) || 0) * PRICING.COST_PER_WINDOW_FRAME;
                if (item.gutterLft) addonCOGS += (parseFloat(String(item.gutterLft)) || 0) * PRICING.COST_GUTTERS_PER_LFT;
                if (item.deckSqft) addonCOGS += (parseFloat(String(item.deckSqft)) || 0) * PRICING.COST_DECK_STAIN_PER_SQFT;
            });
        }
        
        const finalPrepHours = totalPrepHours * prepMultiplier;
        const totalLaborHours = totalPaintingHours + finalPrepHours;
        const laborCOGS = totalLaborHours * PRICING.PAINTER_BURDENED_HOURLY_COST;
        
        let materialCOGS = 0;
        if (selectedPaintQuality) {
            const paintCostPerGallon = PRICING.PAINT_COST_PER_GALLON[selectedPaintQuality as keyof typeof PRICING.PAINT_COST_PER_GALLON];
            const gallonsNeeded = Math.ceil((totalPaintableSqFt * 2) / PRICING.COVERAGE_PER_GALLON);
            const totalPaintCost = gallonsNeeded * paintCostPerGallon;
            const suppliesCost = totalPaintCost * PRICING.SUPPLIES_PERCENTAGE;
            materialCOGS = totalPaintCost + suppliesCost;
        }

        const totalCOGS = laborCOGS + materialCOGS + addonCOGS;
        const price = totalCOGS * PRICING.PROFIT_MARKUP;
        const roundTo = (num: number, nearest: number) => Math.round(num / nearest) * nearest;

        const result = {
            low: roundTo(price * PRICING.RANGE_MULTIPLIER_LOW, 25),
            high: roundTo(price * PRICING.RANGE_MULTIPLIER_HIGH, 25),
        };

        res.status(200).json(result);

    } catch (error) {
        // FIX: Log the actual error object to the console for better debugging.
        console.error('An error occurred during calculation:', error);
        res.status(500).json({ message: 'An error occurred during calculation.' });
    }
}
