import type { Card } from './Card'

export interface DeckCard {
    card: Card
    quantity: number
}

export interface Deck {
    leader: Card | null
    cards: DeckCard[]
}