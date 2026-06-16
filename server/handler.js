import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handle } from 'hono/netlify'
import { auth } from './config/auth.js'
import trailRoutes from './routes/trailRoutes.js'
import favoriteRoutes from './routes/favoriteRoutes.js'

const app = new Hono()

app.use('*', cors({
  origin: process.env.CLIENT_URL || process.env.URL || 'http://localhost:5173',
  credentials: true,
}))

app.on(['GET', 'POST'], '/api/auth/**', (c) => auth.handler(c.req.raw))
app.route('/api/trails', trailRoutes)
app.route('/api/favorites', favoriteRoutes)

export const handler = handle(app)
