<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	function unixTimestampToTime(timestamp: string): string {
		const intTimestamp = parseInt(timestamp);
		return new Date(intTimestamp * 1000).toLocaleString();
	}
	let imageErrors: Record<string, boolean> = {};
</script>
<svelte:head>
    <title>Open Data Science community history thread</title>
    <meta name="description" content="Great thread">
</svelte:head>

<div class="max-w-full min-h-screen">
	{#each data.messages as message}
		<div class="chat {message.ts == message.thread_ts ? 'chat-start' : 'chat-end'}">
			{#if message.users.image_original && !imageErrors[message.ts]}
				<div class="chat-image avatar">
					<div class="w-10 rounded-full">
						<img
							src="https://api.dicebear.com/6.x/pixel-art/svg?seed={message.users.id}"
							on:error={() => (imageErrors = { ...imageErrors, [message.ts]: true })}
							alt="avatar"
						/>
					</div>
				</div>
			{/if}
			<div class="chat-header">
				{message.users.id}
				<time class="text-xs opacity-50">{unixTimestampToTime(message.ts)}</time>
			</div>
			<div class="chat-bubble text-ellipsis overflow-hidden">{message.text}</div>
		</div>
	{/each}
</div>
