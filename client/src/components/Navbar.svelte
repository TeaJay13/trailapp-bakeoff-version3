<script>
  import { authClient } from '../lib/auth.js'
  import { session } from '../stores/user.js'
  import { currentPage, selectedTrailId } from '../stores/trail.js'

  function goHome() {
    $selectedTrailId = null
    $currentPage = 'home'
  }

  async function handleLogout() {
    await authClient.signOut()
    $currentPage = 'home'
  }
</script>

<nav class="navbar">
  <button class="brand" on:click={goHome}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="22 12 17 2 12 12 7 6 2 12"/>
      <line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
    TrailFinder
  </button>
  <div class="nav-actions">
    {#if $session.isPending}
      <span class="nav-loading">...</span>
    {:else if $session.data}
      <span class="nav-user">Hi, {$session.data.user.name}</span>
      <button class="btn-outline" on:click={() => $currentPage = 'favorites'}>Favorites</button>
      <button class="btn-outline" on:click={handleLogout}>Log Out</button>
    {:else}
      <button class="btn-outline" on:click={() => $currentPage = 'login'}>Log In</button>
      <button class="btn-primary" on:click={() => $currentPage = 'signup'}>Sign Up</button>
    {/if}
  </div>
</nav>
