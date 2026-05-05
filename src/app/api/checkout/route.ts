import { NextResponse } from 'next/server';
import { shopifyStorefrontFetch } from '@/lib/shopify';

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    // Admiral Test Voyage Simulation Bypass
    // We trigger simulation if specific test IDs are present or if credentials are missing
    const isSimulation = items.some((item: any) => 
        item.id === 'SIM-PRODUCT' || 
        item.id === '1' || 
        (typeof item.id === 'string' && item.id.includes('ADMIRAL')) ||
        !process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
    );

    if (isSimulation) {
        return NextResponse.json({ 
            url: `/voyage/AT-DEV-${Math.floor(Math.random() * 1000000)}`
        });
    }

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

    // Map cart items to Shopify variant IDs and include Line Item Properties as customAttributes
    const lineItems = items.map((item: any) => {
      const customAttributes = [];
      
      if (item.branding) {
        customAttributes.push({
          key: 'Branding',
          value: item.branding === 'woven' ? 'Premium Woven Label' : 
                 item.branding === 'embroidery' ? 'Gold Embroidery' : 
                 item.branding === 'neckprint' ? 'Silver Neck Print' : 
                 item.branding === 'black-gold' ? 'Black-Label: Gold-Stitched' :
                 item.branding === 'black-leather' ? 'Black-Label: Obsidian Leather' : 'Standard'
        });
      }

      if (item.size) {
        customAttributes.push({ key: 'Size', value: item.size });
      }

      // Add a hidden attribute for Vault configuration tracking
      customAttributes.push({ key: '_Vault_Config', value: `AT-2026-${Math.random().toString(36).substring(7).toUpperCase()}` });

      return {
        variantId: item.id.toString().startsWith('gid://') ? item.id : `gid://shopify/ProductVariant/${item.id}`,
        quantity: item.quantity,
        customAttributes
      };
    });

    const response = await shopifyStorefrontFetch({
      query: checkoutCreateMutation,
      variables: {
        input: {
          lineItems
        }
      }
    });

    if (response.status !== 200) {
        throw new Error(`Shopify API Error: ${response.status}`);
    }

    const data = response.body.data;
    if (!data || !data.checkoutCreate) {
        throw new Error('Invalid response from Shopify Storefront API');
    }

    const checkout = data.checkoutCreate.checkout;
    const errors = data.checkoutCreate.checkoutUserErrors;

    if (errors && errors.length > 0) {
      throw new Error(errors[0].message);
    }

    return NextResponse.json({ url: checkout.webUrl });
  } catch (error: any) {
    console.error('🔴 Shopify Checkout Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
