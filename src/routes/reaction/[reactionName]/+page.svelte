<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	export let data: PageData;
	import MessageCard from '$lib/MessageCard.svelte';
</script>

<svelte:head>
	<title>Open Data Science (ODS) history by reaction {$page.params.reactionName}</title>
    <meta name="description" content="Top messages sorted by reactions">
</svelte:head>

<div class="">
	{#each data.messages as message}
		<MessageCard {message} />
	{/each}
</div>
