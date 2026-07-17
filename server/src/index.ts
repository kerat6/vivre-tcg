import express from 'express'
import cardsRoutes from './routes/cardsRoutes'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())
app.use('/cards', cardsRoutes)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})