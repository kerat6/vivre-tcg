    interface TypeFilterProps {
        selectedType: string
        toggleType: (type: string) => void

    }


    function TypeFilter({ selectedType, toggleType }: TypeFilterProps) {

        const typeClasses: Record<string, string> = {
            Leader: 'bg-blue-500 text-white',
            Character: 'bg-green-500 text-white',
            Event: 'bg-purple-500 text-white',
            Stage: 'bg-yellow-500 text-white',
        }

        const getTypeButtonClass = (type: string) => {
            const isSelected = selectedType === type
            return `px-3 py-1 rounded border ${isSelected ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`
        }

        
        return (
        <div>
                <button onClick={() => toggleType('Leader')} className={getTypeButtonClass('Leader')}>Leader</button>
                <button onClick={() => toggleType('Character')} className={getTypeButtonClass('Character')}>Character</button>
                <button onClick={() => toggleType('Event')} className={getTypeButtonClass('Event')}>Event</button>
                <button onClick={() => toggleType('Stage')} className={getTypeButtonClass('Stage')}>Stage</button>
                </div>
        )
    }

    export default TypeFilter