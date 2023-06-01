<script>
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
</script>

<Toaster />
<Navbar />
<slot />
