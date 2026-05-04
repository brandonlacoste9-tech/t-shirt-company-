import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import crypto from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as any,
});

/**
 * Apliiq Auth Generator (Reused for Webhook)
 */
function generateApliiqAuth(appId: string, secret: string, body: string = '') {
    const rts = Math.floor(Date.now() / 1000).toString();
    const state = crypto.randomBytes(8).toString('hex');
    const base64Body = body ? Buffer.from(body).toString('base64') : '';
    const payload = appId + rts + state + base64Body;
    const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64');
    return { header: `${rts}:${sig}:${appId}:${state}` };
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    
    console.log(`✅ Payment successful for session: ${session.id}`);

    // Retrieve line items to construct the Apliiq order
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    // Construct the Apliiq Order Payload
    const apliiqOrder = {
        order_number: `AURA-${session.id.slice(-8)}`,
        recipient: {
            name: session.customer_details?.name || 'Customer',
            address1: session.shipping_details?.address?.line1 || '',
            city: session.shipping_details?.address?.city || '',
            state_code: session.shipping_details?.address?.state || '',
            country_code: session.shipping_details?.address?.country || 'US',
            zip: session.shipping_details?.address?.postal_code || ''
        },
        items: lineItems.data.filter(item => item.description !== 'Express Shipping').map(item => ({
            sku: item.description?.split(' | ')[0] || 'GENERIC-SKU',
            quantity: item.quantity || 1
        }))
    };

    // Trigger Apliiq Fulfillment
    try {
        const appId = process.env.APLIIQ_APP_ID!;
        const secret = process.env.APLIIQ_SECRET!;
        const { header } = generateApliiqAuth(appId, secret, JSON.stringify(apliiqOrder));

        const apliiqRes = await fetch('https://devconnector.apliiq.com/v1/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-apliiq-auth': header
            },
            body: JSON.stringify(apliiqOrder)
        });

        if (apliiqRes.ok) {
            console.log(`🚀 Order successfully pushed to Apliiq for Session ${session.id}`);
        } else {
            const errorData = await apliiqRes.json();
            console.error('🔴 Apliiq fulfillment failed:', errorData);
        }
    } catch (error) {
        console.error('🔴 Error calling Apliiq from Webhook:', error);
    }
  }

  return NextResponse.json({ received: true });
}
