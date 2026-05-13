<script lang="ts">
	import Header from '$lib/components/ui/Header.svelte';
	import { appState } from '$lib/state/app.svelte';
	import { gameState, type Difficulty } from '$lib/state/game.svelte';

	const difficulties: { id: Difficulty; label: string; desc: string; size: string }[] = [
		{ id: 'easy', label: 'Easy', desc: 'A quick warm-up session.', size: '4x4' },
		{ id: 'medium', label: 'Medium', desc: 'The classic memory challenge.', size: '6x6' },
		{ id: 'hard', label: 'Hard', desc: 'For true memory masters.', size: '10x6' }
	];

	function selectDifficulty(diff: Difficulty) {
		gameState.start(diff, gameState.category);
		appState.goTo('game');
	}
</script>

<div class="flex min-h-screen flex-col">
	<Header title="Difficulty" showBack={true} />

	<main class="mx-auto mt-4 flex w-full max-w-md flex-1 flex-col p-6">
		<h2 class="mb-8 font-display text-3xl font-bold tracking-tight text-[var(--color-on-surface)]">
			Select your challenge
		</h2>

		<div class="flex flex-col gap-4">
			{#each difficulties as diff (diff.id)}
				<button
					class="flex w-full items-center justify-between rounded-3xl border-2 border-transparent bg-[var(--color-surface-container-low)] p-6 text-left transition-all duration-300 hover:border-[var(--color-primary-container)]/50 hover:bg-[var(--color-surface-container)] focus:outline-none active:scale-[0.98]"
					onclick={() => selectDifficulty(diff.id)}
				>
					<div class="flex flex-col gap-1 pr-4">
						<span class="text-xl font-bold text-[var(--color-on-surface)]">{diff.label}</span>
						<span class="text-sm font-medium text-[var(--color-on-surface-variant)]"
							>{diff.desc}</span
						>
					</div>
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[1rem] bg-[var(--color-primary-container)]/30 text-sm font-bold text-[var(--color-primary)]"
					>
						{diff.size}
					</div>
				</button>
			{/each}
		</div>
	</main>
</div>
