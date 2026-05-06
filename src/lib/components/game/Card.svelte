<script lang="ts">
	import type { Card } from '$lib/state/game.svelte';

	let { card, onclick }: { card: Card; onclick: () => void } = $props();
</script>

<button
	class="relative w-full aspect-square cursor-pointer [perspective:1000px] active:scale-95 transition-transform duration-300"
	{onclick}
	aria-label="Flip card"
	disabled={card.isFlipped || card.isMatched}
>
	<div
		class="w-full h-full transition-all duration-500 [transform-style:preserve-3d] shadow-[0_4px_20px_rgba(0,104,90,0.08)]"
		class:rotate-y-180={card.isFlipped || card.isMatched}
	>
		<!-- Card Back (Cover) -->
		<div
			class="absolute inset-0 w-full h-full rounded-[1.5rem] md:rounded-[2rem] [backface-visibility:hidden] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-container)] border border-[var(--color-surface-container-highest)] flex items-center justify-center shadow-sm shadow-[var(--color-on-surface)]/5"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-on-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-60">
				<path d="M12 2v20" />
				<path d="M2 12h20" />
				<circle cx="12" cy="12" r="10" />
			</svg>
		</div>

		<!-- Card Front (Image) -->
		<div
			class="absolute inset-0 w-full h-full rounded-[1.5rem] md:rounded-[2rem] [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden shadow-sm shadow-[var(--color-on-surface)]/5 bg-[var(--color-surface-container-lowest)] transition-all duration-300 ring-[3px]"
			class:ring-[var(--color-primary-container)]={card.isMatched}
			class:ring-transparent={!card.isMatched}
		>
			<img src={card.imageUrl} alt="Memory card" class="w-full h-full object-cover p-1 rounded-[1.5rem] md:rounded-[2rem]" />
			{#if card.isMatched}
				<div class="absolute inset-0 bg-[var(--color-primary-container)]/20 flex items-center justify-center animate-in fade-in duration-300">
					<div class="bg-[var(--color-surface-container-lowest)] rounded-full p-2 shadow-sm">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="20 6 9 17 4 12" />
						</svg>
					</div>
				</div>
			{/if}
		</div>
	</div>
</button>

<style>
	.rotate-y-180 {
		transform: rotateY(180deg);
	}
</style>
