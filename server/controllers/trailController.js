import { supabase } from '../config/supabase.js'

export async function getTrails(c) {
  try {
    const { name, difficulty } = c.req.query()
    let query = supabase.from('trails').select('*').order('created_at', { ascending: false })
    if (name) query = query.ilike('name', `%${name}%`)
    if (difficulty) query = query.eq('difficulty', difficulty)
    const { data, error } = await query
    if (error) return c.json({ error: error.message }, 500)
    return c.json(data)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
}

export async function getTrailById(c) {
  try {
    const { data, error } = await supabase
      .from('trails')
      .select('*')
      .eq('id', c.req.param('id'))
      .single()
    if (error || !data) return c.json({ error: 'Not found' }, 404)
    return c.json(data)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
}

export async function createTrail(c) {
  try {
    const user = c.get('user')
    const { name, description, difficulty, length, location } = await c.req.json()
    const { data, error } = await supabase
      .from('trails')
      .insert({ name, description, difficulty, length, location, created_by: user.id })
      .select()
      .single()
    if (error) return c.json({ error: error.message }, 400)
    return c.json(data, 201)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
}

export async function updateTrail(c) {
  try {
    const { name, description, difficulty, length, location } = await c.req.json()
    const { data, error } = await supabase
      .from('trails')
      .update({ name, description, difficulty, length, location })
      .eq('id', c.req.param('id'))
      .select()
      .single()
    if (error || !data) return c.json({ error: 'Not found' }, 404)
    return c.json(data)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
}

export async function deleteTrail(c) {
  try {
    const { error } = await supabase
      .from('trails')
      .delete()
      .eq('id', c.req.param('id'))
    if (error) return c.json({ error: error.message }, 500)
    return c.json({ message: 'Deleted' })
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
}
