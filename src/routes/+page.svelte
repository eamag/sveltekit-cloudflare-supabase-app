<svelte:head>
    <title>Open Data Science community history</title>
</svelte:head>

<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	let searchTermReaction = '';
	let searchTermChannel = '';
	let reactions = data.all_reactions;
	let channels = data.all_channels;

	$: filteredReactions = reactions
		? reactions.filter((reaction) =>
				reaction.name.toLowerCase().includes(searchTermReaction.toLowerCase())
		  )
		: [];

	$: filteredChannels = channels
		? channels.filter((channel) =>
				channel.name.toLowerCase().includes(searchTermChannel.toLowerCase())
		  )
		: [];
</script>

<div class="flex flex-col items-center">
	<div class="m-2 flex flex-col sm:flex-row justify-center max-w-screen-md">
		<a
			role="button"
			class="m-2 btn btn-xs sm:btn-sm md:btn-md lg:btn-lg w-full sm:w-auto"
			href="/most_commented/">Threads with the most comments</a
		>
		<a
			role="button"
			class="m-2 btn btn-xs sm:btn-sm md:btn-md lg:btn-lg w-full sm:w-auto"
			href="/most_reacted/">Threads with the most reactions</a
		>
		<a
			role="button"
			class="m-2 btn btn-xs sm:btn-sm md:btn-md lg:btn-lg w-full sm:w-auto"
			href="/most_reacted?date_from=2021-04-04&date_to=2021-04-10"
			>Threads with the most reactions last week</a
		>
	</div>
	<div class="m-2 w-full">
		<div class="flex w-full">
			<div class="flex-1">
				<input
					type="search"
					placeholder="Search reaction..."
					class="input input-bordered flex-center m-2"
					bind:value={searchTermReaction}
				/>
				<table class="table table-zebra w-full m-2">
					<thead>
						<tr>
							<th>Reaction</th>
							<th>Reaction count</th>
						</tr>
					</thead>
					<tbody>
						{#each filteredReactions?.slice(0, 15) as reaction}
							<tr>
								<td><a class='link' href={`/reaction/${reaction.name}`}>{reaction.name}</a></td>
								<td>{reaction.count}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="flex-1">
				<input
					type="search"
					placeholder="Search channel..."
					class="input input-bordered flex-center m-2"
					bind:value={searchTermChannel}
				/>
				<table class="table table-zebra w-full m-2">
					<thead>
						<tr>
							<th>Channel</th>
							<th>Message Count</th>
						</tr>
					</thead>
					<tbody>
						{#each filteredChannels?.slice(0, 15) as channel}
							<tr>
								<td><a class='link' href={`/channel/${channel.name}`}>{channel.name}</a></td>
								<td>{channel.total_ms_count}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
