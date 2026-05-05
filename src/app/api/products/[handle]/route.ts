import { NextResponse } from 'next/server';
import { shopifyStorefrontFetch, getProductQuery } from '@/lib/shopify';

export async function GET(request: Request, { params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params;

    try {
        const response = await shopifyStorefrontFetch({
            query: getProductQuery,
            variables: { handle }
        });

        const product = response.body?.data?.product;

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({
            id: product.id,
            name: product.title,
            price: parseFloat(product.priceRange.minVariantPrice.amount),
            images: product.images.edges.map((e: any) => e.node.url),
            description: product.description,
            handle: product.handle,
            variants: product.variants.edges.map((e: any) => ({
                id: e.node.id,
                title: e.node.title,
                available: e.node.availableForSale
            }))
        });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}
