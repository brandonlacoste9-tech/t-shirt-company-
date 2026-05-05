import { NextResponse } from 'next/server';
import { shopifyStorefrontFetch, searchProductsQuery } from '@/lib/shopify';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json({ products: [] });
    }

    try {
        const response = await shopifyStorefrontFetch({
            query: searchProductsQuery,
            variables: { query }
        });

        const products = response.body?.data?.products?.edges.map((edge: any) => edge.node) || [];

        return NextResponse.json({ products });
    } catch (error: any) {
        console.error('🔴 Search API Failed:', error.message);
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
}
