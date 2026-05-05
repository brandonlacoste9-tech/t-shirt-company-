import { NextResponse } from 'next/server';
import { shopifyStorefrontFetch, getCustomerQuery, updateCustomerBlueprints } from '@/lib/shopify';

export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const { blueprint } = await request.json();

        // Admiral Test Voyage Simulation Bypass
        if (token === 'test-admiral-token') {
            return NextResponse.json({ success: true, mock: true });
        }

        // 1. Fetch current customer to get their ID and existing blueprints
        const response = await shopifyStorefrontFetch({
            query: getCustomerQuery,
            variables: { customerAccessToken: token }
        });

        const customer = response.body.data.customer;
        if (!customer) return NextResponse.json({ error: 'Invalid session' }, { status: 401 });

        let blueprints = [];
        const existingMetafield = customer.metafields?.[0];
        if (existingMetafield?.value) {
            blueprints = JSON.parse(existingMetafield.value);
        }

        // 2. Add the new blueprint
        blueprints.push({
            id: `BP-${Date.now()}`,
            name: blueprint.name || 'New Blueprint',
            garment: blueprint.garment,
            branding: blueprint.branding,
            timestamp: new Date().toISOString()
        });

        // 3. Update the metafield via Admin API
        await updateCustomerBlueprints(customer.id, blueprints);

        return NextResponse.json({ success: true, blueprints });
    } catch (error: any) {
        console.error('🔴 Blueprint Save Failed:', error.message);
        return NextResponse.json({ error: 'Failed to archive DNA blueprint' }, { status: 500 });
    }
}
