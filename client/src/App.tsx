// useState lets a component "remember" values and re-render when they change
// useEffect lets a component run some code as a side effect of rendering, such as fetching data from an API
import { useState, useEffect } from 'react'
import type { Card } from './types/Card'
import CardGrid from './components/CardGrid'
import SearchBar from './components/SearchBar'
import ColorFilter from './components/ColorFilter'
import TypeFilter from './components/TypeFilter'
import SetFilter from './components/SetFilter'
import RarityFilter from './components/RarityFilter'
import CounterFilter from './components/CounterFilter'


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

  // selectedType = the current type selected for filtering (starts empty)
  // toggleType() is used to filter the cards by type.
  const [selectedType, setSelectedType] = useState('')
  const [selectedSet, setSelectedSet] = useState('')

  const toggleType = (type: string) => {
    if (selectedType === type) {
      setSelectedType('')
    } else {
      setSelectedType(type)
    }
  }


  // card variant filter. base card only = true means only show base cards, false means show all cards including variants
  const [baseOnly, setBaseOnly] = useState(false)
 
// selectedCounter = the current counter amount selected for filtering (starts empty)
  const [selectedCounter, setSelectedCounter] = useState('')
  
  // selectedRarity = the current rarity selected for filtering (starts empty)
  const [selectedRarity, setSelectedRarity] = useState('')
// toggleRarity() is used to filter the cards by rarity.
  const toggleRarity = (rarity: string) => {
  if (selectedRarity === rarity) {
    setSelectedRarity('')
  } else {
    setSelectedRarity(rarity)
  }
}

  
  // useEffect runs the code inside it after the component first renders
  // the empty array [] at the end means "only run this once, not on every re-render"
  useEffect(() => {
    // Don't fetch anything if the search term is empty and no colors are selected
    if (!searchTerm && selectedColors.length === 0 && !selectedType && !selectedSet && !selectedRarity) {
      setCards([]) // clear the cards if no filters are applied
      return
    }

    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams()
      if(searchTerm) {
        params.append('search', searchTerm)
      }
      if(selectedColors.length > 0) {
        params.append('color', selectedColors.join(','))
      }
      if(selectedType) {
        params.append('type', selectedType)
      }
      if(selectedSet) {
        params.append('set', selectedSet)
      }
      if(baseOnly) {
        params.append('baseOnly', 'true')
      }
      if (selectedCounter) {
        params.append('counter', selectedCounter)
      }
      if (selectedRarity) {
        params.append('rarity', selectedRarity)
      }

      // fetch() sends a request to the api and returns a response
      fetch(`http://localhost:3000/cards?${params.toString()}`)
        // the raw response isn't usable JSON yet, .json() converts it
        .then(response => response.json() as Promise<Card[]>)
        // once we have the data, store it in the cards state variable
        .then(data => {
          setCards(data)
        })
    }, 250) // the 250ms delay is a debounce to avoid sending too many requests while typing

    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedColors, selectedType, selectedSet, baseOnly, selectedRarity, selectedCounter]) // this effect runs whenever searchTerm, selectedColors, selectedType, selectedSet, baseOnly, selectedRarity, or selectedCounter changes
    
    return (
      <div className="space-y-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ColorFilter selectedColors={selectedColors} toggleColor={toggleColor} />
        <TypeFilter selectedType={selectedType} toggleType={toggleType} />
        <button onClick={() => setBaseOnly(!baseOnly)}>
          {baseOnly ? 'Variants: Hidden' : 'Variants: Shown'}
        </button>
        <RarityFilter selectedRarity={selectedRarity} toggleRarity={(rarity) => setSelectedRarity(rarity)} />
        <CounterFilter selectedCounter={selectedCounter} setSelectedCounter={setSelectedCounter} />
        <SetFilter selectedSet={selectedSet} setSelectedSet={setSelectedSet} />
        <CardGrid cards={cards} />
      </div>
      )
    }

export default App