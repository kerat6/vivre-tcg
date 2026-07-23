import { useState, useEffect } from 'react'

interface Set {
  set_id: string
  set_name: string
}

interface SetFilterProps {
  selectedSet: string
  setSelectedSet: (set: string) => void
}

function SetFilter({ selectedSet, setSelectedSet }: SetFilterProps) {
  const [sets, setSets] = useState<Set[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/sets')
      .then(response => response.json() as Promise<Set[]>)
      .then(data => setSets(data))
  }, [])

  return (
    <select value={selectedSet} onChange={(e) => setSelectedSet(e.target.value)} className="border rounded px-3 py-1 bg-white text-gray-700">
      <option value="">All Sets</option>
      {sets.map(set => (
        <option key={set.set_id} value={set.set_id}>
          {set.set_id} - {set.set_name}
        </option>
      ))}
    </select>
  )
}

export default SetFilter