import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    // 1. Create a Shopify Checkout using the Storefront API
    const checkoutCreateMutation = `
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            webUrl
          }
          checkoutUserErrors {
            code
            field
            message
          }
        }
      }
    `;

    // Map cart items to Shopify variant IDs
    // Note: In a real app, variant IDs must be the full Shopify GID format
    const lineItems = items.map((item: any) => ({
      variantId: item.id, // Assuming item.id is the Shopify Variant GID
      quantity: item.quantity
    }));

    const response = await shopifyFetch({
      query: checkoutCreateMutation,
      variables: {
        input: {
          lineItems
        }
      }
    });

    const checkout = response.body.data.checkoutCreate.checkout;
    const errors = response.body.data.checkoutCreate.checkoutUserErrors;

    if (errors && errors.length > 0) {
      throw new Error(errors[0].message);
    }

    return NextResponse.json({ url: checkout.webUrl });
  } catch (error: any) {
    console.error('Shopify Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
