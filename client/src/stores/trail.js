import { writable } from 'svelte/store'

export const currentPage = writable('landing')
export const selectedTrailId = writable(null)
export const favoriteIds = writable(new Set())
