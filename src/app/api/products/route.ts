import { NextResponse } from 'next/server';
import { shopifyFetch, getProductsQuery } from '@/lib/shopify';

export async function GET() {
    const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
    const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

    // Fallback to Aura Essentials if Shopify is not yet connected
    if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
        return NextResponse.json([
            {
                id: "mock-1",
                name: "Aura Essentials Hoodie",
                price: 65.00,
                image: "/assets/apliiq-hoodie.png",
                description: "Sync your Shopify store to unlock your full collection.",
                brand: "Aura Threads",
                productCode: "3719",
                variants: ["S", "M", "L", "XL"]
            }
        ]);
    }

    try {
        const response = await shopifyFetch({
            query: getProductsQuery
        });

        if (response.status !== 200) {
            throw new Error('Shopify API Error');
        }

        const products = response.body.data.products.edges.map((edge: any) => {
            const product = edge.node;
            return {
                id: product.id,
                name: product.title,
                price: parseFloat(product.priceRange.minVariantPrice.amount),
                image: product.images.edges[0]?.node.url || '/assets/apliiq-hoodie.png',
                description: product.description,
                brand: 'Aura Threads',
                sku: product.handle,
                productCode: product.id.split('/').pop(),
                variants: product.variants.edges.map((v: any) => v.node.title)
            };
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error('🔴 Shopify Sync Failed:', error);
        return NextResponse.json({ error: 'Failed to sync with Shopify' }, { status: 500 });
    }
}
