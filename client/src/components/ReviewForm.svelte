<script>
  import { createReview, updateReview, deleteReview } from '../lib/api.js'

  let { trailId, existingReview = null, onsubmitted, onupdated, ondeleted } = $props()

  let rating = $state(existingReview?.rating ?? 0)
  let hovered = $state(0)
  let comment = $state(existingReview?.comment ?? '')
  let submitting = $state(false)
  let error = $state('')
  let syncedId = existingReview?.id ?? null

  let isEdit = $derived(!!existingReview)

  $effect(() => {
    if (existingReview?.id !== syncedId) {
      syncedId = existingReview?.id ?? null
      rating = existingReview?.rating ?? 0
      comment = existingReview?.comment ?? ''
    }
  })

  async function handleSubmit() {
    if (rating === 0) { error = 'Please select a star rating.'; return }
    if (!comment.trim()) { error = 'Please write a comment.'; return }
    submitting = true
    error = ''
    try {
      if (isEdit) {
        const updated = await updateReview(trailId, existingReview.id, { rating, comment })
        if (updated.error) { error = updated.error; return }
        onupdated?.(updated)
      } else {
        const res = await createReview(trailId, { rating, comment })
        if (res.error) { error = res.error; return }
        onsubmitted?.(res)
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
      ondeleted?.(existingReview.id)
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
        onclick={() => rating = star}
        onmouseenter={() => hovered = star}
        onmouseleave={() => hovered = 0}
        aria-label="{star} star"
      >★</button>
    {/each}
  </div>

  <textarea bind:value={comment} rows="3" placeholder="Share your experience..."></textarea>

  <div class="review-form-actions">
    <button class="btn-primary" onclick={handleSubmit} disabled={submitting}>
      {submitting ? 'Saving...' : isEdit ? 'Update Review' : 'Submit Review'}
    </button>
    {#if isEdit}
      <button class="btn-danger" onclick={handleDelete} disabled={submitting}>Delete</button>
    {/if}
  </div>
</div>
