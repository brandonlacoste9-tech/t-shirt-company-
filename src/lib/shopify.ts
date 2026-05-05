const domain = process.env.SHOPIFY_STORE_DOMAIN || 'printifull-ca.myshopify.com';
const clientId = process.env.SHOPIFY_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

/**
 * Fetches an access token from Shopify using Client Credentials
 */
export async function getShopifyToken() {
  try {
    const response = await fetch('https://api.shopify.com/auth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      }),
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error fetching Shopify token:', error);
    return null;
  }
}

/**
 * Fetches products from the Shopify Discovery API
 */
export async function getShopifyProducts(query = 't-shirt', limit = 10) {
  const token = await getShopifyToken();
  if (!token) return { value: [], Count: 0 };

  try {
    const response = await fetch(`https://discover.shopifyapps.com/global/v2/search?limit=${limit}&query=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    return { value: [], Count: 0 };
  }
}

/**
 * Storefront API GraphQL fetcher
 */
export async function shopifyStorefrontFetch({ query, variables = {} }: { query: string, variables?: any }) {
  const endpoint = `https://${domain}/api/2025-01/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || clientId!,
      },
      body: JSON.stringify({ query, variables }),
    });

    return {
      status: result.status,
      body: await result.json(),
    };
  } catch (error) {
    console.error('Shopify Storefront Error:', error);
    return {
      status: 500,
      error: 'Error receiving data from Shopify Storefront API',
    };
  }
}

// Keep shopifyFetch as an alias for now to prevent breaking existing routes
export const shopifyFetch = shopifyStorefrontFetch;

export const getProductsQuery = `
  query getProducts {
    products(first: 20) {
      edges {
        node {
          id
          title
          description
          handle
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 5) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      }
    }
  }
`;

export const customerAccessTokenCreateMutation = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const customerCreateMutation = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const getCustomerQuery = `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      phone
      metafields(identifiers: [{namespace: "aura", key: "blueprints"}]) {
        value
      }
      orders(first: 10) {
        edges {
          node {
            id
            name
            processedAt
            fulfillmentStatus
            totalPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

/**
 * Admin API: Update Customer Metafields (used for Blueprints)
 */
export async function updateCustomerBlueprints(customerId: string, blueprints: any[]) {
    const adminToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;
    const domain = process.env.SHOPIFY_STORE_DOMAIN;
    
    if (!adminToken) throw new Error('Missing Admin Token');

    // Strip "gid://shopify/Customer/" if present for REST/GraphQL Admin
    const id = customerId.split('/').pop();

    const response = await fetch(`https://${domain}/admin/api/2024-04/customers/${id}/metafields.json`, {
        method: 'POST',
        headers: {
            'X-Shopify-Access-Token': adminToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            metafield: {
                namespace: 'aura',
                key: 'blueprints',
                value: JSON.stringify(blueprints),
                type: 'json'
            }
        })
    });

    return response.json();
}
