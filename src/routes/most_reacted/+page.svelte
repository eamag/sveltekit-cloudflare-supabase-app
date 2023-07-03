<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import MessageCard from '$lib/MessageCard.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let startDate: string = $page.url.searchParams.get('date_from') || '';
	let endDate: string = $page.url.searchParams.get('date_to') || '';
	const redirectTo = async () => {
		if (startDate && endDate) {
			const { url } = $page;
			await goto(`${url.pathname}?date_from=${startDate}&date_to=${endDate}`);
		}
	};
</script>

<svelte:head>
	<title>Open Data Science (ODS) threads with the most reactions</title>
    <meta name="description" content="Top messages sorted by reactions">
</svelte:head>

<div class="">
	<div class="flex justify-center">
		<div class="m-2 form-control">
			<label for="start" class="label">
				<span class="label-text">Start date:</span>
			</label>
			<input type="date" id="start" class="input input-bordered" bind:value={startDate} />
		</div>
		<div class="m-2 form-control">
			<label for="end" class="label">
				<span class="label-text">End date:</span>
			</label>
			<input type="date" id="end" class="input input-bordered" bind:value={endDate} />
		</div>
		<button class="m-2 btn btn-primary" on:click={() => redirectTo()}>Filter by dates</button>
	</div>

	{#each data.messages as message}
		<MessageCard {message} />
	{/each}
</div>
