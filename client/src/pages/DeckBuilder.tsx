import { useEffect, useState } from "react"
import type { Deck, DeckCard } from "../types/Deck"
import type { Card } from "../types/Card"
import CardGrid from "../components/CardGrid"
import SearchBar from "../components/SearchBar"
import ColorFilter from "../components/ColorFilter"
import SetFilter from "../components/SetFilter"
import CardBrowser from "./CardBrowser"
import DeckList from "../components/DeckList"
import { encodeDeck, exportToSimFormat } from "../utils/deckEncoding"
import { useSearchParams } from "react-router-dom"
import { decodeDeckString } from "../utils/deckEncoding"

function DeckBuilder() {
  const [deck, setDeck] = useState<Deck>({leader: null, cards: []})
  const [leaders, setLeaders] = useState<Card[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSet, setSelectedSet] = useState('')
  const totalCards = deck.cards.reduce((sum, dc) => sum + dc.quantity, 0)
  const [searchParams] = useSearchParams()
  const [showPrices, setShowPrices] = useState(false)
  const totalPrice = deck.cards.reduce(
  (sum, dc) => sum + Number(dc.card.market_price) * dc.quantity,
  0
) + Number(deck.leader?.market_price)

  // On component mount, check if there's a deck string in the URL and decode it
  useEffect(() => {
  const leaderId = searchParams.get('leader')
  const deckString = searchParams.get('deck')

  if (!leaderId) return

  const entries = deckString ? decodeDeckString(deckString) : []
  const allIds = [leaderId, ...entries.map(e => e.cardImageId)]

  fetch(`http://localhost:3000/cards/batch?ids=${allIds.join(',')}`)
    .then(response => response.json() as Promise<Card[]>)
    .then(data => {
      const leaderCard = data.find(c => c.card_image_id === leaderId)
      if (!leaderCard) return

      const cards = entries.map(entry => {
        const card = data.find(c => c.card_image_id === entry.cardImageId)
        return card ? { card, quantity: entry.quantity } : null
      }).filter((dc): dc is DeckCard => dc !== null)

      setDeck({ leader: leaderCard, cards })
    })
}, [])



  const handleSelectedLeader = (card: Card) => {
    setDeck({...deck, leader: card})
  }


  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      // if the color is already selected, remove it from the array
      setSelectedColors(selectedColors.filter(c => c !== color))
    }
    else {
      // if the color is not selected, add it to the array
      setSelectedColors([...selectedColors, color])
    }
  }


  const NO_LIMIT_CARDS = ["OP16-042"]


  useEffect(() => {
    if (deck.leader) return // If a leader is already selected, don't fetch leaders again


    const params = new URLSearchParams()
    params.append('type', 'Leader')
    if (searchTerm) {
      params.append('search', searchTerm)
    }
    if (selectedColors.length > 0) {
      params.append('color', selectedColors.join(','))
    }
    if (selectedSet) {
        params.append('set', selectedSet)
    }

    fetch(`http://localhost:3000/cards?${params.toString()}`)
      .then(response => response.json() as Promise<Card[]>)
      .then(data => setLeaders(data))
  }, [deck.leader, searchTerm, selectedColors, selectedSet]) // Only re-run the effect if the leader, searchTerm, selectedColors, or selectedSet changes

  if (!deck.leader) {
    return (
      <div>
        <h1>Select a Leader</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ColorFilter selectedColors={selectedColors} toggleColor={toggleColor} />
        <SetFilter selectedSet={selectedSet} setSelectedSet={setSelectedSet} />
        <CardGrid cards={leaders} onCardClick={handleSelectedLeader} />
      </div>
    )
  }

  const leaderColors = deck.leader.card_color.split(' ')


  const handleAddCard = (card: Card) => {
  const totalOfThisCard = deck.cards
    .filter(dc => dc.card.card_set_id === card.card_set_id)
    .reduce((sum, dc) => sum + dc.quantity, 0)

  if (!NO_LIMIT_CARDS.includes(card.card_set_id) && totalOfThisCard >= 4) {
    alert("You can only have 4 copies of this card in your deck.")
    return
  }

  const existingVariant = deck.cards.find(dc => dc.card.card_image_id === card.card_image_id)

  if (existingVariant) {
    setDeck({
      ...deck,
      cards: deck.cards.map(dc =>
        dc.card.card_image_id === card.card_image_id
          ? { ...dc, quantity: dc.quantity + 1 }
          : dc
      )
    })
  } else {
    setDeck({
      ...deck,
      cards: [...deck.cards, { card, quantity: 1 }]
    })
  }
}

const handleRemoveCard = (cardImageId: string) => {
  setDeck({
    ...deck,
    cards: deck.cards
      .map(dc =>
        dc.card.card_image_id === cardImageId
          ? { ...dc, quantity: dc.quantity - 1 }
          : dc
      )
      .filter(dc => dc.quantity > 0)
  })
}

const handleShareDeck = () => {
  const encoded = encodeDeck(deck)
  const url = `${window.location.origin}/deck-builder?${encoded}`
  navigator.clipboard.writeText(url)
  alert("Deck URL copied to clipboard!")
}

const handleExportToSim = () => {
  const simFormat = exportToSimFormat(deck)
  navigator.clipboard.writeText(simFormat)
  alert("Deck exported to simulator format and copied to clipboard!")
}


return (
  <div>
    <button onClick={handleShareDeck}>Share Deck</button>
    <button onClick={handleExportToSim}>Export to Simulator</button>
    <p>Leader: {deck.leader.card_name}</p>
    <p className={totalCards === 50 ? 'text-green-500' : 'text-red-500'}>{totalCards}/50</p>
    <button onClick={() => setShowPrices(!showPrices)}>
      {showPrices ? 'Prices: Shown' : 'Prices: Hidden'}
    </button>
    {showPrices && <p>Total: ${totalPrice.toFixed(2)}</p>}
    <DeckList leader={deck.leader} cards={deck.cards} onRemoveCard={handleRemoveCard} showPrices={showPrices} />
    <h2>Add Cards</h2>
    <CardBrowser lockedColors={leaderColors} onCardClick={handleAddCard} excludeType="Leader" />
  </div>
)

}

export default DeckBuilder