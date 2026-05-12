export type Difficulty = 'easy' | 'medium' | 'hard';
export type Category = 'animals' | 'nature' | 'household' | 'mixed';

export interface Card {
	id: string;
	pairId: string;
	emoji: string;
	isFlipped: boolean;
	isMatched: boolean;
}

// Curated emoji sets — each emoji is unique and strictly belongs to its category
const ANIMAL_EMOJIS = [
	'🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
	'🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔',
	'🐧', '🦅', '🦆', '🦉', '🐺', '🐴', '🦄', '🐝',
	'🦋', '🐌', '🐞', '🐙', '🦈', '🐬', '🐳', '🦩'
];

const NATURE_EMOJIS = [
	'🌸', '🌺', '🌻', '🌹', '🌷', '🌲', '🌳', '🌴',
	'🌵', '🍀', '🍁', '🍂', '🌊', '🏔️', '🌋', '🏝️',
	'🌅', '🌈', '☀️', '🌙', '⭐', '❄️', '🌾', '🍄',
	'🪨', '💐', '🌿', '🍃', '🔥', '💧', '🌪️', '⛰️'
];

const HOUSEHOLD_EMOJIS = [
	'🪑', '🛋️', '🛏️', '🚿', '🛁', '🧹', '🧺', '🍳',
	'🥘', '🍽️', '🔪', '☕', '🏺', '🪴', '🕯️', '📺',
	'💡', '🔑', '🪞', '🧸', '📦', '🧲', '⏰', '🖼️',
	'🪣', '🧴', '🪥', '🧽', '🫖', '🍶', '🪤', '🧊'
];

class GameState {
	difficulty = $state<Difficulty>('easy');
	category = $state<Category>('animals');
	cards = $state<Card[]>([]);
	moves = $state(0);
	timeSeconds = $state(0);
	isPlaying = $state(false);

	private timer: ReturnType<typeof setInterval> | null = null;
	private currentlyFlipped: Card[] = [];
	private isProcessing = false;

	start(difficulty: Difficulty, category: Category) {
		this.difficulty = difficulty;
		this.category = category;
		this.moves = 0;
		this.timeSeconds = 0;
		this.cards = this.generateCards(difficulty, category);
		this.currentlyFlipped = [];
		this.isProcessing = false;
		this.isPlaying = true;
		this.startTimer();
	}

	reset() {
		this.stopTimer();
		this.isPlaying = false;
	}

	flipCard(card: Card) {
		if (
			this.isProcessing ||
			card.isFlipped ||
			card.isMatched ||
			this.currentlyFlipped.length >= 2 ||
			!this.isPlaying
		) {
			return;
		}

		card.isFlipped = true;
		this.currentlyFlipped.push(card);

		if (this.currentlyFlipped.length === 2) {
			this.moves++;
			this.checkMatch();
		}
	}

	private checkMatch() {
		this.isProcessing = true;
		const [card1, card2] = this.currentlyFlipped;

		if (card1.pairId === card2.pairId) {
			card1.isMatched = true;
			card2.isMatched = true;
			this.currentlyFlipped = [];
			this.isProcessing = false;
			this.checkWin();
		} else {
			setTimeout(() => {
				card1.isFlipped = false;
				card2.isFlipped = false;
				this.currentlyFlipped = [];
				this.isProcessing = false;
			}, 1000);
		}
	}

	private checkWin() {
		const hasWon = this.cards.every((c) => c.isMatched);
		if (hasWon) {
			this.stopTimer();
			this.isPlaying = false;
		}
	}

	private startTimer() {
		this.stopTimer();
		this.timer = setInterval(() => {
			this.timeSeconds++;
		}, 1000);
	}

	private stopTimer() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	}

	private generateCards(diff: Difficulty, cat: Category): Card[] {
		const pairsCount = diff === 'easy' ? 8 : diff === 'medium' ? 18 : 30;

		const emojis = this.getEmojiSet(cat, pairsCount);
		const generatedCards: Card[] = [];

		emojis.forEach((emoji, index) => {
			const pairId = `pair-${index}`;
			generatedCards.push(
				{ id: `${pairId}-a`, pairId, emoji, isFlipped: false, isMatched: false },
				{ id: `${pairId}-b`, pairId, emoji, isFlipped: false, isMatched: false }
			);
		});

		// Shuffle (Fisher-Yates)
		for (let i = generatedCards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[generatedCards[i], generatedCards[j]] = [generatedCards[j], generatedCards[i]];
		}

		return generatedCards;
	}

	private getEmojiSet(cat: Category, count: number): string[] {
		let pool: string[];

		switch (cat) {
			case 'animals':
				pool = [...ANIMAL_EMOJIS];
				break;
			case 'nature':
				pool = [...NATURE_EMOJIS];
				break;
			case 'household':
				pool = [...HOUSEHOLD_EMOJIS];
				break;
			case 'mixed': {
				pool = [...ANIMAL_EMOJIS, ...NATURE_EMOJIS, ...HOUSEHOLD_EMOJIS];
				for (let i = pool.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[pool[i], pool[j]] = [pool[j], pool[i]];
				}
				break;
			}
		}

		// Shuffle so each game session uses different emojis
		for (let i = pool.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[pool[i], pool[j]] = [pool[j], pool[i]];
		}

		return pool.slice(0, count);
	}
}

export const gameState = new GameState();
