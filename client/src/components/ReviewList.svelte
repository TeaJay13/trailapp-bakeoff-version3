<script>
  import { session } from '../stores/user.js'

  let { reviews = [], onedit, onadmindelete } = $props()

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }
</script>

{#if reviews.length === 0}
  <p class="status-msg">No reviews yet. Be the first!</p>
{:else}
  <div class="review-list">
    {#each reviews as review (review.id)}
      <div class="review-card">
        <div class="review-header">
          <span class="review-stars">
            {#each [1,2,3,4,5] as star}
              <span class="star {star <= review.rating ? 'filled' : ''}">★</span>
            {/each}
          </span>
          <span class="review-author">{review.user_name || 'Anonymous'}</span>
          <span class="review-date">{formatDate(review.created_at)}</span>
          {#if $session.data?.user?.id === review.user_id}
            <button class="review-edit-btn" onclick={() => onedit?.(review)} aria-label="Edit review">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
          {/if}
          {#if $session.data?.user?.role === 'admin' && $session.data?.user?.id !== review.user_id}
            <button class="review-edit-btn" onclick={() => onadmindelete?.(review)} aria-label="Delete review">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </button>
          {/if}
        </div>
        <p class="review-comment">{review.comment}</p>
      </div>
    {/each}
  </div>
{/if}
