<script lang="ts">
	import Card from '../components/Card.svelte';
	import { products } from '../constants/product';
	import { user } from '../store/user';
</script>

<div
	class="hero min-h-screen w-full bg-base-200 bg-cover"
	style="background-image: url(https://garage-pak.com/wp-content/uploads/2021/12/Shopping-Day.jpg);"
>
	<div class="hero-overlay bg-opacity-60" />
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-md">
			{#if $user}
				<h1>Hello, {$user.username}!</h1>
			{:else}
				<p>Loading...</p>
			{/if}
			<p class="mb-5">
				Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
				quasi. In deleniti eaque aut repudiandae et a id nisi.
			</p>
			<button class="btn btn-primary">Get Started</button>
		</div>
	</div>
</div>

<div class="p-10 flex justify-center">
	<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
		{#each products as product}
			<Card {product} />
		{/each}
	</div>
</div>
