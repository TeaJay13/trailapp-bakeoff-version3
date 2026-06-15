<script>
  export let reviews = []

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
        </div>
        <p class="review-comment">{review.comment}</p>
      </div>
    {/each}
  </div>
{/if}
