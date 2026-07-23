import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import CardBrowser from '../pages/CardBrowser'
import DeckBuilder from '../pages/DeckBuilder'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {index: true, element: <CardBrowser />},
            {path: 'deck-builder', element: <DeckBuilder />},
        ]
    }
])

export default router