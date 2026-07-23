import Button from "./Button"

interface TypeFilterProps {
        selectedType: string
        toggleType: (type: string) => void

    }


    function TypeFilter({ selectedType, toggleType }: TypeFilterProps) {
        return (
        <div className="flex gap-2 flex-wrap">
                <Button onClick={() => toggleType('Leader')} active={selectedType === 'Leader'}>Leader</Button>
                <Button onClick={() => toggleType('Character')} active={selectedType === 'Character'}>Character</Button>
                <Button onClick={() => toggleType('Event')} active={selectedType === 'Event'}>Event</Button>
                <Button onClick={() => toggleType('Stage')} active={selectedType === 'Stage'}>Stage</Button>
                </div>
        )
    }

    export default TypeFilter