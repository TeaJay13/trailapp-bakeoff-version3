import { supabase } from '../config/supabase.js'

export async function getFavorites(c) {
  try {
    const user = c.get('user')
    const { data, error } = await supabase
      .from('favorites')
      .select('trail_id, trails(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    if (error) return c.json({ error: error.message }, 500)
    return c.json(data.map(f => f.trails))
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
}

export async function addFavorite(c) {
  try {
    const user = c.get('user')
    const trailId = c.req.param('trailId')
    const { error } = await supabase
      .from('favorites')
      .upsert({ user_id: user.id, trail_id: trailId }, { onConflict: 'user_id,trail_id' })
    if (error) return c.json({ error: error.message }, 400)
    return c.json({ success: true })
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
}

export async function removeFavorite(c) {
  try {
    const user = c.get('user')
    const trailId = c.req.param('trailId')
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('trail_id', trailId)
    if (error) return c.json({ error: error.message }, 400)
    return c.json({ success: true })
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
}

export async function getFavoriteIds(c) {
  try {
    const user = c.get('user')
    const { data, error } = await supabase
      .from('favorites')
      .select('trail_id')
      .eq('user_id', user.id)
    if (error) return c.json({ error: error.message }, 500)
    return c.json(data.map(f => f.trail_id))
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
}
