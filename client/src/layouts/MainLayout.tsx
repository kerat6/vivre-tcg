import { Outlet, Link } from 'react-router-dom'

function MainLayout() {
  return (
  <div>
    <nav className="flex gap-4 p-4 border-b bg-white">
        <Link to="/" className="font-semibold text-gray-700 hover:text-black">Browse Cards</Link>
        <Link to="/deck-builder" className="font-semibold text-gray-700 hover:text-black">Deckbuilder</Link>
        </nav>
        <div className="max-w-6xl mx-auto p-4">
        <Outlet />
        </div>
        </div>
  )
}

export default MainLayout