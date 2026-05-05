import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { orderId: string } }
) {
    const { orderId } = params;
    const adminToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;
    const domain = process.env.SHOPIFY_STORE_DOMAIN || 'printifull-ca.myshopify.com';

    // Fallback/Mock mode for development if no token is provided yet
    if (!adminToken) {
        console.warn('⚠️ SHOPIFY_ADMIN_API_ACCESS_TOKEN is missing. Returning mock data for tracker testing.');
        return NextResponse.json({
            orderId,
            status: 'Production',
            activeStep: 1, // Production stage
            details: {
                location: 'Apliiq Factory Floor',
                city: 'Los Angeles, CA',
                serviceLevel: 'Priority Production',
                branding: 'Custom Woven Label Active'
            },
            steps: [
                { id: 'origin', title: 'Origin', desc: 'Design Authenticated & Sequenced', status: 'completed' },
                { id: 'manufacturing', title: 'Production', desc: 'Active on Apliiq Floor', status: 'current' },
                { id: 'branding', title: 'Branding', desc: 'Custom Woven Label Application', status: 'pending' },
                { id: 'quality', title: 'Quality Control', desc: 'Final Technical Inspection', status: 'pending' },
                { id: 'voyage', title: 'On Voyage', desc: 'Dispatched to Destination', status: 'pending' }
            ]
        });
    }

    try {
        // Query the Shopify Admin API for order details
        // Note: We use the REST API here for simplicity in status mapping
        const response = await fetch(`https://${domain}/admin/api/2024-04/orders/${orderId}.json`, {
            headers: {
                'X-Shopify-Access-Token': adminToken,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Shopify Admin API returned ${response.status}`);
        }

        const { order } = await response.json();

        // Mapping Shopify status to Aura Threads Voyage Stages
        let activeStep = 0;
        let statusText = 'Origin';

        if (order.financial_status === 'paid') {
            activeStep = 0;
            statusText = 'Origin';
        }

        // Shopify Rest API doesn't have "in_progress" in the same way, 
        // we check fulfillment_status or look for partial fulfillments
        if (order.fulfillment_status === null && order.financial_status === 'paid') {
            activeStep = 1; // Production
            statusText = 'Production';
        }

        if (order.fulfillment_status === 'fulfilled') {
            activeStep = 3; // Quality Control (assuming fulfilled means ready to ship)
            statusText = 'QC';
        }

        // Check for tracking info to set "On Voyage"
        const hasTracking = order.fulfillments?.some((f: any) => f.tracking_number);
        if (hasTracking) {
            activeStep = 4; // On Voyage
            statusText = 'On Voyage';
        }

        // Parse branding from line items if available
        const brandingStyle = order.line_items?.[0]?.properties?.find((p: any) => p.name === 'Branding')?.value || 'Standard';

        return NextResponse.json({
            orderId: order.name,
            status: statusText,
            activeStep,
            brandingStyle,
            details: {
                location: activeStep < 4 ? 'Apliiq Factory Floor' : 'In Transit',
                city: activeStep < 4 ? 'Los Angeles, CA' : 'Global Logistics Hub',
                serviceLevel: 'Priority Production',
                branding: brandingStyle
            }
        });

    } catch (error: any) {
        console.error('🔴 Order Fetch Failed:', error.message);
        return NextResponse.json({ error: 'Failed to retrieve order voyage data' }, { status: 500 });
    }
}
