<script>
  import { onMount } from 'svelte'
  import { fetchTrails } from '../lib/api.js'
  import { currentPage, selectedTrailId } from '../stores/trail.js'
  import { session } from '../stores/user.js'
  import TrailCard from '../components/TrailCard.svelte'

  let trails = $state([])
  let search = $state('')
  let difficulty = $state('')
  let loading = $state(true)

  async function load() {
    loading = true
    trails = await fetchTrails({ name: search, difficulty })
    loading = false
  }

  onMount(load)
</script>

<div class="page-container">
  <div class="page-header">
    <h1>Discover Trails</h1>
    {#if $session.data?.user?.role === 'admin'}
      <button class="btn-primary" onclick={() => $currentPage = 'create'}>+ Add Trail</button>
    {/if}
  </div>

  <div class="filters">
    <input
      type="text"
      bind:value={search}
      oninput={load}
      placeholder="Search trails..."
      class="search-input"
    />
    <select bind:value={difficulty} onchange={load} class="filter-select">
      <option value="">All Difficulties</option>
      <option value="easy">Easy</option>
      <option value="moderate">Moderate</option>
      <option value="hard">Hard</option>
    </select>
  </div>

  {#if loading}
    <p class="status-msg">Loading trails...</p>
  {:else if trails.length === 0}
    <p class="status-msg">No trails found.</p>
  {:else}
    <div class="trail-grid">
      {#each trails as trail (trail.id)}
        <TrailCard {trail} />
      {/each}
    </div>
  {/if}
</div>
