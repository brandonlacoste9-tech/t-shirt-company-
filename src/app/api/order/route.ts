import { NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Apliiq-Specific Authentication Header Generator
 * Format: x-apliiq-auth RTS:SIG:APPID:STATE
 */
function generateApliiqAuth(appId: string, secret: string, body: string = '') {
    const rts = Math.floor(Date.now() / 1000).toString();
    const state = crypto.randomBytes(8).toString('hex');
    
    // For Apliiq, the body must be Base64 encoded for the signature calculation
    const base64Body = body ? Buffer.from(body).toString('base64') : '';
    
    const payload = appId + rts + state + base64Body;
    const sig = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('base64'); // Apliiq expects base64 signature
    
    return {
        header: `${rts}:${sig}:${appId}:${state}`,
        base64Body
    };
}

export async function POST(request: Request) {
    const APLIIQ_APP_ID = process.env.APLIIQ_APP_ID || 'YOUR_APP_ID';
    const APLIIQ_SECRET = process.env.APLIIQ_SECRET || 'YOUR_SECRET';

    try {
        const body = await request.json();
        const bodyString = JSON.stringify(body);
        
        // 1. Generate the complex Apliiq Auth Header
        const { header, base64Body } = generateApliiqAuth(APLIIQ_APP_ID, APLIIQ_SECRET, bodyString);
        
        console.log('🚀 Order signed for Apliiq:', {
            authHeader: header,
            orderRef: body.order_number
        });

        /* 
        In Production, the flow would be:
        1. Upload Artwork (if not exists)
        2. Create Design (with Branding Services)
        3. Submit Order with Design SKU
        */

        return NextResponse.json({ 
            status: 'success', 
            tracking_id: 'AT-AP-' + Math.floor(Math.random() * 1000000),
            message: 'Order signed and ready for Apliiq Manufacturing Floor.',
            debug: {
                auth_header: header,
                body_encoded: base64Body.substring(0, 20) + '...'
            }
        });
    } catch (error) {
        return NextResponse.json({ status: 'error', message: 'Failed to sign order' }, { status: 400 });
    }
}
