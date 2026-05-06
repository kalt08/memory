<script lang="ts">
	import Header from '$lib/components/ui/Header.svelte';
	import Grid from '$lib/components/game/Grid.svelte';
	import Card from '$lib/components/game/Card.svelte';
	import { gameState } from '$lib/state/game.svelte';
	import { appState } from '$lib/state/app.svelte';

	// Watch for victory
	$effect(() => {
		if (!gameState.isPlaying && gameState.cards.length > 0 && gameState.cards.every(c => c.isMatched)) {
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

<div class="flex flex-col min-h-screen">
	<Header title="Level {gameState.difficulty}" showBack={true} />

	<main class="flex-1 flex flex-col w-full mx-auto pb-12">
		<!-- HUD (Heads Up Display) -->
		<div class="flex justify-between items-center w-full max-w-md mx-auto px-6 mb-8 mt-2">
			<div class="flex flex-col">
				<span class="text-xs uppercase tracking-widest font-bold text-[var(--color-on-surface-variant)]">Moves</span>
				<span class="text-2xl font-display font-bold text-[var(--color-on-surface)]">{gameState.moves}</span>
			</div>
			
			<div class="flex flex-col items-end">
				<span class="text-xs uppercase tracking-widest font-bold text-[var(--color-on-surface-variant)]">Time</span>
				<span class="text-2xl font-display font-bold text-[var(--color-on-surface)]">{formatTime(gameState.timeSeconds)}</span>
			</div>
		</div>

		<!-- Game Grid -->
		<div class="flex-1 flex items-center justify-center">
			<Grid columns={gameState.difficulty === 'easy' ? 4 : gameState.difficulty === 'medium' ? 6 : 8}>
				{#each gameState.cards as card (card.id)}
					<Card {card} onclick={() => gameState.flipCard(card)} />
				{/each}
			</Grid>
		</div>
	</main>
</div>
