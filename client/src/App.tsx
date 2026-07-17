// useState lets a component "remember" values and re-render when they change
// useEffect lets a component run some code as a side effect of rendering, such as fetching data from an API
import { useState, useEffect } from 'react'
import type { Card } from './types/Card'
import CardGrid from './components/CardGrid'
import SearchBar from './components/SearchBar'
import ColorFilter from './components/ColorFilter'

function App() {

  // cards = the current value (starts as an empty array)
  // setCards = the function we call to update the value of cards
  // Whenever setCards runs, React re-renders this component with the new value
  const [cards, setCards] = useState<Card[]>([])


  // searchTerm = the current text typed into the search box (starts empty)
  // setSearchTerm = the function we call to update it every time the user types
  const [searchTerm, setSearchTerm] = useState('')

  // selectedColors = the current array of colors selected for filtering (starts empty)
  // setSelectedColors = the function we call to update it when a color button is clicked
  const [selectedColors, setSelectedColors] = useState<string[]>([])

  // normalize() is a helper function that converts a string to lowercase and removes spaces, making it easier to compare strings in a case-insensitive way.
  // the /g at the end of the regex means "global", so it replaces all spaces, not just the first one.
  const normalize = (str: string) => str.toLowerCase().replace(/ /g, '')

  
  const cardMatchesTerm = (card: Card, term: string) => {
    return (
      card.card_name.toLowerCase().includes(term) ||
      card.card_set_id.toLowerCase().includes(term) ||
      normalize(card.sub_types).includes(normalize(term))
    )
  }


  const cardMatchesSearch = (card: Card, searchTerm: string) => {
    // handle empty search - everything matches
    if (searchTerm.trim() === '') return true

    return searchTerm
    .split('||')
    .some(group =>
      group
      .split('&&')
      .every(term => cardMatchesTerm(card, term.trim().toLowerCase()))
    )
  }
  


  // toggleColor() is used to filter the cards by color. 
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
  
  // useEffect runs the code inside it after the component first renders
  // the empty array [] at the end means "only run this once, not on every re-render"
  useEffect(() => {
    // fetch() sends a request to the api and returns a response
    fetch('https://optcgapi.com/api/sets/OP-16/')
      // the raw response isn't usable JSON yet, .json() converts it
      .then(response => response.json() as Promise<Card[]>)
      // once we have the data, store it in the cards state variable
      .then(data => {
        setCards(data)
      })
  }, [])


  return (
    <div className="space-y-4">
      <SearchBar searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />
      <ColorFilter selectedColors = {selectedColors} toggleColor = {toggleColor}/>

      <CardGrid
      cards={cards.filter(card => (selectedColors.length === 0 || selectedColors.includes(card.card_color))
      && cardMatchesSearch(card, searchTerm))}
      />
    </div>
  )
}

export default App