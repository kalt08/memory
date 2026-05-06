<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		variant = 'primary',
		class: className = '',
		onclick,
		children,
		disabled = false,
		type = 'button'
	}: {
		variant?: 'primary' | 'secondary' | 'tertiary';
		class?: string;
		onclick?: () => void;
		children: Snippet;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
	} = $props();

	const baseClasses =
		'inline-flex items-center justify-center transition-all duration-300 font-sans active:scale-95';

	const variants = {
		primary:
			'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-container)] text-[var(--color-on-primary)] rounded-full px-8 py-4 font-semibold shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-xl hover:shadow-[var(--color-primary)]/30',
		secondary:
			'bg-[var(--color-surface-container-high)] text-[var(--color-on-surface)] rounded-2xl px-6 py-3 font-medium hover:bg-[var(--color-surface-container-highest)]',
		tertiary:
			'text-[var(--color-primary)] font-bold tracking-widest uppercase text-sm px-4 py-2 hover:opacity-80'
	};
</script>

<button
	{type}
	class="{baseClasses} {variants[variant]} {className} {disabled
		? 'cursor-not-allowed opacity-50 active:scale-100'
		: ''}"
	{onclick}
	{disabled}
>
	{@render children()}
</button>
