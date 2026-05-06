<script lang="ts">
	import Header from '$lib/components/ui/Header.svelte';
	import { appState } from '$lib/state/app.svelte';
	import { gameState, type Difficulty } from '$lib/state/game.svelte';

	const difficulties: { id: Difficulty; label: string; desc: string; size: string }[] = [
		{ id: 'easy', label: 'Easy', desc: 'A quick warm-up session.', size: '4x4' },
		{ id: 'medium', label: 'Medium', desc: 'The classic memory challenge.', size: '6x6' },
		{ id: 'hard', label: 'Hard', desc: 'For true memory masters.', size: '8x8' }
	];

	function selectDifficulty(diff: Difficulty) {
		gameState.start(diff, gameState.category);
		appState.goTo('game');
	}
</script>

<div class="flex flex-col min-h-screen">
	<Header title="Difficulty" showBack={true} />

	<main class="flex-1 flex flex-col p-6 w-full max-w-md mx-auto mt-4">
		<h2 class="text-3xl font-display font-bold text-[var(--color-on-surface)] mb-8 tracking-tight">Select your challenge</h2>
		
		<div class="flex flex-col gap-4">
			{#each difficulties as diff}
				<button
					class="flex items-center justify-between p-6 w-full rounded-3xl bg-[var(--color-surface-container-low)] hover:bg-[var(--color-surface-container)] transition-all duration-300 active:scale-[0.98] text-left border-2 border-transparent hover:border-[var(--color-primary-container)]/50 focus:outline-none"
					onclick={() => selectDifficulty(diff.id)}
				>
					<div class="flex flex-col gap-1 pr-4">
						<span class="text-xl font-bold text-[var(--color-on-surface)]">{diff.label}</span>
						<span class="text-sm font-medium text-[var(--color-on-surface-variant)]">{diff.desc}</span>
					</div>
					<div class="flex-shrink-0 w-12 h-12 rounded-[1rem] bg-[var(--color-primary-container)]/30 flex items-center justify-center text-sm font-bold text-[var(--color-primary)]">
						{diff.size}
					</div>
				</button>
			{/each}
		</div>
	</main>
</div>
