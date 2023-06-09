<script lang="ts">
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { get } from 'svelte/store';
	import type { IProduct } from '../interfaces/product';
	import { productService } from '../services/product.services';
	import { addToCart, cartItems, removeFromCart } from '../store/cart';
	import { user } from '../store/user';
	export let product: IProduct = {
		_id: '',
		product_id: '',
		title: '',
		price: 0,
		description: '',
		content: '',
		category: '',
		images: {
			public_id: '',
			url: ''
		},
		sold: 0,
		checked: false
	};

	let cart = get(cartItems);
	let cartItemIndex = cart.findIndex((item) => {
		return item._id === product.product_id;
	});
	let cartProduct = cart[cartItemIndex];
	cartItems.subscribe((newCartValue) => {
		cart = newCartValue;
		cartItemIndex = cart.findIndex((item) => {
			return item._id === product.product_id;
		});
		cartProduct = cart[cartItemIndex];
	});

	const deleteProduct = async () => {
		try {
			await productService.deleteProducts(product._id);
			toast.success('Product deleted');
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} catch (error) {
			toast.error('Product delete failed');
		}
	};
</script>

<div class="flex flex-col justify-center items-center">
	<div
		class="!z-5 relative flex flex-col rounded-[20px] max-w-[300px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 w-full !p-4 3xl:p-![18px] undefined"
	>
		<div class="h-full w-full">
			<div class="relative w-full">
				<img
					src={product.images.url}
					class="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
					alt=""
				/>
			</div>
			<div class="mb-3 flex items-center justify-between px-1 md:items-start">
				<div class="mb-2">
					<p class="text-lg font-bold text-navy-700">{product.title}</p>
					<p class="mt-1 text-sm font-medium text-gray-600 md:mt-2">By Esthera Jackson</p>
				</div>
				<div class="flex flex-row-reverse md:mt-2 lg:mt-0">
					<span
						class="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700"
						>+5</span
					><span class="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
						<img
							class="h-full w-full rounded-full object-cover"
							src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar1.eeef2af6dfcd3ff23cb8.png"
							alt=""
						/>
					</span>
					<span class="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
						<img
							class="h-full w-full rounded-full object-cover"
							src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar2.5692c39db4f8c0ea999e.png"
							alt=""
						/>
					</span>
					<span class="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
						<img
							class="h-full w-full rounded-full object-cover"
							src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar3.9f646ac5920fa40adf00.png"
							alt=""
						/>
					</span>
				</div>
			</div>
			<div class="flex items-center justify-between md:items-center lg:justify-between">
				<div class="flex">
					<p class="!mb-0 text-sm font-bold text-purple-500">
						Current Bid: {product.price} <span>ETH</span>
					</p>
				</div>
				{#if $user?.role === 1}
					<button
						class="linear rounded-[20px] bg-purple-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-purple-800 active:bg-purple-700"
					>
						<a href={`/edit-product/${product.product_id}`}>Edit</a>
					</button>
				{/if}
				{#if $user?.role === 0}
					<button
						class="linear rounded-[20px] bg-purple-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-purple-800 active:bg-purple-700"
					>
						<p>Place Bid</p>
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>
