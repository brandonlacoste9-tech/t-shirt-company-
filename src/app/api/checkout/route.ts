import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2025-02-24.acacia' as any,
});

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: `${item.size} | ${item.branding}`,
          images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${item.image}`],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Add shipping as a line item for simplicity in MVP
    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Express Shipping',
          description: 'Apliiq Global Priority',
        },
        unit_amount: 1200,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/voyage/AT-{CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/`,
      metadata: {
        order_type: 'apliiq_fulfillment',
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
