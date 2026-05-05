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
                    title: "Apex Heavyweight Hoodie",
                    handle: "apex-hoodie",
                    description: "Signature heavyweight cotton. Engineered for the modern voyageur. Tech-noir finish.",
                    images: { edges: [{ node: { url: "/aura_minimalist_hoodie_white_1777950947179.png" } }] },
                    priceRange: { minVariantPrice: { amount: "125.00", currencyCode: "AUD" } }
                },
                {
                    id: "aura-apex-2",
                    title: "Sovereign Oversized Tee",
                    handle: "sovereign-tee",
                    description: "High-fidelity liquid cotton. Relaxed silhouette for sovereign comfort.",
                    images: { edges: [{ node: { url: "/assets/p1.png" } }] },
                    priceRange: { minVariantPrice: { amount: "65.00", currencyCode: "AUD" } }
                }
            ]);
        }

        const products = edges.map((edge: any) => {
            const product = edge.node;
            return {
                id: product.id,
                title: product.title,
                handle: product.handle,
                description: product.description,
                images: product.images,
                priceRange: {
                    minVariantPrice: {
                        amount: product.variants.edges[0]?.node.price || "0",
                        currencyCode: "AUD"
                    }
                },
                variants: product.variants
            };
        });

        if (products.length === 0) {
            // Return a full showroom of high-fidelity Aura Apex garments if no clothing is found
            return NextResponse.json([
                {
                    id: "aura-apex-1",
                    title: "Apex Heavyweight Hoodie",
                    handle: "apex-hoodie",
                    description: "Signature heavyweight cotton. Engineered for the modern voyageur. Tech-noir finish.",
                    images: { edges: [{ node: { url: "/aura_minimalist_hoodie_white_1777950947179.png" } }] },
                    priceRange: { minVariantPrice: { amount: "125.00", currencyCode: "AUD" } }
                },
                {
                    id: "aura-apex-2",
                    title: "Sovereign Oversized Tee",
                    handle: "sovereign-tee",
                    description: "High-fidelity liquid cotton. Relaxed silhouette for sovereign comfort.",
                    images: { edges: [{ node: { url: "/assets/p1.png" } }] },
                    priceRange: { minVariantPrice: { amount: "65.00", currencyCode: "AUD" } }
                },
                {
                    id: "aura-apex-3",
                    title: "Obsidian Tech Joggers",
                    handle: "obsidian-joggers",
                    description: "Water-resistant technical fabric. Multi-node utility storage system.",
                    images: { edges: [{ node: { url: "/assets/p2.png" } }] },
                    priceRange: { minVariantPrice: { amount: "145.00", currencyCode: "AUD" } }
                }
            ]);
        }

        return NextResponse.json(products);
    } catch (error: any) {
        console.error('🔴 Admin Fetch Failed:', error.message);
        return NextResponse.json({ error: 'Failed to sync with Shopify Admin' }, { status: 500 });
    }
}
