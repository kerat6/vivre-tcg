import Button from "./Button"

interface ColorFilterProps {
    selectedColors: string[]
    toggleColor: (color: string) => void

}


function ColorFilter({ selectedColors, toggleColor }: ColorFilterProps) {

    return (
    <div className="flex gap-2 flex-wrap">
        <Button onClick={() => toggleColor('Red')} active={selectedColors.includes('Red')} activeColor="bg-red-500">Red</Button>
        <Button onClick={() => toggleColor('Blue')} active={selectedColors.includes('Blue')} activeColor="bg-blue-500">Blue</Button>
        <Button onClick={() => toggleColor('Green')} active={selectedColors.includes('Green')} activeColor="bg-green-500">Green</Button>
        <Button onClick={() => toggleColor('Yellow')} active={selectedColors.includes('Yellow')} activeColor="bg-yellow-500">Yellow</Button>
        <Button onClick={() => toggleColor('Purple')} active={selectedColors.includes('Purple')} activeColor="bg-purple-500">Purple</Button>
        <Button onClick={() => toggleColor('Black')} active={selectedColors.includes('Black')} activeColor="bg-black">Black</Button>
        </div>
    )
}

export default ColorFilter