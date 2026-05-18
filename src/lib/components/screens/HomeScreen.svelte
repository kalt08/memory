<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import { appState } from '$lib/state/app.svelte';
</script>

<div class="flex min-h-screen flex-col">
	<Header title="" showBack={false} />

	<main class="-mt-20 flex flex-1 flex-col items-center justify-center p-6">
		<div class="flex w-full max-w-sm flex-col items-center gap-12 text-center">
			<div class="relative flex flex-col gap-4">
				<!-- Decorative floating elements based on Tactile Joy design -->
				<div
					class="absolute -top-8 -left-8 h-16 w-16 animate-pulse rounded-full bg-[var(--color-primary-container)] opacity-50 blur-xl"
				></div>
				<div
					class="absolute -right-8 -bottom-8 h-20 w-20 animate-pulse rounded-full bg-[var(--color-secondary-container)] opacity-50 blur-xl"
					style="animation-delay: 1s;"
				></div>

				<h1
					class="relative z-10 font-display text-6xl leading-tight font-extrabold tracking-tight text-[var(--color-on-surface)]"
				>
					Memory<br />Joy
				</h1>
				<p class="mx-auto max-w-[240px] text-lg font-medium text-[var(--color-on-surface-variant)]">
					Train your brain with premium tactile cards.
				</p>
			</div>

			<div class="mt-4 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
				<Button
					variant="primary"
					onclick={() => appState.goTo('category')}
					class="w-full text-lg sm:w-auto"
				>
					Play Now
				</Button>
				<Button
					variant="secondary"
					onclick={() => appState.goTo('leaderboard')}
					class="w-full text-lg sm:w-auto"
				>
					🏆 Leaderboard
				</Button>
			</div>
		</div>
	</main>
</div>
