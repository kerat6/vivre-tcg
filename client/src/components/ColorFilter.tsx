interface ColorFilterProps {
    selectedColors: string[]
    toggleColor: (color: string) => void

}


function ColorFilter({ selectedColors, toggleColor }: ColorFilterProps) {
    return (
    <div>
            <button onClick={() => toggleColor('Red')}>Red</button>
            <button onClick={() => toggleColor('Blue')}>Blue</button>
            <button onClick={() => toggleColor('Green')}>Green</button>
            <button onClick={() => toggleColor('Yellow')}>Yellow</button>
            <button onClick={() => toggleColor('Purple')}>Purple</button>
            <button onClick={() => toggleColor('Black')}>Black</button>
            </div>
    )
}

export default ColorFilter