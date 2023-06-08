import { PUBLIC_HOST_PATH, PUBLIC_SECRET_STRIPE_KEY } from '$env/static/public';
import type { RequestHandler } from '@sveltejs/kit';
import Stripe from 'stripe';
import type { IPayment } from '../../../interfaces/payment';
import type { ICart } from '../../../interfaces/product';

const SECRET_STRIPE_KEY = PUBLIC_SECRET_STRIPE_KEY;
const stripe = new Stripe(SECRET_STRIPE_KEY, {
	apiVersion: '2022-11-15'
});
export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const items = data.items;

	const lineItems: IPayment[] = [];
	items.forEach((item: ICart) => {
		lineItems.push({ price: item._id, quantity: item.quantity });
	});

	const session = await stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: 'payment',
		success_url: `${PUBLIC_HOST_PATH}/success`,
		cancel_url: `${PUBLIC_HOST_PATH}/error`
	});

	return new Response(JSON.stringify({ url: session.url }), {
		status: 200,
		headers: { 'content-type': 'application/json' }
	});
};
