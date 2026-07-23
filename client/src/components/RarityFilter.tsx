interface RarityFilterProps {
  selectedRarity: string
  toggleRarity: (rarity: string) => void
}

function RarityFilter({ selectedRarity, toggleRarity }: RarityFilterProps) {
  return (
    <div>
      <button onClick={() => toggleRarity('C')}>C</button>
      <button onClick={() => toggleRarity('UC')}>UC</button>
      <button onClick={() => toggleRarity('R')}>R</button>
      <button onClick={() => toggleRarity('SR')}>SR</button>
      <button onClick={() => toggleRarity('SEC')}>SEC</button>
      <button onClick={() => toggleRarity('L')}>L</button>
    </div>
  )
}

export default RarityFilter