<script>
  import { authClient } from '../lib/auth.js'
  import { currentPage } from '../stores/trail.js'

  let email = $state('')
  let password = $state('')
  let error = $state('')
  let submitting = $state(false)

  async function handleLogin() {
    submitting = true
    error = ''
    const { error: err } = await authClient.signIn.email({ email, password })
    submitting = false
    if (err) { error = err.message; return }
    $currentPage = 'home'
  }
</script>

<div class="page-container">
  <div class="auth-card">
    <h1>Welcome Back</h1>
    <p class="auth-subtitle">Log in to add trails and leave reviews.</p>

    {#if error}
      <p class="form-error">{error}</p>
    {/if}

    <form onsubmit={(e) => { e.preventDefault(); handleLogin() }}>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="email" bind:value={email} placeholder="you@example.com" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" bind:value={password} placeholder="••••••••" required />
      </div>
      <button type="submit" class="btn-primary btn-full" disabled={submitting}>
        {submitting ? 'Logging in...' : 'Log In'}
      </button>
    </form>

    <p class="auth-switch">
      No account?
      <button class="link-btn" onclick={() => $currentPage = 'signup'}>Sign up</button>
    </p>
  </div>
</div>
