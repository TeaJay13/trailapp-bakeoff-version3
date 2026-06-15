<script>
  import { currentPage, selectedTrailId } from '../stores/trail.js'

  export let trail

  function viewTrail() {
    $selectedTrailId = trail.id
    $currentPage = 'detail'
  }
</script>

<div class="trail-card" on:click={viewTrail} on:keypress={viewTrail} role="button" tabindex="0">
  <div class="card-header">
    <span class="badge {trail.difficulty}">{trail.difficulty}</span>
  </div>
  <h3 class="card-title">{trail.name}</h3>
  <div class="card-meta">
    {#if trail.location}<p>📍 {trail.location}</p>{/if}
    {#if trail.length}<p>📏 {trail.length} miles</p>{/if}
  </div>
  {#if trail.description}
    <p class="card-desc">{trail.description.slice(0, 100)}{trail.description.length > 100 ? '…' : ''}</p>
  {/if}
  <button class="btn-ghost" on:click|stopPropagation={viewTrail}>View Details →</button>
</div>
