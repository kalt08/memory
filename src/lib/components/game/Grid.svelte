<script lang="ts">
	import type { Snippet } from 'svelte';

	let { columns, children }: { columns: 4 | 6 | 10; children: Snippet } = $props();

	// Smaller gap for denser grids
	const gap = $derived(columns === 10 ? 'gap-1.5' : columns === 6 ? 'gap-2' : 'gap-3');
	const maxWidth = $derived(columns === 10 ? 'max-w-5xl' : columns === 6 ? 'max-w-lg' : 'max-w-[320px]');
</script>

<div
	class="mx-auto grid w-full px-4 {gap} {maxWidth}"
	style="grid-template-columns: repeat({columns}, minmax(0, 1fr)); max-width: min(var(--max-w-val, 100%), {columns === 10 ? '120dvh' : '65dvh'});"
>
	{@render children()}
</div>

