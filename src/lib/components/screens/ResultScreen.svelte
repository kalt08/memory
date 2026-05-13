<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import { appState } from '$lib/state/app.svelte';
	import { gameState } from '$lib/state/game.svelte';

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}
</script>

<div class="flex min-h-screen flex-col">
	<Header title="Game Result" showBack={true} />

	<main class="-mt-20 flex flex-1 flex-col items-center justify-center p-6">
		<div class="flex w-full max-w-sm flex-col items-center gap-10 text-center">
			<div class="relative flex h-40 w-40 items-center justify-center">
				<div
					class="absolute inset-0 animate-ping rounded-full bg-[var(--color-primary-container)] opacity-30"
					style="animation-duration: 3s;"
				></div>
				<div
					class="absolute inset-4 rounded-full bg-[var(--color-primary-container)] opacity-60"
				></div>
				<span class="relative z-10 text-7xl select-none">
					{#if gameState.mode === 'bot'}
						{gameState.playerScores.player > gameState.playerScores.bot ? '👑' : 
						 gameState.playerScores.player < gameState.playerScores.bot ? '🦾' : '🤝'}
					{:else}
						👑
					{/if}
				</span>
			</div>

			<div class="flex flex-col gap-2">
				<h1
					class="font-display text-5xl font-extrabold tracking-tight text-[var(--color-on-surface)]"
				>
					{#if gameState.mode === 'bot'}
						{gameState.playerScores.player > gameState.playerScores.bot ? 'You Won!' : 
						 gameState.playerScores.player < gameState.playerScores.bot ? 'Bot Won!' : 'It\'s a Tie!'}
					{:else}
						Level<br />Cleared
					{/if}
				</h1>
				<p class="mt-2 text-lg font-medium text-[var(--color-on-surface-variant)]">
					{gameState.mode === 'bot' 
						? `Final Score: ${gameState.playerScores.player} vs ${gameState.playerScores.bot}`
						: `You mastered the ${gameState.difficulty} grid!`}
				</p>
			</div>

			<div
				class="flex w-full justify-center gap-8 rounded-3xl bg-[var(--color-surface-container-low)] px-8 py-6 shadow-sm"
			>
				{#if gameState.mode === 'solo'}
					<div class="flex flex-col items-center">
						<span
							class="mb-1 text-xs font-bold tracking-widest text-[var(--color-on-surface-variant)] uppercase"
							>Moves</span
						>
						<span class="font-display text-3xl font-bold text-[var(--color-primary)]"
							>{gameState.moves}</span
						>
					</div>
					<div class="w-px bg-[var(--color-outline-variant)]/30"></div>
					<div class="flex flex-col items-center">
						<span
							class="mb-1 text-xs font-bold tracking-widest text-[var(--color-on-surface-variant)] uppercase"
							>Time</span
						>
						<span class="font-display text-3xl font-bold text-[var(--color-primary)]"
							>{formatTime(gameState.timeSeconds)}</span
						>
					</div>
				{:else}
					<div class="flex flex-col items-center">
						<span
							class="mb-1 text-xs font-bold tracking-widest text-[var(--color-on-surface-variant)] uppercase"
							>You</span
						>
						<span class="font-display text-3xl font-bold text-[var(--color-primary)]"
							>{gameState.playerScores.player}</span
						>
					</div>
					<div class="w-px bg-[var(--color-outline-variant)]/30"></div>
					<div class="flex flex-col items-center">
						<span
							class="mb-1 text-xs font-bold tracking-widest text-[var(--color-on-surface-variant)] uppercase"
							>Bot</span
						>
						<span class="font-display text-3xl font-bold text-[var(--color-secondary, #9c4046)]"
							>{gameState.playerScores.bot}</span
						>
					</div>
				{/if}
			</div>

			<Button variant="primary" onclick={() => appState.goTo('home')} class="mt-4 w-full text-lg">
				Play Again
			</Button>
		</div>
	</main>
</div>
