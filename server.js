// Importera npm-paket och moduler
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const staticFolder = path.join(__dirname, 'public')
const hamsterFolder = path.join(__dirname, 'hamsters')

import hamsters from './routes/hamsters.js'
import matches from './routes/matches.js'
import matchWinners from './routes/matchWinners.js'
import winners from './routes/winners.js'
import losers from './routes/losers.js'

const port = 3001

// Middleware
//CORS öppnar vårt projekt så det kan användas från andra domäner
app.use(cors())

// Parse request body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Logger - skriver ut information om inkommande request
app.use((req, res, next) => {
	console.log(`Logger: ${req.method} ${req.url}`, req.body)
	next()
})

app.use(express.static(staticFolder))
app.use(express.static(hamsterFolder))
//End Middleware

// Routes
app.use('/hamsters', hamsters)
app.use('/matches', matches)
app.use('/matchWinners', matchWinners)
app.use('/winners', winners)
app.use('/losers', losers)

// Starta server
app.listen(port, () => {
	console.log('Server is listening on port ' + port)
})
