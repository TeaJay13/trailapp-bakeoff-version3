const BASE = '/api/trails'

export async function fetchTrails() {
  const res = await fetch(BASE)
  return res.json()
}

export async function fetchTrail(id) {
  const res = await fetch(`${BASE}/${id}`)
  return res.json()
}

export async function createTrail(data) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function updateTrail(id, data) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function deleteTrail(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  return res.json()
}
