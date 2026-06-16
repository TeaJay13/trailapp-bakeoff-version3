<script>
  import { currentPage } from '../stores/trail.js'
  import { session } from '../stores/user.js'
</script>

<div class="landing">

  <section class="hero">
    <div class="hero-inner">
      <div class="hero-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="22 12 17 2 12 12 7 6 2 12"/>
          <line x1="2" y1="20" x2="22" y2="20"/>
        </svg>
      </div>
      <h1 class="hero-title">TrailFinder</h1>
      <p class="hero-sub">Discover curated hiking trails, read honest community reviews, and save the routes you love.</p>
      <div class="hero-actions">
        {#if !$session.data && !$session.isPending}
          <button class="hero-btn-primary" on:click={() => $currentPage = 'signup'}>Create Free Account</button>
        {/if}
        <button class="hero-btn-outline" on:click={() => $currentPage = 'home'}>Browse Trails</button>
      </div>
    </div>
  </section>

  <section class="features">
    <div class="features-inner">
      <div class="feature-card">
        <div class="feature-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
        <h3>Discover</h3>
        <p>Browse trails by difficulty — easy strolls to serious climbs. Filter and search to find your perfect route.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>
        <h3>Review</h3>
        <p>Read star ratings and comments from hikers who've been there. Leave your own take after hitting the trail.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        <h3>Save</h3>
        <p>Heart the trails you love and access your favorites anytime. Build your personal collection over time.</p>
      </div>
    </div>
  </section>

  {#if !$session.data && !$session.isPending}
    <section class="landing-cta">
      <h2>Ready to explore?</h2>
      <p>Create a free account to unlock reviews and save your favorite trails.</p>
      <div class="cta-actions">
        <button class="hero-btn-primary" on:click={() => $currentPage = 'signup'}>Get Started</button>
        <button class="link-btn" on:click={() => $currentPage = 'login'}>Already have an account? Log in</button>
      </div>
    </section>
  {/if}

</div>

<style>
  .landing {
    display: flex;
    flex-direction: column;
  }

  /* ── Hero ── */
  .hero {
    background: var(--green-dark);
    background-image: url('/Sunset-Hero-Sml.webp');
    background-size: cover;
    background-position: center;
    padding: 5rem 1.5rem 4.5rem;
    text-align: center;
    border-bottom: 3px solid var(--green-accent);
    position: relative;
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(15, 30, 12, 0.62);
  }

  .hero-inner {
    position: relative;
  }

  .hero-inner {
    max-width: 640px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    position: relative;
  }

  .hero-icon {
    color: var(--green-light);
    opacity: 0.9;
  }

  .hero-title {
    font-size: 2.8rem;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    line-height: 1;
  }

  .hero-sub {
    font-size: 1.05rem;
    color: #b8d4b0;
    line-height: 1.65;
    max-width: 480px;
  }

  .hero-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .hero-btn-primary {
    background: var(--green-accent);
    color: #fff;
    border: none;
    padding: 0.75rem 1.75rem;
    border-radius: var(--radius);
    cursor: pointer;
    font-size: 0.9rem;
    font-family: inherit;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: background 0.12s;
  }
  .hero-btn-primary:hover { background: var(--green-light); }

  .hero-btn-outline {
    background: transparent;
    color: #d4e8d0;
    border: 1px solid rgba(255,255,255,0.4);
    padding: 0.75rem 1.75rem;
    border-radius: var(--radius);
    cursor: pointer;
    font-size: 0.9rem;
    font-family: inherit;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: background 0.12s, border-color 0.12s;
  }
  .hero-btn-outline:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.7); }

  /* ── Features ── */
  .features {
    padding: 4rem 1.5rem;
    background: var(--bg);
  }

  .features-inner {
    max-width: 960px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .feature-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-top: 3px solid var(--green-accent);
    border-radius: var(--radius);
    padding: 1.75rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    box-shadow: var(--shadow);
  }

  .feature-icon {
    color: var(--green-accent);
    width: 40px;
    height: 40px;
    background: #e8f0e6;
    border-radius: var(--radius);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .feature-card h3 {
    font-size: 0.95rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--green-dark);
  }

  .feature-card p {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.6;
  }

  /* ── Bottom CTA ── */
  .landing-cta {
    background: var(--bg-alt);
    border-top: 1px solid var(--border);
    padding: 4rem 1.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .landing-cta h2 {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--green-dark);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .landing-cta p {
    color: var(--text-muted);
    font-size: 0.95rem;
    max-width: 400px;
  }

  .cta-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  /* ── Responsive ── */
  @media (min-width: 768px) {
    .hero { background-image: url('/Sunset-Hero.webp'); }
  }

  @media (max-width: 768px) {
    .hero { padding: 3.5rem 1.25rem 3rem; }
    .hero-title { font-size: 2rem; }
    .features-inner { grid-template-columns: 1fr; }
  }
</style>
