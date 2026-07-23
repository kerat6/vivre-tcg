interface TypeFilterProps {
    selectedType: string
    toggleType: (type: string) => void

}


function TypeFilter({ selectedType, toggleType }: TypeFilterProps) {
    return (
    <div>
            <button onClick={() => toggleType('Leader')}>Leader</button>
            <button onClick={() => toggleType('Character')}>Character</button>
            <button onClick={() => toggleType('Event')}>Event</button>
            <button onClick={() => toggleType('Stage')}>Stage</button>
            </div>
    )
}

export default TypeFilter