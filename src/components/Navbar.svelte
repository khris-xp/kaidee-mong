<script lang="ts">
	import { page } from '$app/stores';
	import { NavBrand, NavHamburger, NavLi, NavUl, Navbar } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { userService } from '../services/user.services';
	import { updateUserProfile, user } from '../store/user';

	const logout = async () => {
		toast.promise(userService.logout(), {
			loading: 'Logging out...',
			success: 'Logout success',
			error: 'Logout failed'
		});
		setTimeout(() => {
			window.location.href = '/login';
		}, 1000);
	};

	onMount(async () => {
		await updateUserProfile();
	});
</script>

<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<img src="/shopee-logo.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden}>
		<NavLi
			href="/"
			active={$page.url.pathname === '/' ? true : false}
			activeClass="text-orange-500"
			nonActiveClass="text-gray-500 hover:text-orange-500">Home</NavLi
		>
		{#if $user?.name === undefined || $user?.name === ''}
			<NavLi
				href="/register"
				active={$page.url.pathname === '/register'}
				activeClass="text-orange-500"
				nonActiveClass="text-gray-500 hover:text-orange-500">Register</NavLi
			>
			<NavLi
				href="/login"
				active={$page.url.pathname === '/login'}
				activeClass="text-orange-500"
				nonActiveClass="text-gray-500 hover:text-orange-500">Login</NavLi
			>
		{:else}
			{#if $user?.role === 1}
				<NavLi
					href="/create-product"
					active={$page.url.pathname === '/create-product' ? true : false}
					activeClass="text-orange-500"
					nonActiveClass="text-gray-500 hover:text-orange-500">Create</NavLi
				>
			{/if}
			<button class="text-gray-500 hover:text-orange-500" on:click={logout}>Logout</button>
		{/if}
	</NavUl>
</Navbar>
