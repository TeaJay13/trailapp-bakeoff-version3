const API = import.meta.env.VITE_API_URL || ''
const BASE = `${API}/api/trails`

const opts = (method, data) => ({
  method,
  credentials: 'include',
  headers: data ? { 'Content-Type': 'application/json' } : {},
  body: data ? JSON.stringify(data) : undefined,
})

export function fetchTrails(params = {}) {
  const qs = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v))
  ).toString()
  return fetch(`${BASE}${qs ? '?' + qs : ''}`, { credentials: 'include' }).then(r => r.json())
}

export const fetchTrail = (id) =>
  fetch(`${BASE}/${id}`, { credentials: 'include' }).then(r => r.json())

export const createTrail = (data) =>
  fetch(BASE, opts('POST', data)).then(r => r.json())

export const updateTrail = (id, data) =>
  fetch(`${BASE}/${id}`, opts('PUT', data)).then(r => r.json())

export const deleteTrail = (id) =>
  fetch(`${BASE}/${id}`, opts('DELETE')).then(r => r.json())

export const fetchReviews = (trailId) =>
  fetch(`${BASE}/${trailId}/reviews`, { credentials: 'include' }).then(r => r.json())

export const createReview = (trailId, data) =>
  fetch(`${BASE}/${trailId}/reviews`, opts('POST', data)).then(r => r.json())

export const updateReview = (trailId, reviewId, data) =>
  fetch(`${BASE}/${trailId}/reviews/${reviewId}`, opts('PUT', data)).then(r => r.json())

export const deleteReview = (trailId, reviewId) =>
  fetch(`${BASE}/${trailId}/reviews/${reviewId}`, opts('DELETE')).then(r => r.json())

export const fetchFavoriteIds = () =>
  fetch(`${API}/api/favorites/ids`, { credentials: 'include' }).then(r => r.json())

export const fetchFavorites = () =>
  fetch(`${API}/api/favorites`, { credentials: 'include' }).then(r => r.json())

export const addFavorite = (trailId) =>
  fetch(`${API}/api/favorites/${trailId}`, opts('POST')).then(r => r.json())

export const removeFavorite = (trailId) =>
  fetch(`${API}/api/favorites/${trailId}`, opts('DELETE')).then(r => r.json())
