<script>
  import { currentPage, selectedTrailId } from '../stores/trail.js'

  export let trail

  function viewTrail() {
    $selectedTrailId = trail.id
    $currentPage = 'detail'
  }
</script>

<div class="trail-card" on:click={viewTrail} on:keypress={viewTrail} role="button" tabindex="0">
  {#if trail.image_url}
    <div class="card-img">
      <picture>
        {#if trail.image_url_large}
          <source media="(min-width: 768px)" srcset={trail.image_url_large} />
        {/if}
        <img src={trail.image_url} alt={trail.name} loading="lazy" />
      </picture>
      <span class="badge {trail.difficulty} card-badge">{trail.difficulty}</span>
    </div>
  {:else}
    <div class="card-header">
      <span class="badge {trail.difficulty}">{trail.difficulty}</span>
    </div>
  {/if}

  <div class="card-body">
    <h3 class="card-title">{trail.name}</h3>
    <div class="card-meta">
      {#if trail.location}
        <p class="meta-row">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {trail.location}
        </p>
      {/if}
      {#if trail.length}
        <p class="meta-row">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"/><polyline points="8 8 3 12 8 16"/><polyline points="16 8 21 12 16 16"/></svg>
          {trail.length} mi
        </p>
      {/if}
    </div>
    {#if trail.description}
      <p class="card-desc">{trail.description.slice(0, 90)}{trail.description.length > 90 ? '…' : ''}</p>
    {/if}
    <button class="btn-ghost" on:click|stopPropagation={viewTrail}>View Details →</button>
  </div>
</div>
