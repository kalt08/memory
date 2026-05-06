<script lang="ts">
	import Header from '$lib/components/ui/Header.svelte';
	import { appState } from '$lib/state/app.svelte';
	import { gameState, type Category } from '$lib/state/game.svelte';

	const categories: { id: Category; label: string; icon: string }[] = [
		{ id: 'animals', label: 'Animals', icon: '🐾' },
		{ id: 'nature', label: 'Nature', icon: '🌿' },
		{ id: 'household', label: 'Household', icon: '🏠' },
		{ id: 'mixed', label: 'Mixed', icon: '🎲' }
	];

	function selectCategory(cat: Category) {
		gameState.category = cat;
		appState.goTo('difficulty');
	}
</script>

<div class="flex min-h-screen flex-col">
	<Header title="Choose Category" showBack={true} />

	<main class="mx-auto mt-4 flex w-full max-w-md flex-1 flex-col p-6">
		<h2 class="mb-8 font-display text-3xl font-bold tracking-tight text-[var(--color-on-surface)]">
			What do you want to match?
		</h2>

		<div class="flex flex-col gap-4">
			{#each categories as cat (cat.id)}
				<button
					class="flex w-full items-center gap-4 rounded-3xl border-2 border-transparent bg-[var(--color-surface-container-low)] p-6 text-left transition-all duration-300 hover:border-[var(--color-primary-container)]/50 hover:bg-[var(--color-surface-container)] focus:outline-none active:scale-[0.98]"
					onclick={() => selectCategory(cat.id)}
				>
					<div
						class="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-[var(--color-surface-container-highest)] text-2xl shadow-sm"
					>
						{cat.icon}
					</div>
					<span class="text-xl font-bold text-[var(--color-on-surface)]">{cat.label}</span>
				</button>
			{/each}
		</div>
	</main>
</div>
