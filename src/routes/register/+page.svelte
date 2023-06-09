<script lang="ts">
	import toast from 'svelte-french-toast';
	import { userService } from '../../services/user.services';

	let name: string = '';
	let email: string = '';
	let password: string = '';

	$: submit = async () => {
		toast.promise(userService.register(name, email, password), {
			loading: 'Registering...',
			success: 'Register success',
			error: 'Register failed'
		});
		setTimeout(() => {
			window.location.href = '/';
		}, 1000);
	};
</script>

<section class="bg-white">
	<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
		<a href="/login" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
			<img class="w-full h-20 mr-2" src="/shopee-logo.png" alt="logo" />
		</a>
		<div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
					Sign up for your account
				</h1>
				<form class="space-y-4 md:space-y-6" on:submit|preventDefault={submit}>
					<div>
						<label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your name</label
						>
						<input
							type="text"
							name="name"
							id="name"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5"
							placeholder="John Doe"
							bind:value={name}
							required
						/>
					</div>
					<div>
						<label for="email" class="block mb-2 text-sm font-medium text-gray-900"
							>Your email</label
						>
						<input
							type="email"
							name="email"
							id="email"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5"
							placeholder="name@gmail.com"
							bind:value={email}
							required
						/>
					</div>
					<div>
						<label for="password" class="block mb-2 text-sm font-medium text-gray-900"
							>Password</label
						>
						<input
							type="password"
							name="password"
							id="password"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5"
							placeholder="••••••••"
							bind:value={password}
							required
						/>
					</div>
					<button
						type="submit"
						class="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
						>Sign in</button
					>
					<p class="text-sm font-light text-gray-500">
						Already have an account yet ? <a
							href="/login"
							class="font-medium text-orange-600 hover:underline">Sign in</a
						>
					</p>
				</form>
			</div>
		</div>
	</div>
</section>
