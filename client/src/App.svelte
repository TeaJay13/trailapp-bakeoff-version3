<script>
  import { session } from './stores/user.js'
  import { currentPage, favoriteIds } from './stores/trail.js'
  import { fetchFavoriteIds } from './lib/api.js'
  import Navbar from './components/Navbar.svelte'
  import TrailList from './pages/TrailList.svelte'
  import TrailDetail from './pages/TrailDetail.svelte'
  import TrailForm from './pages/TrailForm.svelte'
  import Login from './pages/Login.svelte'
  import Signup from './pages/Signup.svelte'
  import Favorites from './pages/Favorites.svelte'
  import Landing from './pages/Landing.svelte'

  $: if (!$session.isPending && !$session.data) {
    if ($currentPage === 'create' || $currentPage === 'edit') {
      $currentPage = 'login'
    }
    favoriteIds.set(new Set())
  }

  $: if ($session.data) {
    fetchFavoriteIds().then(ids => {
      if (Array.isArray(ids)) favoriteIds.set(new Set(ids))
    })
  }
</script>

<Navbar />

{#if $session.isPending}
  <div class="page-container status-msg">Loading...</div>
{:else if $currentPage === 'landing'}
  <Landing />
{:else if $currentPage === 'home'}
  <TrailList />
{:else if $currentPage === 'detail'}
  <TrailDetail />
{:else if $currentPage === 'create'}
  <TrailForm />
{:else if $currentPage === 'edit'}
  <TrailForm isEdit={true} />
{:else if $currentPage === 'favorites'}
  <Favorites />
{:else if $currentPage === 'login'}
  <Login />
{:else if $currentPage === 'signup'}
  <Signup />
{/if}
