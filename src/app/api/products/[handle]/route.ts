import { NextResponse } from 'next/server';
import { shopifyAdminFetch } from '@/lib/shopify';

const getAdminProductQuery = `
  query getProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      images(first: 5) {
        edges {
          node {
            url
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price
            inventoryQuantity
          }
        }
      }
    }
  }
`;

export async function GET(request: Request, { params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params;

    try {
        const response = await shopifyAdminFetch({
            query: getAdminProductQuery,
            variables: { handle }
        });

        const product = response.body?.data?.productByHandle;

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({
            id: product.id,
            name: product.title,
            price: parseFloat(product.variants.edges[0]?.node.price || "0"),
            images: product.images.edges.map((e: any) => e.node.url),
            description: product.description,
            handle: product.handle,
            variants: product.variants.edges.map((e: any) => ({
                id: e.node.id,
                title: e.node.title,
                price: e.node.price,
                available: e.node.inventoryQuantity > 0
            }))
        });
    } catch (error: any) {
        console.error('🔴 Admin Product Fetch Failed:', error.message);
        return NextResponse.json({ error: 'Failed to fetch product from Admin' }, { status: 500 });
    }
}
