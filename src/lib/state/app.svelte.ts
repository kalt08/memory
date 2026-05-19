import type { User } from '@supabase/supabase-js';
import { supabase } from '$lib/supabase';

export type Screen = 'home' | 'category' | 'difficulty' | 'mode' | 'game' | 'result' | 'auth' | 'leaderboard';
export type Theme = 'light' | 'dark';

class AppState {
	currentScreen = $state<Screen>('home');
	previousScreen = $state<Screen | null>(null);
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

	goTo(screen: Screen, replace = false) {
		if (!replace) {
			this.previousScreen = this.currentScreen;
		}
		this.currentScreen = screen;

		if (typeof window !== 'undefined' && window.history) {
			const path = screen === 'home' ? '' : screen === 'category' ? 'choose-category' : screen;
			const currentPath = window.location.pathname;
			// GitHub Pages base path logic
			const base = currentPath.startsWith('/memory') ? '/memory' : '';
			const newUrl = screen === 'home' ? (base || '/') : `${base}/${path}`;

			if (replace) {
				window.history.replaceState({ screen }, '', newUrl);
			} else {
				window.history.pushState({ screen }, '', newUrl);
			}
		}
	}

	initRouter() {
		if (typeof window !== 'undefined') {
			window.addEventListener('popstate', (event) => {
				if (event.state && event.state.screen) {
					this.currentScreen = event.state.screen;
				}
			});

			const path = window.location.pathname;
			if (path.includes('choose-category')) this.currentScreen = 'category';
			else if (path.includes('difficulty')) this.currentScreen = 'difficulty';
			else if (path.includes('mode')) this.currentScreen = 'mode';
			else if (path.includes('game')) this.currentScreen = 'game';
			else if (path.includes('result')) this.currentScreen = 'result';
			else if (path.includes('leaderboard')) this.currentScreen = 'leaderboard';
			else if (path.includes('auth')) this.currentScreen = 'auth';

			window.history.replaceState({ screen: this.currentScreen }, '', window.location.href);
		}
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
appState.initRouter();
