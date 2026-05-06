<script lang="ts">
	import { appState } from '$lib/state/app.svelte';
	import HomeScreen from '$lib/components/screens/HomeScreen.svelte';
	import CategoryScreen from '$lib/components/screens/CategoryScreen.svelte';
	import DifficultyScreen from '$lib/components/screens/DifficultyScreen.svelte';
	import GameScreen from '$lib/components/screens/GameScreen.svelte';
	import VictoryScreen from '$lib/components/screens/VictoryScreen.svelte';
</script>

<svelte:head>
	<title>Memory Joy</title>
</svelte:head>

<div class="min-h-screen bg-[var(--color-surface)] text-[var(--color-on-surface)] transition-colors duration-300 font-sans selection:bg-[var(--color-primary-container)] selection:text-[var(--color-on-surface)]">
	{#if appState.currentScreen === 'home'}
		<HomeScreen />
	{:else if appState.currentScreen === 'category'}
		<CategoryScreen />
	{:else if appState.currentScreen === 'difficulty'}
		<DifficultyScreen />
	{:else if appState.currentScreen === 'game'}
		<GameScreen />
	{:else if appState.currentScreen === 'victory'}
		<VictoryScreen />
	{/if}
</div>
