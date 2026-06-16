<script>
  import { onMount } from 'svelte'
  import { fetchTrail, deleteTrail } from '../lib/api.js'
  import { currentPage, selectedTrailId } from '../stores/trail.js'
  import { session } from '../stores/user.js'
  import ReviewForm from '../components/ReviewForm.svelte'
  import ReviewList from '../components/ReviewList.svelte'

  let trail = null
  let reviews = []
  let loading = true
  let error = ''

  onMount(async () => {
    try {
      const [t, r] = await Promise.all([
        fetchTrail($selectedTrailId),
        fetch(`/api/trails/${$selectedTrailId}/reviews`, { credentials: 'include' }).then(res => res.json()),
      ])
      trail = t
      reviews = r
    } catch (err) {
      error = 'Failed to load trail.'
    } finally {
      loading = false
    }
  })

  async function handleDelete() {
    if (!confirm('Delete this trail?')) return
    await deleteTrail(trail.id)
    $currentPage = 'home'
  }

  function handleReviewSubmitted(e) {
    reviews = [e.detail, ...reviews]
  }

  $: isOwner = $session.data?.user?.id === trail?.created_by
</script>

<div class="page-container">
  <button class="btn-back" on:click={() => $currentPage = 'home'}>← Back to trails</button>

  {#if loading}
    <p class="status-msg">Loading...</p>
  {:else if error}
    <p class="status-msg error">{error}</p>
  {:else if trail}

    <div class="detail-header">
      <div>
        <h1>{trail.name}</h1>
        <span class="badge {trail.difficulty}">{trail.difficulty}</span>
      </div>
      {#if isOwner}
        <div class="detail-actions">
          <button class="btn-secondary" on:click={() => $currentPage = 'edit'}>Edit</button>
          <button class="btn-danger" on:click={handleDelete}>Delete</button>
        </div>
      {/if}
    </div>

    {#if trail.image_url}
      <div class="detail-img-box">
        <picture>
          {#if trail.image_url_large}
            <source media="(min-width: 768px)" srcset={trail.image_url_large} />
          {/if}
          <img src={trail.image_url} alt={trail.name} loading="lazy" />
        </picture>
      </div>
    {/if}

    <div class="detail-info">
      <div class="detail-meta">
        {#if trail.location}
          <p class="meta-row">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {trail.location}
          </p>
        {/if}
        {#if trail.length}
          <p class="meta-row">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"/><polyline points="8 8 3 12 8 16"/><polyline points="16 8 21 12 16 16"/></svg>
            {trail.length} mi
          </p>
        {/if}
      </div>

      {#if trail.description}
        <p class="detail-description">{trail.description}</p>
      {/if}
    </div>

    <hr class="divider" />

    <section class="reviews-section">
      <h2>Reviews</h2>
      {#if $session.data}
        <ReviewForm trailId={trail.id} on:submitted={handleReviewSubmitted} />
      {:else}
        <p class="status-msg"><button class="link-btn" on:click={() => $currentPage = 'login'}>Log in</button> to leave a review.</p>
      {/if}
      <ReviewList {reviews} />
    </section>
  {/if}
</div>
