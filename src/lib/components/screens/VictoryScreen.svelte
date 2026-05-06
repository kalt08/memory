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

<div class="flex flex-col min-h-screen">
	<Header title="Victory!" showBack={true} />

	<main class="flex-1 flex flex-col items-center justify-center p-6 -mt-20">
		<div class="w-full max-w-sm flex flex-col items-center gap-10 text-center">
			
			<div class="relative w-40 h-40 flex items-center justify-center">
				<div class="absolute inset-0 bg-[var(--color-primary-container)] rounded-full opacity-30 animate-ping" style="animation-duration: 3s;"></div>
				<div class="absolute inset-4 bg-[var(--color-primary-container)] rounded-full opacity-60"></div>
				<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="relative z-10">
					<path d="M12 15V3" />
					<path d="m8 7 4-4 4 4" />
					<path d="M20 21H4" />
				</svg>
			</div>

			<div class="flex flex-col gap-2">
				<h1 class="text-5xl font-display font-extrabold text-[var(--color-on-surface)] tracking-tight">
					Level<br/>Cleared
				</h1>
				<p class="text-[var(--color-on-surface-variant)] text-lg font-medium mt-2">
					You mastered the {gameState.difficulty} grid!
				</p>
			</div>

			<div class="flex gap-8 bg-[var(--color-surface-container-low)] px-8 py-6 rounded-3xl w-full justify-center shadow-sm">
				<div class="flex flex-col items-center">
					<span class="text-xs uppercase tracking-widest font-bold text-[var(--color-on-surface-variant)] mb-1">Moves</span>
					<span class="text-3xl font-display font-bold text-[var(--color-primary)]">{gameState.moves}</span>
				</div>
				<div class="w-px bg-[var(--color-outline-variant)]/30"></div>
				<div class="flex flex-col items-center">
					<span class="text-xs uppercase tracking-widest font-bold text-[var(--color-on-surface-variant)] mb-1">Time</span>
					<span class="text-3xl font-display font-bold text-[var(--color-primary)]">{formatTime(gameState.timeSeconds)}</span>
				</div>
			</div>

			<Button variant="primary" onclick={() => appState.goTo('home')} class="w-full mt-4 text-lg">
				Play Again
			</Button>
		</div>
	</main>
</div>
