interface ColorFilterProps {
    selectedColors: string[]
    toggleColor: (color: string) => void

}


function ColorFilter({ selectedColors, toggleColor }: ColorFilterProps) {
    const colorClasses: Record<string, string> = {
        Red: 'bg-red-500 text-white',
        Blue: 'bg-blue-500 text-white',
        Green: 'bg-green-500 text-white',
        Yellow: 'bg-yellow-500 text-white',
        Purple: 'bg-purple-500 text-white',
        Black: 'bg-black text-white',
    }

    const getColorButtonClass = (color: string) => {
        const isSelected = selectedColors.includes(color)
        return `px-3 py-1 rounded border ${isSelected ? colorClasses[color] : 'bg-white text-gray-700'}`
    }


    return (
    <div className="flex gap-2 flex-wrap">
            <button onClick={() => toggleColor('Red')} className={getColorButtonClass('Red')}>Red</button>
            <button onClick={() => toggleColor('Blue')} className={getColorButtonClass('Blue')}>Blue</button>
            <button onClick={() => toggleColor('Green')} className={getColorButtonClass('Green')}>Green</button>
            <button onClick={() => toggleColor('Yellow')} className={getColorButtonClass('Yellow')}>Yellow</button>
            <button onClick={() => toggleColor('Purple')} className={getColorButtonClass('Purple')}>Purple</button>
            <button onClick={() => toggleColor('Black')} className={getColorButtonClass('Black')}>Black</button>
            </div>
    )
}

export default ColorFilter