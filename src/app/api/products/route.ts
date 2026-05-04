import { NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Apliiq Auth Generator (Reused for Catalog Fetch)
 */
function generateApliiqAuth(appId: string, secret: string) {
    const rts = Math.floor(Date.now() / 1000).toString();
    const state = crypto.randomBytes(8).toString('hex');
    const payload = appId + rts + state;
    const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64');
    return `${rts}:${sig}:${appId}:${state}`;
}

export async function GET() {
    const APLIIQ_APP_ID = process.env.APLIIQ_APP_ID;
    const APLIIQ_SECRET = process.env.APLIIQ_SECRET;

    // Fallback if keys aren't configured
    if (!APLIIQ_APP_ID || !APLIIQ_SECRET) {
        return NextResponse.json([
            {
                id: "3719",
                name: "Bella+Canvas 3719 Hoodie",
                price: 45.00,
                image: "/assets/apliiq-hoodie.png",
                description: "Premium Sponge Fleece. Curated for the Modern Voyageur.",
                brand: "Bella+Canvas",
                productCode: "3719",
                variants: ["S", "M", "L", "XL"]
            },
            {
                id: "EC1000",
                name: "Econscious Organic Tee",
                price: 28.00,
                image: "/assets/apliiq-organic.png",
                description: "100% Organic Cotton. Sustainable & Soft.",
                brand: "Econscious",
                productCode: "EC1000",
                variants: ["S", "M", "L", "XL"]
            }
        ]);
    }

    try {
        const header = generateApliiqAuth(APLIIQ_APP_ID, APLIIQ_SECRET);
        
        // Fetch COMPLETE CATALOG from Apliiq
        const response = await fetch('https://devconnector.apliiq.com/v1/catalog', {
            headers: { 'x-apliiq-auth': header }
        });

        const data = await response.json();

        // Transform the massive Apliiq Catalog into the Aura UI format
        // We filter for "Apparel" to ensure a clean storefront
        const apparelCatalog = data
            .filter((item: any) => item.category === 'Apparel' || item.category === 'Headwear')
            .map((item: any) => ({
                id: item.id.toString(),
                name: item.name,
                price: (item.cost || 15) + 15, // $15 brand margin
                image: item.image_url || '/assets/apliiq-hoodie.png',
                description: `${item.brand} ${item.name}. Premium blank ready for your Aura design.`,
                brand: item.brand || 'Aura Selection',
                productCode: item.product_id || item.id.toString(),
                variants: item.available_sizes || ["S", "M", "L", "XL"]
            }));

        return NextResponse.json(apparelCatalog.slice(0, 24)); // Showing top 24 for optimal performance
    } catch (error) {
        console.error('🔴 Global Catalog Sync Failed:', error);
        return NextResponse.json({ error: 'Failed to sync global catalog' }, { status: 500 });
    }
}
