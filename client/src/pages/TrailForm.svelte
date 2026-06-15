<script>
  import { onMount } from 'svelte'
  import { fetchTrail, createTrail, updateTrail } from '../lib/api.js'
  import { currentPage, selectedTrailId } from '../stores/trail.js'

  export let isEdit = false

  let name = ''
  let description = ''
  let difficulty = 'easy'
  let length = ''
  let location = ''
  let error = ''
  let submitting = false

  onMount(async () => {
    if (isEdit && $selectedTrailId) {
      const trail = await fetchTrail($selectedTrailId)
      name = trail.name || ''
      description = trail.description || ''
      difficulty = trail.difficulty || 'easy'
      length = trail.length || ''
      location = trail.location || ''
    }
  })

  async function handleSubmit() {
    if (!name || !difficulty) { error = 'Name and difficulty are required.'; return }
    submitting = true
    error = ''
    try {
      const data = { name, description, difficulty, length: length ? Number(length) : null, location }
      if (isEdit) {
        await updateTrail($selectedTrailId, data)
        $currentPage = 'detail'
      } else {
        const result = await createTrail(data)
        $selectedTrailId = result.id
        $currentPage = 'detail'
      }
    } catch (err) {
      error = 'Something went wrong. Please try again.'
    } finally {
      submitting = false
    }
  }

  function handleCancel() {
    $currentPage = isEdit ? 'detail' : 'home'
  }
</script>

<div class="page-container">
  <div class="form-card">
    <h1>{isEdit ? 'Edit Trail' : 'Add New Trail'}</h1>

    {#if error}
      <p class="form-error">{error}</p>
    {/if}

    <form on:submit|preventDefault={handleSubmit}>
      <div class="form-group">
        <label for="name">Trail Name *</label>
        <input id="name" type="text" bind:value={name} placeholder="e.g. Pine Ridge Loop" required />
      </div>

      <div class="form-group">
        <label for="difficulty">Difficulty *</label>
        <select id="difficulty" bind:value={difficulty} required>
          <option value="easy">Easy</option>
          <option value="moderate">Moderate</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="length">Length (miles)</label>
          <input id="length" type="number" bind:value={length} min="0" step="0.1" placeholder="e.g. 3.5" />
        </div>
        <div class="form-group">
          <label for="location">Location</label>
          <input id="location" type="text" bind:value={location} placeholder="e.g. Blue Ridge, VA" />
        </div>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" bind:value={description} rows="4" placeholder="Describe the trail..."></textarea>
      </div>

      <div class="form-actions">
        <button type="button" class="btn-secondary" on:click={handleCancel}>Cancel</button>
        <button type="submit" class="btn-primary" disabled={submitting}>
          {submitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Trail'}
        </button>
      </div>
    </form>
  </div>
</div>
