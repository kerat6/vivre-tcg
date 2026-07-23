import type { Deck } from '../types/Deck'

export function encodeDeck(deck: Deck): string {
    if (!deck.leader) return ''

    const cardsString = deck.cards
    .map(dc => `${dc.quantity}x${dc.card.card_image_id}`)
    .join('|')

    return `leader=${deck.leader.card_image_id}&deck=${cardsString}`
}

export function decodeDeckString(deckString: string) {
  return deckString.split('|').map(entry => {
    const [quantityStr, cardImageId] = entry.split('x')
    return {
      cardImageId,
      quantity: Number(quantityStr)
    }
  })
}