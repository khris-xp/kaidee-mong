<script lang="ts">
	import Error from '../../components/Error.svelte';
	import { user } from '../../store/user';
</script>

{#if $user?.role !== 1}
	<Error />
{:else}
	<section class="max-w-4xl p-6 mx-auto bg-gray-50 rounded-md shadow-md my-5">
		<h1 class="text-xl font-bold text-black capitalize">Create Product</h1>
		<form>
			<div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
				<div>
					<label class="text-black" for="product_id">Product Id</label>
					<input
						id="product_id"
						type="text"
						class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
					/>
				</div>

				<div>
					<label class="text-black" for="product_title">Product Title</label>
					<input
						id="product_title"
						type="text"
						class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
					/>
				</div>

				<div>
					<label class="text-black" for="price">Price</label>
					<input
						id="price"
						type="number"
						class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
					/>
				</div>
				<div>
					<label class="text-black" for="description">Description</label>
					<textarea
						id="description"
						class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
					/>
				</div>
				<div>
					<label class="text-black" for="content">Content</label>
					<input
						id="content"
						type="text"
						class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
					/>
				</div>
				<div>
					<label class="text-black" for="category">Category</label>
					<select
						class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
					>
						<option>Category 1</option>
						<option>Category 2</option>
						<option>Category 3</option>
						<option>Category 4</option>
					</select>
				</div>
				<div>
					<p class="block text-sm font-medium text-black">Image</p>
					<div
						class="mt-1 flex justify-center pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
					>
						<div class="space-y-1 text-center">
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
									<input id="file-upload" name="file-upload" type="file" class="sr-only" />
								</label>
								<p class="pl-1 text-black">or drag and drop</p>
							</div>
							<p class="text-xs text-black">PNG, JPG, GIF up to 10MB</p>
						</div>
					</div>
				</div>
			</div>

			<div class="flex justify-end mt-6">
				<button
					class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-700 focus:outline-none focus:bg-gray-600"
					>Save</button
				>
			</div>
		</form>
	</section>
{/if}
