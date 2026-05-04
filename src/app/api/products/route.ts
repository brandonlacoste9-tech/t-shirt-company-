import { NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Apliiq Auth Generator (Reused for Catalog Fetch)
 */
function generateApliiqAuth(appId: string, secret: string) {
    const rts = Math.floor(Date.now() / 1000).toString();
    const state = crypto.randomBytes(8).toString('hex');
    const payload = appId + rts + state; // No body for GET requests
    const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64');
    return `${rts}:${sig}:${appId}:${state}`;
}

export async function GET() {
    const APLIIQ_APP_ID = process.env.APLIIQ_APP_ID;
    const APLIIQ_SECRET = process.env.APLIIQ_SECRET;

    // Fallback to our curated list if keys aren't configured yet
    if (!APLIIQ_APP_ID || !APLIIQ_SECRET) {
        return NextResponse.json([
            {
                id: "apliiq-3719",
                name: "Aura Premium Hoodie",
                price: 65.00,
                image: "/assets/apliiq-hoodie.png",
                description: "Premium Bella+Canvas Sponge Fleece. Ultra-soft, streetwear fit.",
                brand: "Bella+Canvas",
                sku: "3719-AURA",
                productCode: "3719",
                variants: ["S", "M", "L", "XL", "2XL"]
            }
        ]);
    }

    try {
        const header = generateApliiqAuth(APLIIQ_APP_ID, APLIIQ_SECRET);
        
        // Fetch Saved Designs from Apliiq
        const response = await fetch('https://devconnector.apliiq.com/v1/designs', {
            headers: {
                'x-apliiq-auth': header
            }
        });

        const data = await response.json();

        // Transform Apliiq Data to our Aura UI format
        const syncProducts = data.map((design: any) => ({
            id: design.id,
            name: design.name,
            price: (design.cost || 20) + 15, // Adding a $15 brand margin
            image: design.preview_url || '/assets/apliiq-hoodie.png',
            description: design.product_name || 'Premium Aura threads, designed for the journey.',
            brand: design.brand || 'Aura Threads',
            sku: design.sku,
            productCode: design.product_id,
            variants: ["S", "M", "L", "XL", "2XL"]
        }));

        return NextResponse.json(syncProducts);
    } catch (error) {
        console.error('🔴 Catalog Sync Failed:', error);
        return NextResponse.json({ error: 'Failed to sync catalog' }, { status: 500 });
    }
}
