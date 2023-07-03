<script lang='ts'>
	import '../app.css';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let currentPage: number;

	$: {
		const queryPage = $page.url.searchParams.get('page');
		currentPage = queryPage ? parseInt(queryPage) : 1;
	}

	async function handleClick(page: number, direction: string) {
		let newPage: number;
		if (direction === '+') {
			newPage = page + 1;
		} else if (direction === '-') {
			newPage = page - 1;
		} else {
			newPage = page;
		}

		// Make sure newPage is at least 1
		newPage = Math.max(newPage, 1);

		// Navigate to the new page
		await goto(`?page=${newPage}`);
	}
</script>

<nav>
	<div class="navbar bg-base-100">
		<div class="navbar-start">
		</div>
		<div class="navbar-center">
			<a class="btn btn-ghost normal-case text-xl" href="/">History</a>
		</div>
		<div class="navbar-end">
		</div>
	</div>
</nav>
<slot />
<div class="btn-group flex justify-center">
	<button on:click={() => handleClick(currentPage, '-')} class="btn">«</button>
	<button class="btn">Page {currentPage}</button>
	<button on:click={() => handleClick(currentPage, '+')} class="btn">»</button>
</div>