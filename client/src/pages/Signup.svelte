<script>
  import { authClient } from '../lib/auth.js'
  import { currentPage } from '../stores/trail.js'

  let name = ''
  let email = ''
  let password = ''
  let error = ''
  let submitting = false

  async function handleSignup() {
    submitting = true
    error = ''
    const { error: err } = await authClient.signUp.email({ name, email, password })
    submitting = false
    if (err) { error = err.message; return }
    $currentPage = 'home'
  }
</script>

<div class="page-container">
  <div class="auth-card">
    <h1>Create Account</h1>
    <p class="auth-subtitle">Join to add trails and share your experiences.</p>

    {#if error}
      <p class="form-error">{error}</p>
    {/if}

    <form on:submit|preventDefault={handleSignup}>
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" type="text" bind:value={name} placeholder="Your name" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="email" bind:value={email} placeholder="you@example.com" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" bind:value={password} placeholder="••••••••" minlength="8" required />
      </div>
      <button type="submit" class="btn-primary btn-full" disabled={submitting}>
        {submitting ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>

    <p class="auth-switch">
      Already have an account?
      <button class="link-btn" on:click={() => $currentPage = 'login'}>Log in</button>
    </p>
  </div>
</div>
