import { NextResponse } from 'next/server';
import { shopifyAdminFetch } from '@/lib/shopify';

const createProductMutation = `
  mutation productCreate($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
        title
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const productsToSeed = [
    {
        title: "Apex Heavyweight Hoodie",
        descriptionHtml: "<strong>Aura Apex Signature.</strong> 500GSM heavyweight cotton. Engineered for the modern voyageur. Tech-noir finish with reinforced stitching.",
        vendor: "Aura Apex",
        productType: "Clothing",
        status: "ACTIVE",
        variants: [{ price: "125.00", inventoryItem: { tracked: false } }]
    },
    {
        title: "Sovereign Oversized Tee",
        descriptionHtml: "High-fidelity liquid cotton. Relaxed silhouette for sovereign comfort. Minimalist node branding.",
        vendor: "Aura Apex",
        productType: "Clothing",
        status: "ACTIVE",
        variants: [{ price: "65.00", inventoryItem: { tracked: false } }]
    },
    {
        title: "Obsidian Tech Joggers",
        descriptionHtml: "Water-resistant technical fabric. Multi-node utility storage system. Engineered for mobility.",
        vendor: "Aura Apex",
        productType: "Clothing",
        status: "ACTIVE",
        variants: [{ price: "145.00", inventoryItem: { tracked: false } }]
    }
];

export async function GET() {
    const results = [];

    for (const product of productsToSeed) {
        try {
            const response = await shopifyAdminFetch({
                query: createProductMutation,
                variables: {
                    input: product
                }
            });
            results.push(response.body);
        } catch (e: any) {
            results.push({ error: e.message });
        }
    }

    return NextResponse.json({
        message: "Apex Injection Sequence Complete",
        results
    });
}
