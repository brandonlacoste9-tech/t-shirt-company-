import { NextResponse } from 'next/server';
import { getShopifyProducts } from '@/lib/shopify';

export async function GET() {
    try {
        // Fetch products using the confirmed Discovery API
        const response = await getShopifyProducts('t-shirt', 20);

        const items = response.value;

        if (!items || items.length === 0) {
            // Return mock data if the Shopify store is currently empty or no search results
            return NextResponse.json([
                {
                    id: "mock-1",
                    name: "Aura Essentials Hoodie",
                    price: 65.00,
                    image: "/assets/apliiq-hoodie.png",
                    description: "Connection successful, but no products were found in your Shopify store. Add items in Shopify to see them here!",
                    brand: "Aura Threads",
                    productCode: "3719",
                    variants: ["S", "M", "L", "XL"]
                }
            ]);
        }

        const products = items.map((product: any) => {
            return {
                id: product.id,
                name: product.title,
                price: product.priceRange.min.amount / 100, // API returns price in cents (e.g. 699 for $6.99)
                image: product.media?.[0]?.url || '/assets/apliiq-hoodie.png',
                description: product.description,
                brand: 'Aura Threads',
                sku: product.id.split('/').pop(),
                productCode: product.id.split('/').pop(),
                variants: product.variants?.map((v: any) => v.displayName) || ["Standard"]
            };
        });

        return NextResponse.json(products);
    } catch (error: any) {
        console.error('🔴 Shopify Discovery Failed:', error.message);
        return NextResponse.json({ error: `Failed to sync with Shopify: ${error.message}` }, { status: 500 });
    }
}
