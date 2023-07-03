<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	export let data: PageData;
	import MessageCard from '$lib/MessageCard.svelte';
</script>

<svelte:head>
	<title>Open Data Science (ODS) threads in the {$page.params.channelName} channel</title>
	<meta
		name="description"
		content="Top messages sorted by number of comments in {$page
			.params.channelName} channel"
	/>
</svelte:head>

<div class="">
	{#each data.messages as message}
		<MessageCard {message} />
	{/each}
</div>
