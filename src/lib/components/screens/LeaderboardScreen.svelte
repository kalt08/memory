<script lang="ts">
	import Header from '$lib/components/ui/Header.svelte';
	import { supabase } from '$lib/supabase';

	let difficulty: 'easy' | 'medium' | 'hard' = $state('easy');
	let scores = $state<any[]>([]);
	let loading = $state(true);

	// Fetch scores whenever difficulty changes
	$effect(() => {
		fetchScores(difficulty);
	});

	async function fetchScores(diff: string) {
		loading = true;
		const { data, error } = await supabase
			.from('scores')
			.select('*')
			.eq('difficulty', diff)
			.order('moves', { ascending: true })
			.order('time_seconds', { ascending: true })
			.limit(20);

		if (!error && data) {
			scores = data;
		}
		loading = false;
	}

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}
</script>

<div class="flex min-h-screen flex-col">
	<Header title="Leaderboard" showBack={true} />

	<main class="mx-auto mt-4 flex w-full max-w-md flex-1 flex-col p-6">
		<div class="mb-6 flex overflow-hidden rounded-2xl bg-[var(--color-surface-container-low)] shadow-sm">
			{#each ['easy', 'medium', 'hard'] as diff}
				<button
					class="flex-1 px-4 py-3 text-sm font-bold capitalize transition-colors {difficulty === diff ? 'bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)]' : 'text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-high)]'}"
					onclick={() => (difficulty = diff as any)}
				>
					{diff}
				</button>
			{/each}
		</div>

		{#if loading}
			<div class="flex flex-1 items-center justify-center">
				<div class="h-8 w-8 animate-spin rounded-full border-4 border-[var(--color-primary)] border-t-transparent"></div>
			</div>
		{:else if scores.length === 0}
			<div class="flex flex-1 flex-col items-center justify-center text-center text-[var(--color-on-surface-variant)]">
				<span class="mb-2 text-4xl">📭</span>
				<p>No scores yet for {difficulty} mode.</p>
				<p class="text-sm">Be the first to set a record!</p>
			</div>
		{:else}
			<div class="flex flex-col gap-3">
				<!-- Header row -->
				<div class="flex px-4 py-2 text-xs font-bold tracking-widest text-[var(--color-on-surface-variant)] uppercase">
					<div class="w-8 text-center">#</div>
					<div class="flex-1 pl-2">Player</div>
					<div class="w-16 text-right">Moves</div>
					<div class="w-16 text-right">Time</div>
				</div>

				{#each scores as score, index}
					<div class="flex items-center rounded-2xl bg-[var(--color-surface-container-low)] px-4 py-4 shadow-sm transition-transform hover:scale-[1.02]">
						<div class="w-8 text-center font-display text-lg font-bold {index === 0 ? 'text-amber-500' : index === 1 ? 'text-slate-400' : index === 2 ? 'text-amber-700' : 'text-[var(--color-on-surface-variant)]'}">
							{index === 0 ? '👑' : index + 1}
						</div>
						<div class="flex-1 truncate pl-2 font-bold text-[var(--color-on-surface)]">
							{score.username}
						</div>
						<div class="w-16 text-right font-display font-bold text-[var(--color-primary)]">
							{score.moves}
						</div>
						<div class="w-16 text-right font-display font-bold text-[var(--color-primary)]">
							{formatTime(score.time_seconds)}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</main>
</div>
