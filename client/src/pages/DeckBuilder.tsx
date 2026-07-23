import { useEffect, useState } from "react"
import type { Deck } from "../types/Deck"
import type { Card } from "../types/Card"


function DeckBuilder() {
  const [deck, setDeck] = useState<Deck>({leader: null, cards: []})
  const [leaders, setLeaders] = useState<Card[]>([])

  useEffect(() => {
    if (deck.leader) return // If a leader is already selected, don't fetch leaders again

    fetch('http://localhost:3000/cards?type=Leader')
      .then(response => response.json() as Promise<Card[]>)
      .then(data => setLeaders(data))
  }, [deck.leader]) // Only re-run the effect if the leader changes

  if (!deck.leader) {
    return (
      <div>
        <h1>Select a Leader</h1>
        </div>
    )
  }

  return <div>Building deck with: {deck.leader.card_name}</div>

}

export default DeckBuilder