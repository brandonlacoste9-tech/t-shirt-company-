import { NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Apliiq-Specific Authentication Header Generator
 */
function generateApliiqAuth(appId: string, secret: string, body: string = '') {
    const rts = Math.floor(Date.now() / 1000).toString();
    const state = crypto.randomBytes(8).toString('hex');
    const base64Body = body ? Buffer.from(body).toString('base64') : '';
    
    const payload = appId + rts + state + base64Body;
    const sig = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('base64');
    
    return {
        header: `${rts}:${sig}:${appId}:${state}`,
        base64Body
    };
}

export async function POST(request: Request) {
    const APLIIQ_APP_ID = process.env.APLIIQ_APP_ID;
    const APLIIQ_SECRET = process.env.APLIIQ_SECRET;
    const APLIIQ_API_URL = 'https://devconnector.apliiq.com/v1/orders';

    if (!APLIIQ_APP_ID || !APLIIQ_SECRET) {
        return NextResponse.json({ 
            status: 'error', 
            message: 'Apliiq API credentials missing in environment.' 
        }, { status: 500 });
    }

    try {
        const orderData = await request.json();
        const bodyString = JSON.stringify(orderData);
        
        // Generate the required Apliiq Auth Header
        const { header } = generateApliiqAuth(APLIIQ_APP_ID, APLIIQ_SECRET, bodyString);
        
        console.log('🚀 Submitting Live Order to Apliiq Floor:', orderData.order_number);

        // --- THE LIVE BRIDGE ---
        const response = await fetch(APLIIQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-apliiq-auth': header
            },
            body: bodyString
        });

        const result = await response.json();

        if (response.ok) {
            return NextResponse.json({ 
                status: 'success', 
                apliiq_ref: result.id,
                tracking_id: 'AT-' + result.id,
                message: 'Order accepted by Apliiq Manufacturing.'
            });
        } else {
            throw new Error(result.message || 'Apliiq API rejection');
        }

    } catch (error: any) {
        console.error('🔴 Fulfillment Error:', error.message);
        return NextResponse.json({ 
            status: 'error', 
            message: error.message 
        }, { status: 500 });
    }
}
