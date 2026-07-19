<script>
  import { onMount } from 'svelte'
  import { fetchFavorites } from '../lib/api.js'
  import { currentPage, favoriteIds } from '../stores/trail.js'
  import TrailCard from '../components/TrailCard.svelte'

  let trails = $state([])
  let loading = $state(true)
  let error = $state('')

  onMount(async () => {
    try {
      trails = await fetchFavorites()
    } catch (err) {
      error = 'Failed to load favorites.'
    } finally {
      loading = false
    }
  })

  $effect(() => {
    if ($favoriteIds) {
      trails = trails.filter(t => $favoriteIds.has(t.id))
    }
  })
</script>

<div class="page-container">
  <div class="page-header">
    <h1>My Favorites</h1>
    <button class="btn-back" onclick={() => $currentPage = 'home'}>← Back to trails</button>
  </div>

  {#if loading}
    <p class="status-msg">Loading...</p>
  {:else if error}
    <p class="status-msg error">{error}</p>
  {:else if trails.length === 0}
    <p class="status-msg">No favorites yet. Browse trails and save the ones you love!</p>
  {:else}
    <div class="trail-grid">
      {#each trails as trail (trail.id)}
        <TrailCard {trail} />
      {/each}
    </div>
  {/if}
</div>
