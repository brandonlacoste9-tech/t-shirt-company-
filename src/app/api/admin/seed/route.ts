import { NextResponse } from 'next/server';

export async function GET() {
    const adminToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;
    const domain = process.env.SHOPIFY_STORE_DOMAIN || 'aura-threads-jq259sks.myshopify.com';
    
    const productsToSeed = [
        {
            title: "Apex Heavyweight Hoodie - Stone",
            body_html: "<strong>Aura Apex Signature.</strong> 500GSM heavyweight cotton. Engineered for the modern voyageur. Stone neutral finish.",
            vendor: "Aura Threads",
            product_type: "Hoodie",
            status: "active",
            variants: [{ price: "125.00", inventory_management: null, sku: "AT-HOD-STN" }],
            images: [{ src: "https://cdn.shopify.com/s/files/1/0861/2236/5243/files/hoodie-stone.jpg?v=1714890000" }]
        },
        {
            title: "Apex Heavyweight Hoodie - Obsidian",
            body_html: "<strong>Aura Apex Signature.</strong> 500GSM heavyweight cotton. Deep obsidian finish with reinforced stitching.",
            vendor: "Aura Threads",
            product_type: "Hoodie",
            status: "active",
            variants: [{ price: "125.00", inventory_management: null, sku: "AT-HOD-OBS" }],
            images: [{ src: "https://cdn.shopify.com/s/files/1/0861/2236/5243/files/hoodie-obsidian.jpg?v=1714890001" }]
        },
        {
            title: "Sovereign Oversized Tee - Bone",
            body_html: "High-fidelity liquid cotton. Relaxed silhouette for sovereign comfort. Bone white finish.",
            vendor: "Aura Threads",
            product_type: "T-Shirt",
            status: "active",
            variants: [{ price: "65.00", inventory_management: null, sku: "AT-TEE-BONE" }],
            images: [{ src: "https://cdn.shopify.com/s/files/1/0861/2236/5243/files/tee-bone.jpg?v=1714890002" }]
        },
        {
            title: "Sovereign Oversized Tee - Slate",
            body_html: "High-fidelity liquid cotton. Slate grey finish. Minimalist node branding.",
            vendor: "Aura Threads",
            product_type: "T-Shirt",
            status: "active",
            variants: [{ price: "65.00", inventory_management: null, sku: "AT-TEE-SLT" }],
            images: [{ src: "https://cdn.shopify.com/s/files/1/0861/2236/5243/files/tee-slate.jpg?v=1714890003" }]
        },
        {
            title: "Obsidian Tech Joggers",
            body_html: "Water-resistant technical fabric. Multi-node utility storage system. Engineered for mobility.",
            vendor: "Aura Threads",
            product_type: "Pants",
            status: "active",
            variants: [{ price: "145.00", inventory_management: null, sku: "AT-PNT-OBS" }],
            images: [{ src: "https://cdn.shopify.com/s/files/1/0861/2236/5243/files/joggers-obsidian.jpg?v=1714890004" }]
        },
        {
            title: "Desert Cargo Trousers",
            body_html: "Reinforced canvas construction. Articulated knees. Sandstone finish for desert operations.",
            vendor: "Aura Threads",
            product_type: "Pants",
            status: "active",
            variants: [{ price: "155.00", inventory_management: null, sku: "AT-PNT-DSRT" }],
            images: [{ src: "https://cdn.shopify.com/s/files/1/0861/2236/5243/files/cargo-sand.jpg?v=1714890005" }]
        },
        {
            title: "Void Bomber Jacket",
            body_html: "Insulated nylon shell. Emergency orange lining. Utility sleeve node. Pitch black finish.",
            vendor: "Aura Threads",
            product_type: "Jacket",
            status: "active",
            variants: [{ price: "210.00", inventory_management: null, sku: "AT-JKT-VOID" }],
            images: [{ src: "https://cdn.shopify.com/s/files/1/0861/2236/5243/files/bomber-black.jpg?v=1714890006" }]
        },
        {
            title: "Lunar Puffer Gilet",
            body_html: "High-loft down insulation. Reflective lunar finish. Modular layering component.",
            vendor: "Aura Threads",
            product_type: "Jacket",
            status: "active",
            variants: [{ price: "185.00", inventory_management: null, sku: "AT-JKT-LNR" }],
            images: [{ src: "https://cdn.shopify.com/s/files/1/0861/2236/5243/files/gilet-silver.jpg?v=1714890007" }]
        },
        {
            title: "Node 5-Panel Cap",
            body_html: "Ripstop nylon construction. Adjustable tech-strap. Tonal embroidery.",
            vendor: "Aura Threads",
            product_type: "Accessory",
            status: "active",
            variants: [{ price: "45.00", inventory_management: null, sku: "AT-ACC-CAP" }],
            images: [{ src: "https://cdn.shopify.com/s/files/1/0861/2236/5243/files/cap-black.jpg?v=1714890008" }]
        },
        {
            title: "Aura Utility Tote",
            body_html: "Heavyweight ballistic nylon. Industrial webbing handles. 20L capacity.",
            vendor: "Aura Threads",
            product_type: "Accessory",
            status: "active",
            variants: [{ price: "85.00", inventory_management: null, sku: "AT-ACC-TOTE" }],
            images: [{ src: "https://cdn.shopify.com/s/files/1/0861/2236/5243/files/tote-black.jpg?v=1714890009" }]
        },
        {
            title: "Essential Tee - Carbon",
            body_html: "Lightweight breathable cotton. Carbon black finish. Everyday essential.",
            vendor: "Aura Threads",
            product_type: "T-Shirt",
            status: "active",
            variants: [{ price: "45.00", inventory_management: null, sku: "AT-TEE-CRB" }],
            images: [{ src: "https://cdn.shopify.com/s/files/1/0861/2236/5243/files/tee-carbon.jpg?v=1714890010" }]
        },
        {
            title: "Essential Tee - Mist",
            body_html: "Lightweight breathable cotton. Mist grey finish. Everyday essential.",
            vendor: "Aura Threads",
            product_type: "T-Shirt",
            status: "active",
            variants: [{ price: "45.00", inventory_management: null, sku: "AT-TEE-MST" }],
            images: [{ src: "https://cdn.shopify.com/s/files/1/0861/2236/5243/files/tee-mist.jpg?v=1714890011" }]
        },
        {
            title: "Vortex Windbreaker",
            body_html: "Ultra-lightweight packable windbreaker. Wind-resistant node tech.",
            vendor: "Aura Threads",
            product_type: "Jacket",
            status: "active",
            variants: [{ price: "135.00", inventory_management: null, sku: "AT-JKT-VTX" }],
            images: [{ src: "https://cdn.shopify.com/s/files/1/0861/2236/5243/files/windbreaker-grey.jpg?v=1714890012" }]
        },
        {
            title: "Thermal Ribbed Beanie",
            body_html: "Merino wool blend. Ribbed texture. Aura node woven label.",
            vendor: "Aura Threads",
            product_type: "Accessory",
            status: "active",
            variants: [{ price: "35.00", inventory_management: null, sku: "AT-ACC-BN" }],
            images: [{ src: "https://cdn.shopify.com/s/files/1/0861/2236/5243/files/beanie-stone.jpg?v=1714890013" }]
        },
        {
            title: "Tech-Knit Socks (3-Pack)",
            body_html: "Moisture-wicking tech-knit. Compression arch support. Bone/Stone/Obsidian colors.",
            vendor: "Aura Threads",
            product_type: "Accessory",
            status: "active",
            variants: [{ price: "28.00", inventory_management: null, sku: "AT-ACC-SK" }],
            images: [{ src: "https://cdn.shopify.com/s/files/1/0861/2236/5243/files/socks-pack.jpg?v=1714890014" }]
        }
    ];

    const results = [];

    // 1. Fetch and Archive non-Aura products via REST
    try {
        const listRes = await fetch(`https://${domain}/admin/api/2024-04/products.json`, {
            headers: { 'X-Shopify-Access-Token': adminToken! }
        });
        const listData = await listRes.json();
        const existing = listData.products || [];
        
        for (const p of existing) {
            if (p.vendor !== 'Aura Threads') {
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

    // 2. Inject Aura Products via REST
    for (const p of productsToSeed) {
        try {
            // Check if product already exists to avoid duplicates
            const checkRes = await fetch(`https://${domain}/admin/api/2024-04/products.json?title=${encodeURIComponent(p.title)}`, {
                headers: { 'X-Shopify-Access-Token': adminToken! }
            });
            const checkData = await checkRes.json();
            
            if (checkData.products && checkData.products.length > 0) {
                results.push({ title: p.title, status: 'exists' });
                continue;
            }

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
        message: "Aura Threads Expansion Sequence Complete",
        count: results.length,
        results
    });
}
