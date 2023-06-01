<script lang="ts">
	import { get } from 'svelte/store';
	import type { IProduct } from '../interfaces/product';
	import { addToCart, cartItems, removeFromCart } from '../store/cart';
	export let product: IProduct = {
		_id: '',
		name: '',
		price: 0,
		image: '',
		sale_price: 0,
		rating: 0
	};

	let cart = get(cartItems);
	let cartItemIndex = cart.findIndex((item) => {
		return item._id === product._id;
	});
	let cartProduct = cart[cartItemIndex];
	cartItems.subscribe((newCartValue) => {
		cart = newCartValue;
		cartItemIndex = cart.findIndex((item) => {
			return item._id === product._id;
		});
		cartProduct = cart[cartItemIndex];
	});
</script>

<div class="relative m-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md">
	<a href="/">
		<img class="h-60 rounded-t-lg object-cover" src={product.image} alt="product" />
	</a>
	<span
		class="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white"
		>Sale</span
	>
	<div class="mt-4 px-5 pb-5">
		<a href="/" class="space-x-16">
			<h5 class="inline-flex justify-start text-xl font-semibold tracking-tight text-slate-900">
				{product.name}
			</h5>
			{#if cartProduct === undefined}
				<h5 class="inline-flex justify-end text-base font-semibold tracking-tight text-slate-900">
					Quantity : 0
				</h5>
			{/if}
			{#if cartProduct !== undefined}
				<h5 class="inline-flex justify-end text-base font-semibold tracking-tight text-slate-900">
					Quantity : {cartProduct?.quantity}
				</h5>
			{/if}
		</a>
		<div class="mt-2.5 mb-5 flex items-center">
			<span class="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold"
				>{product.rating}.0</span
			>
			{#each Array(product.rating) as _, i}
				<svg
					aria-hidden="true"
					class="h-5 w-5 text-yellow-300"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
					/>
				</svg>
			{/each}
			<p class="ml-2">
				<span class="text-3xl font-bold text-slate-900">${product.sale_price}</span>
				<span class="text-sm text-slate-900 line-through">${product.price}</span>
			</p>
		</div>
		<div class="flex items-center justify-between mx-4 space-x-2">
			<button
				class="flex items-center rounded-md bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
				on:click={() => addToCart(product._id)}
			>
				Add to cart</button
			>
			<button
				class="flex items-center rounded-md bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
				on:click={() => removeFromCart(product._id)}
			>
				Remove</button
			>
		</div>
	</div>
</div>
