import express from 'express'
import cardsRoutes from './routes/cardsRoutes'

const app = express()
const port = 3000

app.use('/cards', cardsRoutes)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})