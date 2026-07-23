import Button from "./Button"

interface RarityFilterProps {
  selectedRarity: string
  toggleRarity: (rarity: string) => void
}

function RarityFilter({ selectedRarity, toggleRarity }: RarityFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      <Button onClick={() => toggleRarity('C')} active={selectedRarity === 'C'}>C</Button>
      <Button onClick={() => toggleRarity('UC')} active={selectedRarity === 'UC'}>UC</Button>
      <Button onClick={() => toggleRarity('R')} active={selectedRarity === 'R'}>R</Button>
      <Button onClick={() => toggleRarity('SR')} active={selectedRarity === 'SR'}>SR</Button>
      <Button onClick={() => toggleRarity('SEC')} active={selectedRarity === 'SEC'}>SEC</Button>
      <Button onClick={() => toggleRarity('L')} active={selectedRarity === 'L'}>L</Button>
    </div>
  )
}

export default RarityFilter