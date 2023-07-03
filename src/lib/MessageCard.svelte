<!-- src/components/MessageCard.svelte -->
<script lang="ts">
	type Message = {
		text: string;
		channel_name: string;
		thread_ts: string;
		ts: string;
		count: number;
		top_reactions: { [key: string]: number };
	};

	export let message: Message;
	import { unixTimestampToTime } from '../utils';
</script>

{#if message.text}
	<div class="card bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">
				In #{message.channel_name} on {unixTimestampToTime(
					message.thread_ts ? message.thread_ts: message.ts
				)}
				{#if message.count}
					with {message.count} reactions
				{/if}
			</h2>
			<div class="collapse collapse-arrow">
				<input type="checkbox" />
				<div class="collapse-title text-l font-medium">
					{message.text.split(' ').slice(0, 15).join(' ') + '...'}
				</div>
				<div class="collapse-content">
					<p class="">{message.text}</p>
				</div>
			</div>
			{#if message.thread_ts}
				<div class="card-actions justify-end">
					<a role="button" class="btn" href={`/thread/${message.thread_ts}`}>Open thread</a>
				</div>
			{/if}
		</div>
	</div>
{/if}
