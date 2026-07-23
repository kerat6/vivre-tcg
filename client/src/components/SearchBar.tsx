interface SearchBarProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
}

function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
    return (
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a card"
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    )
}

export default SearchBar