<script lang="ts">
	import { page } from '$app/stores';
	import { NavBrand, NavHamburger, NavLi, NavUl, Navbar } from 'flowbite-svelte';
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
		<NavLi
			href="/login"
			active={$page.url.pathname === '/login' ? true : false}
			activeClass="text-orange-500"
			nonActiveClass="text-gray-500 hover:text-orange-500">Login</NavLi
		>
	</NavUl>
</Navbar>
