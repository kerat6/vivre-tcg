interface RarityFilterProps {
  selectedRarity: string
  toggleRarity: (rarity: string) => void
}

function RarityFilter({ selectedRarity, toggleRarity }: RarityFilterProps) {

  const rarityClasses: Record<string, string> = {
  C: 'bg-gray-400 text-white',
  UC: 'bg-green-500 text-white',
  R: 'bg-blue-500 text-white',
  SR: 'bg-purple-500 text-white',
  SEC: 'bg-yellow-500 text-white',
  L: 'bg-red-500 text-white',
}

  const getRarityButtonClass = (rarity: string) => {
    const isSelected = selectedRarity === rarity
    return `px-3 py-1 rounded border ${isSelected ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`
  }

  
  return (
    <div>
      <button onClick={() => toggleRarity('C')} className={getRarityButtonClass('C')}>C</button>
      <button onClick={() => toggleRarity('UC')} className={getRarityButtonClass('UC')}>UC</button>
      <button onClick={() => toggleRarity('R')} className={getRarityButtonClass('R')}>R</button>
      <button onClick={() => toggleRarity('SR')} className={getRarityButtonClass('SR')}>SR</button>
      <button onClick={() => toggleRarity('SEC')} className={getRarityButtonClass('SEC')}>SEC</button>
      <button onClick={() => toggleRarity('L')} className={getRarityButtonClass('L')}>L</button>
    </div>
  )
}

export default RarityFilter