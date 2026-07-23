import type { Card } from '../types/Card'

interface CardGridProps {
    cards: Card[]
    onCardClick?: (card: Card) => void
    showPrices?: boolean
}

function CardGrid({ cards, onCardClick, showPrices }: CardGridProps) {
    return (
    <div className="grid grid-cols-4 gap-6">
      {/* filter cards based on search term,
      then map over the filtered cards to display them */}
      {cards
        // .map() then turns each remaining card into an <img> tag.
        .map((card, index) => (
          <div className="relative transition-transform hover:scale-105 cursor-pointer" key={`${card.card_image_id}-${index}`}>
            <img
              className="w-full"
              // React requires a unique "key" per item in a list, so it can
              // track which element is which across re-renders. card_image_id
              // alone isn't always unique in this dataset so combine with index for uniqueness.
              src={card.card_image}
              alt={card.card_name}
              loading="lazy"
              onClick={() => onCardClick?.(card)}
            />
            {showPrices && (
              <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                ${card.market_price}
              </span>
            )}
          </div>
        ))}
    </div>
  )
}

export default CardGrid