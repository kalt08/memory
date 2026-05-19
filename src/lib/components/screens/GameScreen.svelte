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
				appState.goTo('result', true);
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
		<div class="mx-auto mt-1 mb-6 flex w-full max-w-md items-center justify-between px-6">
			{#if gameState.mode === 'solo'}
				<div class="flex flex-col">
					<span class="text-xs font-bold tracking-widest text-[var(--color-on-surface-variant)] uppercase">Moves</span>
					<span class="font-display text-2xl font-bold text-[var(--color-on-surface)]">{gameState.moves}</span>
				</div>

				<div class="flex flex-col items-end">
					<span class="text-xs font-bold tracking-widest text-[var(--color-on-surface-variant)] uppercase">Time</span>
					<span class="font-display text-2xl font-bold text-[var(--color-on-surface)]">{formatTime(gameState.timeSeconds)}</span>
				</div>
			{:else}
				<!-- VS Bot HUD -->
				<div class="flex flex-1 items-center justify-between gap-4">
					<div class="flex flex-col items-center gap-1 transition-all duration-300 {gameState.currentPlayer === 'player' ? 'scale-110' : 'opacity-50'}">
						<span class="text-[10px] font-bold tracking-widest text-[var(--color-primary)] uppercase">Player</span>
						<div class="flex h-12 w-16 items-center justify-center rounded-2xl bg-[var(--color-primary-container)]/20 font-display text-2xl font-bold text-[var(--color-primary)]">
							{gameState.playerScores.player}
						</div>
						{#if gameState.currentPlayer === 'player'}
							<div class="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]"></div>
						{/if}
					</div>

					<div class="flex flex-col items-center">
						<span class="text-[10px] font-bold text-[var(--color-on-surface-variant)] uppercase italic">vs</span>
					</div>

					<div class="flex flex-col items-center gap-1 transition-all duration-300 {gameState.currentPlayer === 'bot' ? 'scale-110' : 'opacity-50'}">
						<span class="text-[10px] font-bold tracking-widest text-[var(--color-secondary, #9c4046)] uppercase">Bot</span>
						<div class="flex h-12 w-16 items-center justify-center rounded-2xl bg-[var(--color-secondary-container, #ffdada)]/20 font-display text-2xl font-bold text-[var(--color-secondary, #9c4046)]">
							{gameState.playerScores.bot}
						</div>
						{#if gameState.currentPlayer === 'bot'}
							<div class="h-1.5 w-1.5 rounded-full bg-[var(--color-secondary, #9c4046)]"></div>
						{/if}
					</div>
				</div>
			{/if}
		</div>

		<!-- Game Grid -->
		<div class="flex min-h-0 flex-1 items-center justify-center">
			<Grid
				columns={gameState.difficulty === 'easy' ? 4 : gameState.difficulty === 'medium' ? 6 : 10}
			>
				{#each gameState.cards as card (card.id)}
					<Card 
						{card} 
						onclick={() => {
							if (gameState.mode === 'bot' && gameState.currentPlayer === 'bot') return;
							gameState.flipCard(card);
						}} 
					/>
				{/each}
			</Grid>
		</div>
	</main>
</div>
