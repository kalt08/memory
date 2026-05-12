<script lang="ts">
	import type { Snippet } from 'svelte';

	let { columns, children }: { columns: 4 | 6 | 8; children: Snippet } = $props();

	// Smaller gap for denser grids
	const gap = $derived(columns === 8 ? 'gap-1.5' : columns === 6 ? 'gap-2' : 'gap-3');
</script>

<div
	class="mx-auto grid h-full w-full max-w-3xl px-4 {gap}"
	style="grid-template-columns: repeat({columns}, minmax(0, 1fr)); grid-template-rows: repeat({columns}, minmax(0, 1fr));"
>
	{@render children()}
</div>
