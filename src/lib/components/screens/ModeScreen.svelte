<script lang="ts">
	import Header from '$lib/components/ui/Header.svelte';
	import { appState } from '$lib/state/app.svelte';
	import { gameState, type GameMode } from '$lib/state/game.svelte';

	const modes: { id: GameMode; label: string; desc: string; icon: string }[] = [
		{ 
			id: 'solo', 
			label: 'Solo Play', 
			desc: 'The classic experience. Beat your own records.', 
			icon: '👤' 
		},
		{ 
			id: 'bot', 
			label: 'vs. Bot', 
			desc: 'Challenge our tactical AI. Take turns to find pairs.', 
			icon: '🤖' 
		}
	];

	function selectMode(mode: GameMode) {
		gameState.start(gameState.difficulty, gameState.category, mode);
		appState.goTo('game');
	}
</script>

<div class="flex h-[100dvh] flex-col overflow-hidden">
	<Header title="Choose Mode" showBack={true} />

	<main class="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center p-6 pb-12">
		<div class="mb-12 text-center">
			<h2 class="font-display text-3xl font-extrabold text-[var(--color-on-surface)]">
				How do you want to play?
			</h2>
			<p class="mt-2 text-[var(--color-on-surface-variant)]">
				Select your preferred game style.
			</p>
		</div>

		<div class="grid gap-4">
			{#each modes as mode}
				<button
					class="group relative flex w-full items-center justify-between rounded-3xl border-2 border-transparent bg-[var(--color-surface-container-low)] p-6 text-left transition-all duration-300 hover:border-[var(--color-primary-container)]/50 hover:bg-[var(--color-surface-container)] active:scale-[0.98]"
					onclick={() => selectMode(mode.id)}
				>
					<div class="flex items-center gap-6">
						<div
							class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary-container)]/20 text-4xl transition-transform duration-300 group-hover:scale-110"
						>
							{mode.icon}
						</div>
						<div>
							<h3 class="font-display text-xl font-bold text-[var(--color-on-surface)]">
								{mode.label}
							</h3>
							<p class="text-sm text-[var(--color-on-surface-variant)]">
								{mode.desc}
							</p>
						</div>
					</div>

					<div
						class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-surface-container-highest)] text-[var(--color-on-surface-variant)] transition-colors group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-on-primary)]"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="h-6 w-6"
						>
							<path
								fill-rule="evenodd"
								d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
				</button>
			{/each}
		</div>
	</main>
</div>
