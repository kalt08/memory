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

export type GameMode = 'solo' | 'bot';
export type Player = 'player' | 'bot';

class GameState {
	difficulty = $state<Difficulty>('easy');
	category = $state<Category>('animals');
	mode = $state<GameMode>('solo');
	cards = $state<Card[]>([]);
	moves = $state(0);
	timeSeconds = $state(0);
	isPlaying = $state(false);
	currentPlayer = $state<Player>('player');
	playerScores = $state({ player: 0, bot: 0 });

	private timer: ReturnType<typeof setInterval> | null = null;
	private currentlyFlipped: Card[] = [];
	private isProcessing = false;
	private botMemory = new Map<string, string>(); // pairId -> cardId

	start(difficulty: Difficulty, category: Category, mode: GameMode = 'solo') {
		this.difficulty = difficulty;
		this.category = category;
		this.mode = mode;
		this.moves = 0;
		this.timeSeconds = 0;
		this.cards = this.generateCards(difficulty, category);
		this.currentlyFlipped = [];
		this.isProcessing = false;
		this.isPlaying = true;
		this.currentPlayer = 'player';
		this.playerScores = { player: 0, bot: 0 };
		this.botMemory.clear();
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

		// Bot "remembers" cards it sees
		this.botMemory.set(card.id, card.pairId);

		if (this.currentlyFlipped.length === 2) {
			this.moves++;
			this.checkMatch();
		}
	}

	private async triggerBotTurn() {
		if (this.mode !== 'bot' || this.currentPlayer !== 'bot' || !this.isPlaying) return;

		// Small delay before bot starts moving
		await new Promise((resolve) => setTimeout(resolve, 1200));
		await this.performBotMove();
	}

	private async performBotMove() {
		if (!this.isPlaying || this.currentPlayer !== 'bot') return;

		const unmatchedCards = this.cards.filter((c) => !c.isMatched && !c.isFlipped);
		if (unmatchedCards.length === 0) return;

		// 1. Check memory for a match
		let firstCard: Card | null = null;
		let secondCard: Card | null = null;

		const memoryEntries = Array.from(this.botMemory.entries());
		for (let i = 0; i < memoryEntries.length; i++) {
			for (let j = i + 1; j < memoryEntries.length; j++) {
				const [id1, p1] = memoryEntries[i];
				const [id2, p2] = memoryEntries[j];
				const c1 = this.cards.find((c) => c.id === id1 && !c.isMatched);
				const c2 = this.cards.find((c) => c.id === id2 && !c.isMatched);

				if (p1 === p2 && c1 && c2) {
					firstCard = c1;
					secondCard = c2;
					break;
				}
			}
			if (firstCard) break;
		}

		if (firstCard && secondCard) {
			this.flipCard(firstCard);
			await new Promise((resolve) => setTimeout(resolve, 800));
			this.flipCard(secondCard);
		} else {
			// 2. Pick a random card
			const random1 = unmatchedCards[Math.floor(Math.random() * unmatchedCards.length)];
			this.flipCard(random1);

			await new Promise((resolve) => setTimeout(resolve, 800));

			// 3. Check if we now know where the match is
			const matchId = Array.from(this.botMemory.entries()).find(
				([id, pId]) => pId === random1.pairId && id !== random1.id && !this.cards.find((c) => c.id === id)?.isMatched
			)?.[0];

			const remainingUnmatched = this.cards.filter((c) => !c.isMatched && !c.isFlipped);
			const random2 = matchId
				? this.cards.find((c) => c.id === matchId)!
				: remainingUnmatched[Math.floor(Math.random() * remainingUnmatched.length)];
			
			if (random2) this.flipCard(random2);
		}

		// Wait for the match check processing to finish before we potentially trigger another turn
		await new Promise((resolve) => setTimeout(resolve, 1200));
	}

	private checkMatch() {
		this.isProcessing = true;
		const [card1, card2] = this.currentlyFlipped;

		if (card1.pairId === card2.pairId) {
			card1.isMatched = true;
			card2.isMatched = true;
			this.playerScores[this.currentPlayer]++;
			this.currentlyFlipped = [];
			this.isProcessing = false;
			
			const hasWon = this.checkWin();
			if (!hasWon && this.mode === 'bot' && this.currentPlayer === 'bot') {
				this.triggerBotTurn();
			}
		} else {
			setTimeout(() => {
				card1.isFlipped = false;
				card2.isFlipped = false;
				this.currentlyFlipped = [];
				this.isProcessing = false;

				if (this.mode === 'bot') {
					this.currentPlayer = this.currentPlayer === 'player' ? 'bot' : 'player';
					if (this.currentPlayer === 'bot') {
						this.triggerBotTurn();
					}
				}
			}, 1000);
		}
	}

	private checkWin(): boolean {
		const hasWon = this.cards.every((c) => c.isMatched);
		if (hasWon) {
			this.stopTimer();
			this.isPlaying = false;
			return true;
		}
		return false;
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
