<script lang="ts">
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { get } from 'svelte/store';
	import Banner from '../components/Banner.svelte';
	import Card from '../components/Card.svelte';
	import Hero from '../components/Hero.svelte';
	import Stats from '../components/Stats.svelte';
	import type { IProduct } from '../interfaces/product';
	import { productService } from '../services/product.services';
	import { cartItems } from '../store/cart';

	let products: IProduct[] = [];

	onMount(async () => {
		const response = await productService.getAllProducts();
		products = response;
	});

	async function checkout() {
		toast.promise(
			fetch('api/stripeCheckout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ items: get(cartItems) })
			})
				.then((data) => {
					return data.json();
				})
				.then((data) => {
					setTimeout(() => {
						window.location.replace(data.url);
					}, 1000);
				}),
			{
				loading: 'Loading...',
				success: 'Redirecting to checkout...',
				error: 'Checkout failed'
			}
		);
	}
</script>

<Hero />

<div class="p-0 sm:p-10 flex justify-center">
	<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
		{#each products as product}
			<Card {product} />
		{/each}
	</div>
</div>

<section class="p-6 mb-14 my-20">
	<Banner />
</section>
<section>
	<div class="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
		<div class="lg:col-start-2">
			<h3 class="text-2xl font-bold tracking-tight sm:text-3xl">Eam nibh gloriatur ex</h3>
			<p class="mt-3 text-lg">
				Per odio fabellas consulatu cu. Utroque detracto mel ea, quo te latine theophrastus. Ea his
				tale nibh dissentias, mei exerci tamquam euripidis cu.
			</p>
			<div class="mt-12 space-y-12">
				<div class="flex">
					<div class="flex-shrink-0">
						<div class="flex items-center justify-center w-12 h-12 rounded-md">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								class="w-7 h-7"
							>
								<path d="M5 13l4 4L19 7" />
							</svg>
						</div>
					</div>
					<div class="ml-4">
						<h4 class="text-lg font-medium leading-6">Cibo augue offendit has ad</h4>
						<p class="mt-2">
							An per velit appellantur, ut utinam minimum nominavi sit, odio nostro habemus ne nec.
							Ne sonet regione contentiones est.
						</p>
					</div>
				</div>
				<div class="flex">
					<div class="flex-shrink-0">
						<div class="flex items-center justify-center w-12 h-12 rounded-md">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								class="w-7 h-7"
							>
								<path d="M5 13l4 4L19 7" />
							</svg>
						</div>
					</div>
					<div class="ml-4">
						<h4 class="text-lg font-medium leading-6">At eum ferri luptatum lobortis</h4>
						<p class="mt-2">
							Te per quidam maiorum ocurreret, etiam delicatissimi usu ad. Ne has quod periculis. Te
							sit primis iisque efficiantur.
						</p>
					</div>
				</div>
				<div class="flex">
					<div class="flex-shrink-0">
						<div class="flex items-center justify-center w-12 h-12 rounded-md">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								class="w-7 h-7"
							>
								<path d="M5 13l4 4L19 7" />
							</svg>
						</div>
					</div>
					<div class="ml-4">
						<h4 class="text-lg font-medium leading-6">Dicunt verterem evertitur eu sea</h4>
						<p class="mt-2">
							Audire principes rationibus eam an, autem nominavi luptatum per te. Sumo fabulas vim
							eu, sonet saperet eleifend ut vix.
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-10 lg:mt-0 lg:col-start-1 lg:row-start-1">
			<img
				src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29kaW5nfGVufDB8fDB8fHww&w=1000&q=80"
				alt=""
				class="mx-auto rounded-lg shadow-lg"
			/>
			<div class="py-6 md:px-32 px-10 bg-white mx-auto mt-1 mb-20 rounded-lg">
				<Stats />
			</div>
		</div>
	</div>
</section>
