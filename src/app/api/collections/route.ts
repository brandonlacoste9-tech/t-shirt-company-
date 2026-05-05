import { shopifyStorefrontFetch, getCollectionsQuery } from '@/lib/shopify';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await shopifyStorefrontFetch({
      query: getCollectionsQuery,
    });

    const collections = res.body?.data?.collections?.edges?.map((edge: any) => edge.node) || [];
    
    return NextResponse.json(collections);
  } catch (error) {
    console.error('Collections API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
  }
}
