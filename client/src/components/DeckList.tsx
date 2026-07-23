import type { DeckCard } from "../types/Deck";
import type { Card } from "../types/Card";

interface DeckListProps {
    leader: Card
    cards: DeckCard[]
    onRemoveCard: (cardImageId: string) => void
    showPrices?: boolean
}

function DeckList({ leader, cards, onRemoveCard, showPrices }: DeckListProps) {
  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="relative">
        <img className="w-full" src={leader.card_image} alt={leader.card_name} loading="lazy" />
        <span className="absolute top-1 left-1 bg-black/70 text-white text-xs px-1 rounded">
          Leader
        </span>
        {showPrices && (
          <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
            ${leader.market_price}
          </span>
        )}
      </div>

      {cards.map(dc => (
        <div
          key={dc.card.card_image_id}
          className="relative"
          onClick={() => onRemoveCard(dc.card.card_image_id)}
        >
          <img className="w-full" src={dc.card.card_image} alt={dc.card.card_name} loading="lazy" />
          <span className="absolute top-1 left-1 bg-black/70 text-white text-xs px-1 rounded">
            x{dc.quantity}
          </span>
          {showPrices && (
            <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
              ${dc.card.market_price}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}


export default DeckList