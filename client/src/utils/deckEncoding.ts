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


export function exportToSimFormat(deck: Deck): string {
  if (!deck.leader) return ''

  const combined = new Map<string, number>()

  for (const dc of deck.cards) {
    const current = combined.get(dc.card.card_set_id) ?? 0
    combined.set(dc.card.card_set_id, current + dc.quantity)
  }

  const lines = [`1x${deck.leader.card_set_id}`]
  for (const [cardSetId, quantity] of combined) {
    lines.push(`${quantity}x${cardSetId}`)
  }

  return lines.join('\n')
}