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
  <button class="brand" on:click={goHome}>🥾 TrailFinder</button>
  <div class="nav-actions">
    {#if $session.isPending}
      <span class="nav-loading">...</span>
    {:else if $session.data}
      <span class="nav-user">Hi, {$session.data.user.name}</span>
      <button class="btn-outline" on:click={handleLogout}>Log Out</button>
    {:else}
      <button class="btn-outline" on:click={() => $currentPage = 'login'}>Log In</button>
      <button class="btn-primary" on:click={() => $currentPage = 'signup'}>Sign Up</button>
    {/if}
  </div>
</nav>
