<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import MessageCard from '$lib/MessageCard.svelte';
</script>

<svelte:head>
	<title>Open Data Science (ODS) threads with the most comments</title>
	<meta
		name="description"
		content="Top messages sorted by number of comments"
	/>
</svelte:head>

<div class="">
	{#each data.messages as message}
		<MessageCard {message} />
	{/each}
</div>
