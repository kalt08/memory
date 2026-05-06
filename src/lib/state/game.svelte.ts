export type Difficulty = 'easy' | 'medium' | 'hard';
export type Category = 'animals' | 'nature' | 'household' | 'mixed';

export interface Card {
	id: string;
	pairId: string;
	imageUrl: string;
	isFlipped: boolean;
	isMatched: boolean;
}

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
			// Match found
			card1.isMatched = true;
			card2.isMatched = true;
			this.currentlyFlipped = [];
			this.isProcessing = false;
			this.checkWin();
		} else {
			// No match, unflip after delay
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
		// Determine pair count based on difficulty grid sizes:
		// easy: 4x4 = 16 cards = 8 pairs
		// medium: 6x6 = 36 cards = 18 pairs
		// hard: 8x8 = 64 cards = 32 pairs
		const pairsCount = diff === 'easy' ? 8 : diff === 'medium' ? 18 : 32;

		const images = this.getImageSet(cat, pairsCount);
		const generatedCards: Card[] = [];

		images.forEach((imgUrl, index) => {
			const pairId = `pair-${index}`;
			generatedCards.push(
				{ id: `${pairId}-a`, pairId, imageUrl: imgUrl, isFlipped: false, isMatched: false },
				{ id: `${pairId}-b`, pairId, imageUrl: imgUrl, isFlipped: false, isMatched: false }
			);
		});

		// Shuffle
		for (let i = generatedCards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[generatedCards[i], generatedCards[j]] = [generatedCards[j], generatedCards[i]];
		}

		return generatedCards;
	}

	private getImageSet(cat: Category, count: number): string[] {
		// Return placehold.co images for different categories.
		// Using consistent seeds or text to simulate different images.
		const urls: string[] = [];
		const catNames = cat === 'mixed' ? ['animals', 'nature', 'household'] : [cat];

		for (let i = 0; i < count; i++) {
			const currentCat = catNames[i % catNames.length];
			// Unsplash placeholder with seed for consistent images per pair but different images overall
			// using picsum or placehold.co
			urls.push(`https://picsum.photos/seed/${currentCat}${i + 1}/400/400`);
		}

		return urls;
	}
}

export const gameState = new GameState();
