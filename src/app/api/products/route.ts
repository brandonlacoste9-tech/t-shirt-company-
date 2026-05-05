import { NextResponse } from 'next/server';
import { shopifyStorefrontFetch, getProductsQuery } from '@/lib/shopify';

export async function GET() {
    try {
        const response = await shopifyStorefrontFetch({
            query: getProductsQuery
        });

        const edges = response.body?.data?.products?.edges || [];

        if (edges.length === 0) {
            // Return high-quality mock data if the store is empty
            return NextResponse.json([
                {
                    id: "aura-1",
                    name: "Essential Heavyweight Hoodie",
                    price: 85.00,
                    image: "/aura_minimalist_hoodie_white_1777950947179.png",
                    description: "Premium heavyweight cotton. Engineered for the modern voyageur.",
                    brand: "Aura Threads",
                    productCode: "3719",
                    isNew: true
                },
                {
                    id: "aura-2",
                    name: "Sovereign Oversized Tee",
                    price: 45.00,
                    image: "/assets/p1.png",
                    description: "High-fidelity textiles with relaxed tailoring.",
                    brand: "Aura Threads",
                    productCode: "1001"
                }
            ]);
        }

        const products = edges.map((edge: any) => {
            const product = edge.node;
            return {
                id: product.id,
                name: product.title,
                price: parseFloat(product.priceRange.minVariantPrice.amount),
                image: product.images.edges[0]?.node.url || "/assets/p1.png",
                description: product.description,
                brand: "Aura Threads",
                productCode: product.id.split('/').pop(),
                handle: product.handle
            };
        });

        return NextResponse.json(products);
    } catch (error: any) {
        console.error('🔴 Storefront Fetch Failed:', error.message);
        return NextResponse.json({ error: 'Failed to sync with Shopify Storefront' }, { status: 500 });
    }
}
