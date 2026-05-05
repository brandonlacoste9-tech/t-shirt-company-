import { NextResponse } from 'next/server';
import { shopifyStorefrontFetch, getCollectionProductsQuery } from '@/lib/shopify';

export async function GET(request: Request, { params }: { params: { handle: string } }) {
    const handle = params.handle;

    try {
        const response = await shopifyStorefrontFetch({
            query: getCollectionProductsQuery,
            variables: { handle }
        });

        const collection = response.body?.data?.collection;

        if (!collection) {
            return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
        }

        const products = collection.products.edges.map((edge: any) => {
            const product = edge.node;
            return {
                id: product.id,
                name: product.title,
                price: parseFloat(product.priceRange.minVariantPrice.amount),
                image: product.images.edges[0]?.node.url || "/assets/p1.png",
                handle: product.handle
            };
        });

        return NextResponse.json({
            title: collection.title,
            products
        });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to fetch collection' }, { status: 500 });
    }
}
