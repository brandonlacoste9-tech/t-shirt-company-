import { NextResponse } from 'next/server';
import { shopifyStorefrontFetch, customerCreateMutation } from '@/lib/shopify';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const response = await shopifyStorefrontFetch({
            query: customerCreateMutation,
            variables: {
                input: {
                    email,
                    password
                }
            }
        });

        const data = response.body.data.customerCreate;
        const customer = data.customer;
        const errors = data.customerUserErrors;

        if (errors && errors.length > 0) {
            return NextResponse.json({ error: errors[0].message }, { status: 400 });
        }

        return NextResponse.json({ success: true, customerId: customer.id });
    } catch (error: any) {
        console.error('🔴 Swarm Signup Failed:', error.message);
        return NextResponse.json({ error: 'Identity creation service failure' }, { status: 500 });
    }
}
