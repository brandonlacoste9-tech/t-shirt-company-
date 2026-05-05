import { NextResponse } from 'next/server';

/**
 * Shopify OAuth Callback Handler
 * This route receives the authorization code from Shopify
 * and exchanges it for a permanent access token.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const shop = searchParams.get('shop');
    const hmac = searchParams.get('hmac');

    if (!code || !shop) {
        return NextResponse.json({ error: 'Missing code or shop parameter' }, { status: 400 });
    }

    try {
        // Exchange the authorization code for a permanent access token
        const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: process.env.SHOPIFY_CLIENT_ID,
                client_secret: process.env.SHOPIFY_CLIENT_SECRET,
                code
            })
        });

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        if (!accessToken) {
            return new Response(`
                <html>
                <body style="font-family:monospace;background:#050507;color:white;padding:40px;">
                    <h1 style="color:#f44">Token Exchange Failed</h1>
                    <pre>${JSON.stringify(tokenData, null, 2)}</pre>
                </body>
                </html>
            `, { headers: { 'Content-Type': 'text/html' } });
        }

        // Display the token prominently so it can be copied into Vercel env vars
        return new Response(`
            <!DOCTYPE html>
            <html>
            <head><title>Aura Threads — Token Captured</title></head>
            <body style="font-family:monospace;background:#050507;color:white;padding:60px;max-width:800px;margin:0 auto;">
                <h1 style="color:#d4af37;letter-spacing:2px;">SOVEREIGN HANDSHAKE COMPLETE</h1>
                <p style="color:rgba(255,255,255,0.5);">Copy these values into your Vercel Environment Variables and redeploy.</p>
                
                <div style="margin:30px 0;background:#111;border:1px solid #d4af37;padding:30px;border-radius:16px;">
                    <p style="color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px;">SHOPIFY_ADMIN_API_ACCESS_TOKEN</p>
                    <p style="color:#00f2ff;font-size:18px;word-break:break-all;margin:0;">${accessToken}</p>
                </div>

                <div style="margin:30px 0;background:#111;border:1px solid #333;padding:30px;border-radius:16px;">
                    <p style="color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px;">Store</p>
                    <p style="color:white;margin:0;">${shop}</p>
                </div>

                <p style="color:rgba(255,255,255,0.3);font-size:12px;margin-top:40px;">
                    ⚠️ This page will not show this token again. Copy it now and store it securely.
                </p>
            </body>
            </html>
        `, { headers: { 'Content-Type': 'text/html' } });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
