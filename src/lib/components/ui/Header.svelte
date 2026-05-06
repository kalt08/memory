<script lang="ts">
	import { appState } from '$lib/state/app.svelte';

	let { title, showBack = false }: { title: string; showBack?: boolean } = $props();

	function handleBack() {
		// Define the flow
		switch (appState.currentScreen) {
			case 'category':
				appState.goTo('home');
				break;
			case 'difficulty':
				appState.goTo('category');
				break;
			case 'game':
				appState.goTo('difficulty');
				break;
			case 'victory':
				appState.goTo('home');
				break;
			default:
				appState.goTo('home');
		}
	}
</script>

<header class="flex items-center justify-between py-6 px-6 relative z-10 w-full max-w-md mx-auto">
	<div class="w-12 h-12 flex items-center justify-start">
		{#if showBack}
			<button
				onclick={handleBack}
				class="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-surface-container)] hover:bg-[var(--color-surface-container-high)] transition-colors text-[var(--color-on-surface)]"
				aria-label="Go back"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="m15 18-6-6 6-6" />
				</svg>
			</button>
		{/if}
	</div>

	<h1 class="text-xl font-display font-bold text-[var(--color-on-surface)]">{title}</h1>

	<div class="w-12 h-12 flex items-center justify-end">
		<button
			onclick={() => appState.toggleTheme()}
			class="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-surface-container)] hover:bg-[var(--color-surface-container-high)] transition-colors text-[var(--color-on-surface)]"
			aria-label="Toggle theme"
		>
			{#if appState.theme === 'light'}
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
				</svg>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="4" />
					<path d="M12 2v2" />
					<path d="M12 20v2" />
					<path d="m4.93 4.93 1.41 1.41" />
					<path d="m17.66 17.66 1.41 1.41" />
					<path d="M2 12h2" />
					<path d="M20 12h2" />
					<path d="m6.34 17.66-1.41 1.41" />
					<path d="m19.07 4.93-1.41 1.41" />
				</svg>
			{/if}
		</button>
	</div>
</header>
