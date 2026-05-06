<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import { appState } from '$lib/state/app.svelte';
	import { supabase } from '$lib/supabase';

	let email = $state('');
	let password = $state('');
	let fullName = $state('');
	let username = $state('');
	let isSignUp = $state(false);
	let loading = $state(false);
	let errorMsg = $state('');
	let successMsg = $state('');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		loading = true;
		errorMsg = '';
		successMsg = '';

		if (isSignUp) {
			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						full_name: fullName,
						username: username
					}
				}
			});
			if (error) {
				errorMsg = error.message;
			} else {
				successMsg = 'Check your email to confirm your account!';
				isSignUp = false;
				password = '';
				fullName = '';
				username = '';
			}
		} else {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (error) {
				errorMsg = error.message;
			} else {
				appState.goTo('home');
			}
		}
		loading = false;
	}
</script>

<div class="flex min-h-screen flex-col">
	<Header title={isSignUp ? 'Create Account' : 'Sign In'} showBack={true} />

	<main class="mx-auto mt-4 flex w-full max-w-md flex-1 flex-col p-6">
		<h2 class="mb-2 font-display text-3xl font-bold tracking-tight text-[var(--color-on-surface)]">
			{isSignUp ? 'Welcome!' : 'Welcome back!'}
		</h2>
		<p class="mb-8 text-[var(--color-on-surface-variant)]">
			{isSignUp ? 'Sign up to save your best scores.' : 'Sign in to sync your progress.'}
		</p>

		<form class="flex flex-col gap-5" onsubmit={handleSubmit}>
			{#if isSignUp}
				<div class="flex flex-col gap-2">
					<label for="fullName" class="text-sm font-bold text-[var(--color-on-surface)]"
						>Full Name</label
					>
					<input
						id="fullName"
						type="text"
						bind:value={fullName}
						required
						placeholder="John Doe"
						class="w-full rounded-2xl border border-transparent bg-[var(--color-surface-container-low)] px-5 py-4 text-[var(--color-on-surface)] transition-all placeholder:text-[var(--color-on-surface-variant)] hover:border-[var(--color-outline-variant)]/50 focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
					/>
				</div>

				<div class="flex flex-col gap-2">
					<label for="username" class="text-sm font-bold text-[var(--color-on-surface)]"
						>Username</label
					>
					<input
						id="username"
						type="text"
						bind:value={username}
						required
						placeholder="johndoe123"
						class="w-full rounded-2xl border border-transparent bg-[var(--color-surface-container-low)] px-5 py-4 text-[var(--color-on-surface)] transition-all placeholder:text-[var(--color-on-surface-variant)] hover:border-[var(--color-outline-variant)]/50 focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
					/>
				</div>
			{/if}

			<div class="flex flex-col gap-2">
				<label for="email" class="text-sm font-bold text-[var(--color-on-surface)]">Email</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					required
					placeholder="your@email.com"
					class="w-full rounded-2xl border border-transparent bg-[var(--color-surface-container-low)] px-5 py-4 text-[var(--color-on-surface)] transition-all placeholder:text-[var(--color-on-surface-variant)] hover:border-[var(--color-outline-variant)]/50 focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
				/>
			</div>

			<div class="flex flex-col gap-2">
				<label for="password" class="text-sm font-bold text-[var(--color-on-surface)]"
					>Password</label
				>
				<input
					id="password"
					type="password"
					bind:value={password}
					required
					placeholder="••••••••"
					class="w-full rounded-2xl border border-transparent bg-[var(--color-surface-container-low)] px-5 py-4 text-[var(--color-on-surface)] transition-all placeholder:text-[var(--color-on-surface-variant)] hover:border-[var(--color-outline-variant)]/50 focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
				/>
			</div>

			{#if errorMsg}
				<div class="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
					{errorMsg}
				</div>
			{/if}

			{#if successMsg}
				<div
					class="rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-primary-container)] p-4 text-sm text-[var(--color-primary)]"
				>
					{successMsg}
				</div>
			{/if}

			<Button variant="primary" class="mt-4 w-full text-lg" disabled={loading}>
				{loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
			</Button>
		</form>

		<div class="mt-8 text-center">
			<button
				type="button"
				class="text-sm font-bold text-[var(--color-primary)] hover:underline focus:outline-none"
				onclick={() => {
					isSignUp = !isSignUp;
					errorMsg = '';
					successMsg = '';
					fullName = '';
					username = '';
				}}
			>
				{isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
			</button>
		</div>
	</main>
</div>
