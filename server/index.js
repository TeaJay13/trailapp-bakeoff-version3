import 'dotenv/config'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { auth } from './config/auth.js'
import trailRoutes from './routes/trailRoutes.js'
import favoriteRoutes from './routes/favoriteRoutes.js'

const app = new Hono()

app.use('*', cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

app.on(['GET', 'POST'], '/api/auth/**', (c) => auth.handler(c.req.raw))

app.route('/api/trails', trailRoutes)
app.route('/api/favorites', favoriteRoutes)

serve({ fetch: app.fetch, port: process.env.PORT || 3000 }, (info) => {
  console.log(`Server running on port ${info.port}`)
})
