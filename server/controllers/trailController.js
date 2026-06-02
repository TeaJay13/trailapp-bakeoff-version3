import Trail from '../models/Trail.js'

export async function getTrails(c) {
  const trails = await Trail.find()
  return c.json(trails)
}

export async function getTrailById(c) {
  const trail = await Trail.findById(c.req.param('id'))
  if (!trail) return c.json({ error: 'Not found' }, 404)
  return c.json(trail)
}

export async function createTrail(c) {
  const body = await c.req.json()
  const trail = await Trail.create(body)
  return c.json(trail, 201)
}

export async function updateTrail(c) {
  const trail = await Trail.findByIdAndUpdate(c.req.param('id'), await c.req.json(), { new: true })
  if (!trail) return c.json({ error: 'Not found' }, 404)
  return c.json(trail)
}

export async function deleteTrail(c) {
  await Trail.findByIdAndDelete(c.req.param('id'))
  return c.json({ message: 'Deleted' })
}
