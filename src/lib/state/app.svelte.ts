export type Screen = 'home' | 'category' | 'difficulty' | 'game' | 'victory';
export type Theme = 'light' | 'dark';

class AppState {
	currentScreen = $state<Screen>('home');
	theme = $state<Theme>('light');

	constructor() {
		// Initialize theme from localStorage if available, otherwise default to light
		if (typeof window !== 'undefined') {
			const savedTheme = localStorage.getItem('theme') as Theme | null;
			if (savedTheme === 'dark' || savedTheme === 'light') {
				this.theme = savedTheme;
			}
			this.applyTheme();
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
