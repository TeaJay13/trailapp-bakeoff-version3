import { supabase } from '../config/supabase.js'

export async function getReviews(c) {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('trail_id', c.req.param('id'))
      .order('created_at', { ascending: false })
    if (error) return c.json({ error: error.message }, 500)
    return c.json(data)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
}

export async function createReview(c) {
  try {
    const user = c.get('user')
    const { rating, comment } = await c.req.json()
    const { data, error } = await supabase
      .from('reviews')
      .insert({
        trail_id: c.req.param('id'),
        user_id: user.id,
        user_name: user.name,
        rating,
        comment,
      })
      .select()
      .single()
    if (error) return c.json({ error: error.message }, 400)
    return c.json(data, 201)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
}
