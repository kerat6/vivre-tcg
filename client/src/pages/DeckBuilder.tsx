import { useEffect, useState } from "react"
import type { Deck } from "../types/Deck"
import type { Card } from "../types/Card"
import CardGrid from "../components/CardGrid"
import SearchBar from "../components/SearchBar"
import ColorFilter from "../components/ColorFilter"
import SetFilter from "../components/SetFilter"

function DeckBuilder() {
  const [deck, setDeck] = useState<Deck>({leader: null, cards: []})
  const [leaders, setLeaders] = useState<Card[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSet, setSelectedSet] = useState('')

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

  return <div>Building deck with: {deck.leader.card_name}</div>

}

export default DeckBuilder