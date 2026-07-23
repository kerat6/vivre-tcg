import { Outlet, Link } from 'react-router-dom'

function MainLayout() {
  return (
    <div>
      <nav>
        <Link to="/">Browse Cards</Link>
        <Link to="/deck-builder">Deckbuilder</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default MainLayout