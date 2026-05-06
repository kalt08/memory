<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import { appState } from '$lib/state/app.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<Header title="" showBack={false} />

	<main class="flex-1 flex flex-col items-center justify-center p-6 -mt-20">
		<div class="w-full max-w-sm flex flex-col items-center gap-12 text-center">
			<div class="flex flex-col gap-4 relative">
				<!-- Decorative floating elements based on Tactile Joy design -->
				<div class="absolute -top-8 -left-8 w-16 h-16 bg-[var(--color-primary-container)] rounded-full opacity-50 blur-xl animate-pulse"></div>
				<div class="absolute -bottom-8 -right-8 w-20 h-20 bg-[var(--color-secondary-container)] rounded-full opacity-50 blur-xl animate-pulse" style="animation-delay: 1s;"></div>
				
				<h1 class="text-6xl font-display font-extrabold text-[var(--color-on-surface)] leading-tight tracking-tight relative z-10">
					Memory<br />Joy
				</h1>
				<p class="text-[var(--color-on-surface-variant)] text-lg font-medium max-w-[240px] mx-auto">
					Train your brain with premium tactile cards.
				</p>
			</div>

			<Button variant="primary" onclick={() => appState.goTo('category')} class="w-full sm:w-auto mt-4 text-lg">
				Play Now
			</Button>
		</div>
	</main>
</div>
