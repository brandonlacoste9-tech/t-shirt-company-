import { NextResponse } from 'next/server';
import { shopifyAdminFetch, getAdminProductsQuery } from '@/lib/shopify';

export async function GET() {
    try {
        const response = await shopifyAdminFetch({
            query: getAdminProductsQuery
        });

        const edges = response.body?.data?.products?.edges || [];

        if (edges.length === 0) {
            // Return a full showroom of high-fidelity Aura Apex garments
            return NextResponse.json([
                {
                    id: "aura-apex-1",
                    name: "Apex Heavyweight Hoodie",
                    price: 125.00,
                    image: "/aura_minimalist_hoodie_white_1777950947179.png",
                    description: "Signature heavyweight cotton. Engineered for the modern voyageur. Tech-noir finish.",
                    brand: "Aura Apex",
                    productCode: "APEX-H01",
                    isNew: true
                },
                {
                    id: "aura-apex-2",
                    name: "Sovereign Oversized Tee",
                    price: 65.00,
                    image: "/assets/p1.png",
                    description: "High-fidelity liquid cotton. Relaxed silhouette for sovereign comfort.",
                    brand: "Aura Apex",
                    productCode: "APEX-T01"
                },
                {
                    id: "aura-apex-3",
                    name: "Obsidian Tech Joggers",
                    price: 145.00,
                    image: "/assets/p2.png",
                    description: "Water-resistant technical fabric. Multi-node utility storage system.",
                    brand: "Aura Apex",
                    productCode: "APEX-J01"
                },
                {
                    id: "aura-apex-4",
                    name: "Imperial Node Cap",
                    price: 45.00,
                    image: "/assets/lifestyle-1.png",
                    description: "Adjustable technical headwear with embroidered Aura sigil.",
                    brand: "Aura Apex",
                    productCode: "APEX-C01"
                }
            ]);
        }

        const products = edges.map((edge: any) => {
            const product = edge.node;
            return {
                id: product.id,
                name: product.title,
                price: parseFloat(product.variants.edges[0]?.node.price || "0"),
                image: product.images.edges[0]?.node.url || "/aura_minimalist_hoodie_white_1777950947179.png",
                description: product.description,
                brand: "Aura Threads",
                productCode: product.id.split('/').pop(),
                handle: product.handle,
                status: product.status,
                type: product.productType
            };
        }).filter((p: any) => p.type === 'Clothing');

        if (products.length === 0) {
            // Return a full showroom of high-fidelity Aura Apex garments if no clothing is found
            return NextResponse.json([
                {
                    id: "aura-apex-1",
                    name: "Apex Heavyweight Hoodie",
                    price: 125.00,
                    image: "/aura_minimalist_hoodie_white_1777950947179.png",
                    description: "Signature heavyweight cotton. Engineered for the modern voyageur. Tech-noir finish.",
                    brand: "Aura Apex",
                    productCode: "APEX-H01",
                    handle: "apex-hoodie",
                    isNew: true
                },
                {
                    id: "aura-apex-2",
                    name: "Sovereign Oversized Tee",
                    price: 65.00,
                    image: "/assets/p1.png",
                    description: "High-fidelity liquid cotton. Relaxed silhouette for sovereign comfort. Minimalist node branding.",
                    brand: "Aura Apex",
                    productCode: "APEX-T01",
                    handle: "sovereign-tee"
                },
                {
                    id: "aura-apex-3",
                    name: "Obsidian Tech Joggers",
                    price: 145.00,
                    image: "/assets/p2.png",
                    description: "Water-resistant technical fabric. Multi-node utility storage system. Engineered for mobility.",
                    brand: "Aura Apex",
                    productCode: "APEX-J01",
                    handle: "obsidian-joggers"
                }
            ]);
        }

        return NextResponse.json(products);
    } catch (error: any) {
        console.error('🔴 Admin Fetch Failed:', error.message);
        return NextResponse.json({ error: 'Failed to sync with Shopify Admin' }, { status: 500 });
    }
}
