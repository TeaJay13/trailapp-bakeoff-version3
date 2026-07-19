<script>
  import { onMount } from 'svelte'
  import { fetchTrail, deleteTrail, addFavorite, removeFavorite, deleteReview } from '../lib/api.js'
  import { currentPage, selectedTrailId, favoriteIds } from '../stores/trail.js'
  import { session } from '../stores/user.js'
  import ReviewForm from '../components/ReviewForm.svelte'
  import ReviewList from '../components/ReviewList.svelte'

  let trail = $state(null)
  let reviews = $state([])
  let loading = $state(true)
  let error = $state('')
  let editingReview = $state(null)

  onMount(async () => {
    try {
      const [t, r] = await Promise.all([
        fetchTrail($selectedTrailId),
        fetch(`${import.meta.env.VITE_API_URL || ''}/api/trails/${$selectedTrailId}/reviews`, { credentials: 'include' }).then(res => res.json()),
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

  function handleReviewSubmitted(review) {
    reviews = [review, ...reviews]
  }

  function handleReviewUpdated(review) {
    reviews = reviews.map(r => r.id === review.id ? review : r)
    editingReview = null
  }

  function handleReviewDeleted(id) {
    reviews = reviews.filter(r => r.id !== id)
    editingReview = null
  }

  function handleEditReview(review) {
    editingReview = review
  }

  async function handleAdminDeleteReview(review) {
    if (!confirm('Delete this review?')) return
    await deleteReview(trail.id, review.id)
    reviews = reviews.filter(r => r.id !== review.id)
  }

  let isOwner = $derived($session.data?.user?.id === trail?.created_by)
  let isAdmin = $derived($session.data?.user?.role === 'admin')
  let myReview = $derived(reviews.find(r => r.user_id === $session.data?.user?.id) ?? null)
  let isFavorited = $derived(trail ? $favoriteIds.has(trail.id) : false)

  async function toggleFavorite() {
    if (isFavorited) {
      await removeFavorite(trail.id)
      favoriteIds.update(s => { s.delete(trail.id); return new Set(s) })
    } else {
      await addFavorite(trail.id)
      favoriteIds.update(s => new Set(s).add(trail.id))
    }
  }
</script>

<div class="page-container">
  <button class="btn-back" onclick={() => $currentPage = 'home'}>← Back to trails</button>

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
      <div class="detail-actions">
        {#if $session.data}
          <button class="fav-btn fav-btn-labeled" onclick={toggleFavorite}>
            <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              fill={isFavorited ? 'currentColor' : 'none'}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {isFavorited ? 'Saved' : 'Add to Favorites'}
          </button>
        {/if}
        {#if isOwner || isAdmin}
          <button class="btn-secondary" onclick={() => $currentPage = 'edit'}>Edit</button>
          <button class="btn-danger" onclick={handleDelete}>Delete</button>
        {/if}
      </div>
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

    {#if $session.data}
      <section class="reviews-section">
        <h2>Reviews</h2>
        <ReviewForm
          trailId={trail.id}
          existingReview={editingReview ?? myReview}
          onsubmitted={handleReviewSubmitted}
          onupdated={handleReviewUpdated}
          ondeleted={handleReviewDeleted}
        />
        <ReviewList {reviews} onedit={handleEditReview} onadmindelete={handleAdminDeleteReview} />
      </section>
    {:else}
      <section class="reviews-section">
        <h2>Reviews</h2>
        <p class="status-msg">
          <button class="link-btn" onclick={() => $currentPage = 'login'}>Sign in</button> to read and leave reviews.
        </p>
      </section>
    {/if}
  {/if}
</div>
