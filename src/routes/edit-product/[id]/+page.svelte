<script lang="ts">
	import { page } from '$app/stores';
	import type { AxiosProgressEvent } from 'axios';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import type { IProduct } from '../../../interfaces/product';
	import { productService } from '../../../services/product.services';
	import { uploadService } from '../../../services/upload.services';

	let productById: IProduct;
	let loadingImage: boolean = false;
	let uploadLoadImageStatus: boolean = false;
	let uploadProgress: number = 0;

	const fetchProductById = async () => {
		const data = await productService.getAllProducts();
		productById = data.find((product: IProduct) => product.product_id === $page.params.id);
	};

	onMount(() => {
		fetchProductById();
	});

	let images: { public_id: string; url: string } = { public_id: '', url: '' };

	const handleUploadImage = async (e: Event) => {
		loadingImage = true;
		const inputElement = e.target as HTMLInputElement;
		const files = inputElement.files?.[0];
		const response = await uploadService.uploadImage(
			files!,
			(progressEvent: AxiosProgressEvent) => {
				uploadProgress = Math.round((progressEvent.loaded / progressEvent.total!) * 100);
			}
		);
		images = response;
		loadingImage = false;
	};

	const handleRemoveImage = async (id: string) => {
		uploadLoadImageStatus = true;
		await uploadService.deleteImage(id);
		images = { public_id: '', url: '' };
		uploadLoadImageStatus = false;
	};

	const handleSubmit = async () => {
		await productService.updateProducts(
			productById._id,
			productById.product_id,
			productById.title,
			productById.price,
			productById.description,
			productById.content,
			productById.category,
			images
		);
		toast.success('Update created successfully');
		setTimeout(() => {
			window.location.href = '/';
		}, 1000);
	};

	$: {
		images = productById?.images;
	}
</script>

<section class="max-w-4xl p-6 mx-auto bg-gray-50 rounded-md shadow-md my-5">
	<h1 class="text-xl font-bold text-black capitalize">Edit Product</h1>
	{#if productById}
		<form>
			<div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
				<div>
					<label class="text-black" for="product_id">Product Id</label>
					<input
						id="product_id"
						type="text"
						class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
						bind:value={productById.product_id}
					/>
				</div>

				<div>
					<label class="text-black" for="product_title">Product Title</label>
					<input
						id="product_title"
						type="text"
						class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
						bind:value={productById.title}
					/>
				</div>

				<div>
					<label class="text-black" for="price">Price</label>
					<input
						id="price"
						type="number"
						class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
						bind:value={productById.price}
					/>
				</div>
				<div>
					<label class="text-black" for="description">Description</label>
					<textarea
						id="description"
						class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
						bind:value={productById.description}
					/>
				</div>
				<div>
					<label class="text-black" for="content">Content</label>
					<input
						id="content"
						type="text"
						class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
						bind:value={productById.content}
					/>
				</div>
				<div>
					<label class="text-black" for="category">Category</label>
					<select
						class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
						bind:value={productById.category}
					>
						<option>Category 1</option>
						<option>Category 2</option>
						<option>Category 3</option>
						<option>Category 4</option>
					</select>
				</div>
				<div>
					<p class="block text-sm font-medium text-black">Image</p>
					<div class="flex justify-end">
						{#if images.url !== '' || images.public_id !== ''}
							<button on:click={() => handleRemoveImage(images.public_id)}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6 text-red-600 cursor-pointer"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</button>
						{/if}
					</div>
					<div
						class="mt-1 flex justify-center pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
					>
						<div class="space-y-1 text-center">
							{#if (images.url === '' || images.public_id === '') && uploadLoadImageStatus === false}
								<svg
									class="mx-auto h-12 w-12 text-black"
									stroke="currentColor"
									fill="none"
									viewBox="0 0 48 48"
									aria-hidden="true"
								>
									<path
										d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>

								<div class="flex text-sm text-gray-600">
									<label
										for="file-upload"
										class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
									>
										<span class="">Upload a file</span>
										<input
											id="file-upload"
											name="file-upload"
											type="file"
											class="sr-only"
											on:change={handleUploadImage}
										/>
									</label>
									<p class="pl-1 text-black">or drag and drop</p>
								</div>
								<p class="text-xs text-black">PNG, JPG, GIF up to 10MB</p>
							{:else if uploadLoadImageStatus}
								<svg
									aria-hidden="true"
									class="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
									viewBox="0 0 100 101"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
										fill="currentColor"
									/>
									<path
										d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
										fill="currentFill"
									/>
								</svg>
							{:else}
								<img src={images.url} alt={images.public_id} />
							{/if}
						</div>
					</div>
					{#if loadingImage}
						<div>
							<p class="block text-sm font-medium text-black">Progress {uploadProgress}%</p>
							<div class="w-full bg-gray-200 mt-2 rounded-full h-2.5">
								<div class="bg-blue-600 h-2.5 rounded-full" style="width: {uploadProgress}%" />
							</div>
						</div>
					{/if}
				</div>
			</div>

			<div class="flex justify-end mt-6">
				<button
					type="button"
					class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-700 focus:outline-none focus:bg-gray-600"
					on:click={() => handleSubmit()}>Save</button
				>
			</div>
		</form>
	{/if}
</section>
