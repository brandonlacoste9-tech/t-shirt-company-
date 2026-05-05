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

const getProductsQuery = `
  query {
    products(first: 50) {
      edges {
        node {
          id
          productType
        }
      }
    }
  }
`;

const archiveProductMutation = `
  mutation productUpdate($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        id
        status
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
        variants: [{ price: "125.00" }]
    },
    {
        title: "Sovereign Oversized Tee",
        descriptionHtml: "High-fidelity liquid cotton. Relaxed silhouette for sovereign comfort. Minimalist node branding.",
        vendor: "Aura Apex",
        productType: "Clothing",
        status: "ACTIVE",
        variants: [{ price: "65.00" }]
    },
    {
        title: "Obsidian Tech Joggers",
        descriptionHtml: "Water-resistant technical fabric. Multi-node utility storage system. Engineered for mobility.",
        vendor: "Aura Apex",
        productType: "Clothing",
        status: "ACTIVE",
        variants: [{ price: "145.00" }]
    }
];

export async function GET() {
    const results = [];

    // 1. Purge Snowboards
    try {
        const listRes = await shopifyAdminFetch({ query: getProductsQuery });
        const toArchive = listRes.body?.data?.products?.edges || [];
        for (const edge of toArchive) {
            if (edge.node.productType === 'Snowboard' || edge.node.productType === '') {
                await shopifyAdminFetch({
                    query: archiveProductMutation,
                    variables: { input: { id: edge.node.id, status: 'ARCHIVED' } }
                });
            }
        }
    } catch (e) {}

    // 2. Inject Apex Clothing
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
        message: "Apex Injection Sequence v2 Complete",
        results
    });
}
