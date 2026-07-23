import type { DeckCard } from "../types/Deck";

interface DeckListProps {
    cards: DeckCard[]
    onRemoveCard: (cardImageId: string) => void
}

function DeckList({ cards, onRemoveCard }: DeckListProps) {
    return (
    <div>
        {cards.map(dc => (
            <div key={dc.card.card_image_id}>
                <span>{dc.card.card_name} x{dc.quantity}</span>
                <button onClick={() => onRemoveCard(dc.card.card_image_id)}>Remove</button>
                </div>
            ))}
            </div>
            )
        }

export default DeckList