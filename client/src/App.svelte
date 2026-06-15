<script>
  import { session } from './stores/user.js'
  import { currentPage } from './stores/trail.js'
  import Navbar from './components/Navbar.svelte'
  import TrailList from './pages/TrailList.svelte'
  import TrailDetail from './pages/TrailDetail.svelte'
  import TrailForm from './pages/TrailForm.svelte'
  import Login from './pages/Login.svelte'
  import Signup from './pages/Signup.svelte'

  $: if (!$session.isPending && !$session.data) {
    if ($currentPage === 'create' || $currentPage === 'edit') {
      $currentPage = 'login'
    }
  }
</script>

<Navbar />

{#if $session.isPending}
  <div class="page-container status-msg">Loading...</div>
{:else if $currentPage === 'home'}
  <TrailList />
{:else if $currentPage === 'detail'}
  <TrailDetail />
{:else if $currentPage === 'create'}
  <TrailForm />
{:else if $currentPage === 'edit'}
  <TrailForm isEdit={true} />
{:else if $currentPage === 'login'}
  <Login />
{:else if $currentPage === 'signup'}
  <Signup />
{/if}
