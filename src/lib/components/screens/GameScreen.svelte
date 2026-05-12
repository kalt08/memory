<script lang="ts">
	import Header from '$lib/components/ui/Header.svelte';
	import Grid from '$lib/components/game/Grid.svelte';
	import Card from '$lib/components/game/Card.svelte';
	import { gameState } from '$lib/state/game.svelte';
	import { appState } from '$lib/state/app.svelte';

	// Watch for victory
	$effect(() => {
		if (
			!gameState.isPlaying &&
			gameState.cards.length > 0 &&
			gameState.cards.every((c) => c.isMatched)
		) {
			// Delay slightly so the user sees the last match before screen change
			setTimeout(() => {
				appState.goTo('victory');
			}, 800);
		}
	});

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}
</script>

<div class="flex h-[100dvh] flex-col overflow-hidden">
	<Header title="Level {gameState.difficulty}" showBack={true} />

	<main class="mx-auto flex w-full flex-1 flex-col overflow-hidden pb-2">
		<!-- HUD (Heads Up Display) -->
		<div class="mx-auto mt-1 mb-3 flex w-full max-w-md items-center justify-between px-6">
			<div class="flex flex-col">
				<span
					class="text-xs font-bold tracking-widest text-[var(--color-on-surface-variant)] uppercase"
					>Moves</span
				>
				<span class="font-display text-2xl font-bold text-[var(--color-on-surface)]"
					>{gameState.moves}</span
				>
			</div>

			<div class="flex flex-col items-end">
				<span
					class="text-xs font-bold tracking-widest text-[var(--color-on-surface-variant)] uppercase"
					>Time</span
				>
				<span class="font-display text-2xl font-bold text-[var(--color-on-surface)]"
					>{formatTime(gameState.timeSeconds)}</span
				>
			</div>
		</div>

		<!-- Game Grid -->
		<div class="flex min-h-0 flex-1 items-center justify-center">
			<Grid
				columns={gameState.difficulty === 'easy' ? 4 : gameState.difficulty === 'medium' ? 6 : 8}
			>
				{#each gameState.cards as card (card.id)}
					<Card {card} onclick={() => gameState.flipCard(card)} />
				{/each}
			</Grid>
		</div>
	</main>
</div>
