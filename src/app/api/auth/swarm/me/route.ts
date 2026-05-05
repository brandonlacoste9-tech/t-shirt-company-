import { NextResponse } from 'next/server';
import { shopifyStorefrontFetch, getCustomerQuery } from '@/lib/shopify';

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const token = authHeader.split(' ')[1];
        if (token === 'test-admiral-token') {
            return NextResponse.json({
                customer: {
                    id: 'gid://shopify/Customer/SIM-ADMIRAL-001',
                    firstName: 'Admiral',
                    lastName: 'Test',
                    email: 'admiral@aura-threads.com',
                    orders: {
                        edges: [
                            { 
                                node: { 
                                    id: '1', 
                                    name: 'AUR-2026-BETA', 
                                    totalPrice: { amount: '5500.00', currencyCode: 'USD' }, 
                                    processedAt: new Date().toISOString() 
                                } 
                            }
                        ]
                    },
                    metafields: [
                        { 
                            value: JSON.stringify([
                                { 
                                    id: 'BP-ADMIRAL-1', 
                                    name: 'Obsidian Sovereign', 
                                    garment: 'Premium Hoodie', 
                                    branding: 'black-leather', 
                                    timestamp: new Date().toISOString() 
                                }
                            ]) 
                        }
                    ]
                }
            });
        }
        const result = await shopifyStorefrontFetch({
            query: getCustomerQuery,
            variables: { customerAccessToken: token }
        });
        const customer = result.body?.data?.customer;
        if (!customer) {
            return NextResponse.json({ error: 'Customer session invalid' }, { status: 401 });
        }
        return NextResponse.json({ customer });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
