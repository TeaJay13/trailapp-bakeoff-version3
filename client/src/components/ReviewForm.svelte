<script>
  import { createEventDispatcher } from 'svelte'
  import { createReview, updateReview, deleteReview } from '../lib/api.js'

  export let trailId
  export let existingReview = null

  const dispatch = createEventDispatcher()

  let rating = existingReview?.rating ?? 0
  let hovered = 0
  let comment = existingReview?.comment ?? ''
  let submitting = false
  let error = ''
  let syncedId = existingReview?.id ?? null

  $: isEdit = !!existingReview

  $: if (existingReview?.id !== syncedId) {
    syncedId = existingReview?.id ?? null
    rating = existingReview?.rating ?? 0
    comment = existingReview?.comment ?? ''
  }

  async function handleSubmit() {
    if (rating === 0) { error = 'Please select a star rating.'; return }
    if (!comment.trim()) { error = 'Please write a comment.'; return }
    submitting = true
    error = ''
    try {
      if (isEdit) {
        const updated = await updateReview(trailId, existingReview.id, { rating, comment })
        if (updated.error) { error = updated.error; return }
        dispatch('updated', updated)
      } else {
        const res = await createReview(trailId, { rating, comment })
        if (res.error) { error = res.error; return }
        dispatch('submitted', res)
        rating = 0
        comment = ''
      }
    } catch (err) {
      error = 'Something went wrong. Please try again.'
    } finally {
      submitting = false
    }
  }

  async function handleDelete() {
    if (!confirm('Delete your review?')) return
    submitting = true
    try {
      await deleteReview(trailId, existingReview.id)
      dispatch('deleted', existingReview.id)
    } catch (err) {
      error = 'Failed to delete review.'
    } finally {
      submitting = false
    }
  }
</script>

<div class="review-form">
  <h3>{isEdit ? 'Your Review' : 'Leave a Review'}</h3>

  {#if error}
    <p class="form-error">{error}</p>
  {/if}

  <div class="star-picker">
    {#each [1,2,3,4,5] as star}
      <button
        type="button"
        class="star {star <= (hovered || rating) ? 'filled' : ''}"
        on:click={() => rating = star}
        on:mouseenter={() => hovered = star}
        on:mouseleave={() => hovered = 0}
        aria-label="{star} star"
      >★</button>
    {/each}
  </div>

  <textarea bind:value={comment} rows="3" placeholder="Share your experience..."></textarea>

  <div class="review-form-actions">
    <button class="btn-primary" on:click={handleSubmit} disabled={submitting}>
      {submitting ? 'Saving...' : isEdit ? 'Update Review' : 'Submit Review'}
    </button>
    {#if isEdit}
      <button class="btn-danger" on:click={handleDelete} disabled={submitting}>Delete</button>
    {/if}
  </div>
</div>
