<script>
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
</script>

<div class="bg-gray-100 min-h-screen">
	<Toaster />
	<Navbar />
	<slot />
</div>
