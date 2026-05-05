import { NextResponse } from 'next/server';
import { shopifyAdminFetch, getAdminProductsQuery } from '@/lib/shopify';

export async function GET() {
    try {
        const response = await shopifyAdminFetch({
            query: getAdminProductsQuery
        });

        const edges = response.body?.data?.products?.edges || [];

        if (edges.length === 0) {
            // Return high-quality mock data with a diagnostic message
            return NextResponse.json([
                {
                    id: "aura-1",
                    name: "Aura Apex Hoodie (Admin Sync Required)",
                    price: 85.00,
                    image: "/aura_minimalist_hoodie_white_1777950947179.png",
                    description: "Admin Token connected, but no products were found in your Shopify Admin. Add items in Shopify to see them here!",
                    brand: "Aura Threads",
                    productCode: "ADMIN-SYNC-PENDING",
                    _diagnostic: "Shopify Admin API returned 0 products. Ensure products exist in your Shopify backend."
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
                status: product.status
            };
        });

        return NextResponse.json(products);
    } catch (error: any) {
        console.error('🔴 Admin Fetch Failed:', error.message);
        return NextResponse.json({ error: 'Failed to sync with Shopify Admin' }, { status: 500 });
    }
}
