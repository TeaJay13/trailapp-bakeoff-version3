<script>
  import { createEventDispatcher } from 'svelte'
  import { createReview } from '../lib/api.js'

  export let trailId

  const dispatch = createEventDispatcher()

  let rating = 0
  let hovered = 0
  let comment = ''
  let submitting = false
  let error = ''

  async function handleSubmit() {
    if (rating === 0) { error = 'Please select a star rating.'; return }
    if (!comment.trim()) { error = 'Please write a comment.'; return }
    submitting = true
    error = ''
    try {
      const review = await createReview(trailId, { rating, comment })
      dispatch('submitted', review)
      rating = 0
      comment = ''
    } catch (err) {
      error = 'Failed to submit review.'
    } finally {
      submitting = false
    }
  }
</script>

<div class="review-form">
  <h3>Leave a Review</h3>

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

  <textarea
    bind:value={comment}
    rows="3"
    placeholder="Share your experience..."
  ></textarea>

  <button class="btn-primary" on:click={handleSubmit} disabled={submitting}>
    {submitting ? 'Submitting...' : 'Submit Review'}
  </button>
</div>
