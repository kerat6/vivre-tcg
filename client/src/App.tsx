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
    const params = new URLSearchParams()
    if(searchTerm) 
      {params.append('search', searchTerm)
      }
      if(selectedColors.length > 0) 
        {params.append('color', selectedColors.join(','))
        }

    // fetch() sends a request to the api and returns a response
    fetch(`http://localhost:3000/cards?${params.toString()}`)
      // the raw response isn't usable JSON yet, .json() converts it
      .then(response => response.json() as Promise<Card[]>)
      // once we have the data, store it in the cards state variable
      .then(data => {
        setCards(data)
      })
  }, [searchTerm, selectedColors]) // the effect will re-run whenever searchTerm or selectedColors changes


  return (
    <div className="space-y-4">
      <SearchBar searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />
      <ColorFilter selectedColors = {selectedColors} toggleColor = {toggleColor}/>

      <CardGrid cards={cards} />
    </div>
  )
}

export default App