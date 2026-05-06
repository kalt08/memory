import type { User } from '@supabase/supabase-js';
import { supabase } from '$lib/supabase';

export type Screen = 'home' | 'category' | 'difficulty' | 'game' | 'victory' | 'auth';
export type Theme = 'light' | 'dark';

class AppState {
	currentScreen = $state<Screen>('home');
	theme = $state<Theme>('light');
	user = $state<User | null>(null);

	constructor() {
		// Initialize theme from localStorage if available, otherwise default to light
		if (typeof window !== 'undefined') {
			const savedTheme = localStorage.getItem('theme') as Theme | null;
			if (savedTheme === 'dark' || savedTheme === 'light') {
				this.theme = savedTheme;
			}
			this.applyTheme();

			// Initialize Supabase Auth listener
			supabase.auth.getSession().then(({ data: { session } }) => {
				this.user = session?.user ?? null;
			});

			supabase.auth.onAuthStateChange((_event, session) => {
				this.user = session?.user ?? null;
			});
		}
	}

	goTo(screen: Screen) {
		this.currentScreen = screen;
	}

	toggleTheme() {
		this.theme = this.theme === 'light' ? 'dark' : 'light';
		if (typeof window !== 'undefined') {
			localStorage.setItem('theme', this.theme);
			this.applyTheme();
		}
	}

	private applyTheme() {
		if (typeof document !== 'undefined') {
			if (this.theme === 'dark') {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	}
}

export const appState = new AppState();
