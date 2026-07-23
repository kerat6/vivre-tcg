interface CounterFilterProps {
  selectedCounter: string
  setSelectedCounter: (counter: string) => void
}

function CounterFilter({ selectedCounter, setSelectedCounter }: CounterFilterProps) {
  return (
    <select value={selectedCounter} onChange={(e) => setSelectedCounter(e.target.value)}>
      <option value="">Any Counter</option>
      <option value="0">0</option>
      <option value="1000">1000</option>
      <option value="2000">2000</option>
    </select>
  )
}

export default CounterFilter