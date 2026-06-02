import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { connectDB } from './config/db.js'
import trailRoutes from './routes/trailRoutes.js'

const app = new Hono()

app.use('*', cors())
app.route('/api/trails', trailRoutes)

connectDB().then(() => {
  serve({ fetch: app.fetch, port: process.env.PORT || 3000 }, (info) => {
    console.log(`Server running on port ${info.port}`)
  })
})
