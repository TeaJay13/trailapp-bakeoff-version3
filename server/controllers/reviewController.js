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
    const trailId = c.req.param('id')
    const { rating, comment } = await c.req.json()

    const { data: existing } = await supabase
      .from('reviews')
      .select('id')
      .eq('trail_id', trailId)
      .eq('user_id', user.id)
      .single()

    if (existing) {
      return c.json({ error: 'You have already reviewed this trail.' }, 409)
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert({ trail_id: trailId, user_id: user.id, user_name: user.name, rating, comment })
      .select()
      .single()
    if (error) return c.json({ error: error.message }, 400)
    return c.json(data, 201)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
}

export async function updateReview(c) {
  try {
    const user = c.get('user')
    const reviewId = c.req.param('reviewId')
    const { rating, comment } = await c.req.json()

    const { data, error } = await supabase
      .from('reviews')
      .update({ rating, comment })
      .eq('id', reviewId)
      .eq('user_id', user.id)
      .select()
      .single()
    if (error) return c.json({ error: error.message }, 400)
    if (!data) return c.json({ error: 'Not found' }, 404)
    return c.json(data)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
}

export async function deleteReview(c) {
  try {
    const user = c.get('user')
    const reviewId = c.req.param('reviewId')

    let query = supabase.from('reviews').delete().eq('id', reviewId)
    if (user.role !== 'admin') query = query.eq('user_id', user.id)

    const { error } = await query
    if (error) return c.json({ error: error.message }, 400)
    return c.json({ success: true })
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
}
