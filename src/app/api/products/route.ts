import { NextResponse } from 'next/server';
import { shopifyStorefrontFetch, getProductsQuery } from '@/lib/shopify';

export async function GET() {
    try {
        const response = await shopifyStorefrontFetch({
            query: getProductsQuery
        });

        const edges = response.body?.data?.products?.edges || [];

        if (edges.length === 0) {
            // Return high-quality mock data with a diagnostic message
            return NextResponse.json([
                {
                    id: "aura-1",
                    name: "Aura Apex Hoodie (Mock)",
                    price: 85.00,
                    image: "/aura_minimalist_hoodie_white_1777950947179.png",
                    description: "Your Shopify store is connected, but we didn't find any products. Ensure your products are 'Active' and assigned to the 'Headless' channel.",
                    brand: "Aura Threads",
                    productCode: "SYNC-PENDING",
                    _diagnostic: "No products found in Storefront API. Check Headless channel permissions."
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
