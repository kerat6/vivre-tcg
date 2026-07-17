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
      />
    )
}

export default SearchBar