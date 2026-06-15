const BASE = '/api/trails'

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
