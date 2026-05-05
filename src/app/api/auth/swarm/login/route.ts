import { NextResponse } from 'next/server';
import { shopifyStorefrontFetch, customerAccessTokenCreateMutation } from '@/lib/shopify';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const response = await shopifyStorefrontFetch({
            query: customerAccessTokenCreateMutation,
            variables: {
                input: {
                    email,
                    password
                }
            }
        });

        const data = response.body.data.customerAccessTokenCreate;
        const token = data.customerAccessToken?.accessToken;
        const errors = data.customerUserErrors;

        if (errors && errors.length > 0) {
            return NextResponse.json({ error: errors[0].message }, { status: 400 });
        }

        if (!token) {
            return NextResponse.json({ error: 'Failed to create access token' }, { status: 401 });
        }

        return NextResponse.json({ token });
    } catch (error: any) {
        console.error('🔴 Swarm Login Failed:', error.message);
        return NextResponse.json({ error: 'Authentication service failure' }, { status: 500 });
    }
}
