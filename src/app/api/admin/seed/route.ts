import { NextResponse } from 'next/server';

export async function GET() {
    const adminToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;
    const domain = process.env.SHOPIFY_STORE_DOMAIN || 'aura-threads-jq259sks.myshopify.com';
    
    const productsToSeed = [
        {
            title: "Apex Heavyweight Hoodie",
            body_html: "<strong>Aura Apex Signature.</strong> 500GSM heavyweight cotton. Engineered for the modern voyageur. Tech-noir finish.",
            vendor: "Aura Apex",
            product_type: "Clothing",
            status: "active",
            variants: [{ price: "125.00", inventory_management: null }]
        },
        {
            title: "Sovereign Oversized Tee",
            body_html: "High-fidelity liquid cotton. Relaxed silhouette for sovereign comfort. Minimalist node branding.",
            vendor: "Aura Apex",
            product_type: "Clothing",
            status: "active",
            variants: [{ price: "65.00", inventory_management: null }]
        },
        {
            title: "Obsidian Tech Joggers",
            body_html: "Water-resistant technical fabric. Multi-node utility storage system. Engineered for mobility.",
            vendor: "Aura Apex",
            product_type: "Clothing",
            status: "active",
            variants: [{ price: "145.00", inventory_management: null }]
        }
    ];

    const results = [];

    // 1. Fetch and Archive Snowboards via REST
    try {
        const listRes = await fetch(`https://${domain}/admin/api/2024-04/products.json`, {
            headers: { 'X-Shopify-Access-Token': adminToken! }
        });
        const listData = await listRes.json();
        const existing = listData.products || [];
        
        for (const p of existing) {
            if (p.product_type === 'Snowboard' || p.product_type === '') {
                await fetch(`https://${domain}/admin/api/2024-04/products/${p.id}.json`, {
                    method: 'PUT',
                    headers: { 
                        'X-Shopify-Access-Token': adminToken!,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ product: { id: p.id, status: 'archived' } })
                });
            }
        }
    } catch (e) {}

    // 2. Inject Clothing via REST
    for (const p of productsToSeed) {
        try {
            const res = await fetch(`https://${domain}/admin/api/2024-04/products.json`, {
                method: 'POST',
                headers: {
                    'X-Shopify-Access-Token': adminToken!,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ product: p })
            });
            const data = await res.json();
            results.push(data);
        } catch (e: any) {
            results.push({ error: e.message });
        }
    }

    return NextResponse.json({
        message: "Apex Injection Sequence v3 (REST-Engine) Complete",
        results
    });
}
