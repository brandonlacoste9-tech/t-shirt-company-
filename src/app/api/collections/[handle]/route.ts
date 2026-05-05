import { NextResponse } from 'next/server';
import { shopifyStorefrontFetch, getCollectionProductsQuery } from '@/lib/shopify';

export async function GET(request: Request, { params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params;

    try {
        const response = await shopifyStorefrontFetch({
            query: getCollectionProductsQuery,
            variables: { handle }
        });

        const collection = response.body?.data?.collection;

        if (!collection) {
            return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
        }

        const products = collection.products.edges.map((edge: any) => edge.node);

        return NextResponse.json({
            title: collection.title,
            products
        });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to fetch collection' }, { status: 500 });
    }
}
