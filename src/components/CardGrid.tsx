import type { Card } from '../types/Card'

interface CardGridProps {
    cards: Card[]
}

function CardGrid({ cards }: CardGridProps) {
    return (
              <div className="grid grid-cols-4 gap-4">
        {/* filter cards based on search term,
        then map over the filtered cards to display them */}
        {cards
          // .map() then turns each remaining card into an <img> tag.
          // The second argument to map's callback, index, is the item's
          // position in the array — used below to keep each key unique.
          .map((card, index) => (
            <img
              className="w-full"
              // React requires a unique "key" per item in a list, so it can
              // track which element is which across re-renders. card_image_id
              // alone isn't always unique in this dataset (some cards share
              // one), so we combine it with the array index as a tiebreaker.
              key={`${card.card_image_id}-${index}`}
              src={card.card_image}
              alt={card.card_name}
            />
          ))}
      </div>
    )
}

export default CardGrid