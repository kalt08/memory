<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
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

<div class="flex flex-col min-h-screen">
	<Header title="Choose Category" showBack={true} />

	<main class="flex-1 flex flex-col p-6 w-full max-w-md mx-auto mt-4">
		<h2 class="text-3xl font-display font-bold text-[var(--color-on-surface)] mb-8 tracking-tight">What do you want to match?</h2>
		
		<div class="flex flex-col gap-4">
			{#each categories as cat}
				<button
					class="flex items-center gap-4 p-6 w-full rounded-3xl bg-[var(--color-surface-container-low)] hover:bg-[var(--color-surface-container)] transition-all duration-300 active:scale-[0.98] text-left border-2 border-transparent hover:border-[var(--color-primary-container)]/50 focus:outline-none"
					onclick={() => selectCategory(cat.id)}
				>
					<div class="w-14 h-14 rounded-[1.25rem] bg-[var(--color-surface-container-highest)] flex items-center justify-center text-2xl shadow-sm">
						{cat.icon}
					</div>
					<span class="text-xl font-bold text-[var(--color-on-surface)]">{cat.label}</span>
				</button>
			{/each}
		</div>
	</main>
</div>
