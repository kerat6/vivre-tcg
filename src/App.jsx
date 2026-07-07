// useState lets a component "remember" values and re-render when they change
// useEffect lets a component run some code as a side effect of rendering, such as fetching data from an API
import { useState, useEffect } from 'react'
function App() {

  // cards = the current value (starts as an empty array)
  // setCards = the function we call to update the value of cards
  // Whenever setCards runs, React re-renders this component with the new value
  const [cards, setCards] = useState([])
  
  // useEffect runs the code inside it after the component first renders
  // the empty array [] at the end means "only run this once, not on every re-render"
  useEffect(() => {
  // fetch() sends a request to the api and returns a response
    fetch('https://optcgapi.com/api/sets/card/OP01-001/')
    // the raw response isn't usable JSON yet, .json() converts it
    .then(response=>response.json())
    // once we have the data, store it in the cards state variable
    .then(data => {
      setCards(data)
      console.log(data)
  })
  }, [])


return (

  <div className="grid grid-cols-4 gap-4">
{cards.map(card => (
  <img className="w-full" key={card.card_image_id} src={card.card_image} alt={card.card_name} />
))}
  </div>
)

}

export default App
