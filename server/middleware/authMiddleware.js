import { auth } from '../config/auth.js'

export async function requireAuth(c, next) {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })
  if (!session) return c.json({ error: 'Unauthorized' }, 401)
  c.set('user', session.user)
  await next()
}
