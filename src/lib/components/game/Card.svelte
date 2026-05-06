<script lang="ts">
	import type { Card } from '$lib/state/game.svelte';

	let { card, onclick }: { card: Card; onclick: () => void } = $props();
</script>

<button
	class="relative aspect-square w-full cursor-pointer transition-transform duration-300 [perspective:1000px] active:scale-95"
	{onclick}
	aria-label="Flip card"
	disabled={card.isFlipped || card.isMatched}
>
	<div
		class="h-full w-full shadow-[0_4px_20px_rgba(0,104,90,0.08)] transition-all duration-500 [transform-style:preserve-3d]"
		class:rotate-y-180={card.isFlipped || card.isMatched}
	>
		<!-- Card Back (Cover) -->
		<div
			class="absolute inset-0 flex h-full w-full items-center justify-center rounded-[1.5rem] border border-[var(--color-surface-container-highest)] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-container)] shadow-[var(--color-on-surface)]/5 shadow-sm [backface-visibility:hidden] md:rounded-[2rem]"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 24 24"
				fill="none"
				stroke="var(--color-on-primary)"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="opacity-60"
			>
				<path d="M12 2v20" />
				<path d="M2 12h20" />
				<circle cx="12" cy="12" r="10" />
			</svg>
		</div>

		<!-- Card Front (Image) -->
		<div
			class="absolute inset-0 h-full w-full [transform:rotateY(180deg)] overflow-hidden rounded-[1.5rem] bg-[var(--color-surface-container-lowest)] shadow-[var(--color-on-surface)]/5 shadow-sm ring-[3px] transition-all duration-300 [backface-visibility:hidden] md:rounded-[2rem]"
			class:ring-[var(--color-primary-container)]={card.isMatched}
			class:ring-transparent={!card.isMatched}
		>
			<img
				src={card.imageUrl}
				alt="Memory card"
				class="h-full w-full rounded-[1.5rem] object-cover p-1 md:rounded-[2rem]"
			/>
			{#if card.isMatched}
				<div
					class="animate-in fade-in absolute inset-0 flex items-center justify-center bg-[var(--color-primary-container)]/20 duration-300"
				>
					<div class="rounded-full bg-[var(--color-surface-container-lowest)] p-2 shadow-sm">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="var(--color-primary)"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
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
