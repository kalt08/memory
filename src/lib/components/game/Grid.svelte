<script lang="ts">
	import type { Snippet } from 'svelte';

	let { columns, children }: { columns: 4 | 6 | 8; children: Snippet } = $props();
</script>

<div
	class="mx-auto grid w-full max-w-3xl gap-3 px-4"
	style="grid-template-columns: repeat({columns}, minmax(0, 1fr));"
>
	{@render children()}
</div>
