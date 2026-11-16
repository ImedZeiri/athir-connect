import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="about-hero">
      <div class="about-hero-bg" aria-hidden="true">
        <img
          class="about-hero-img"
          [src]="heroImage"
          alt=""
          fetchpriority="high"
          decoding="async"
        >
        <span class="about-hero-overlay"></span>
      </div>

      <section class="page-hero page-shell">
        <div class="page-hero-copy">
          <p class="eyebrow">{{ i18n.t('about.heading.eyebrow') }}</p>
          <h1>{{ i18n.t('about.heading.title') }}</h1>
          <p class="lead">{{ i18n.t('about.heading.body') }}</p>
        </div>
        <div class="page-hero-art" aria-hidden="true">
          <span class="about-logo">
            <img src="assets/logo.jpg" alt="">
          </span>
          <span class="about-art-note">LEARN<br>CONNECT<br>GROW</span>
        </div>
      </section>
    </div>

    <section class="about-values section-pad">
      <div class="page-shell">
        <div class="section-heading about-heading">
          <div>
            <p class="eyebrow">{{ i18n.t('about.heading.eyebrow') }}</p>
            <h2>{{ i18n.t('about.values.title') }}</h2>
          </div>
          <p>{{ i18n.t('about.values.body') }}</p>
        </div>
        <div class="values-grid">
          @for (value of values; track value; let i = $index) {
            <article class="value-item">
              <span class="value-index">0{{ i + 1 }}</span>
              <h3>{{ i18n.t('about.value' + (i + 1) + '.title') }}</h3>
              <p>{{ i18n.t('about.value' + (i + 1) + '.body') }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="about-disclaimer page-shell">
      <span aria-hidden="true">i</span>
      <p>{{ i18n.t('about.disclaimer') }}</p>
    </section>

    <!-- Social media -->
    <section class="about-social page-shell">
      <p class="eyebrow"><span class="eyebrow-rule"></span>{{ i18n.t('social.follow') }}</p>
      <div class="about-social-grid">
        <a href="https://www.facebook.com/share/19uYsKwUNb/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"
           class="about-social-card" [attr.aria-label]="i18n.t('social.facebook')">
          <span class="about-social-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </span>
          <span class="about-social-name">{{ i18n.t('social.facebook') }}</span>
          <span class="about-social-arrow" aria-hidden="true">↗</span>
        </a>

        <a href="https://www.instagram.com/athir_connect?srtk=MWNjNXRyajlxc2ZoMA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer"
           class="about-social-card" [attr.aria-label]="i18n.t('social.instagram')">
          <span class="about-social-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/>
            </svg>
          </span>
          <span class="about-social-name">{{ i18n.t('social.instagram') }}</span>
          <span class="about-social-arrow" aria-hidden="true">↗</span>
        </a>

        <a href="https://www.tiktok.com/@lilyhm20?_r=1&_t=ZG-9BD5jRtnUI4" target="_blank" rel="noopener noreferrer"
           class="about-social-card" [attr.aria-label]="i18n.t('social.tiktok')">
          <span class="about-social-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
            </svg>
          </span>
          <span class="about-social-name">{{ i18n.t('social.tiktok') }}</span>
          <span class="about-social-arrow" aria-hidden="true">↗</span>
        </a>

        <a href="https://mail.google.com/mail/?view=cm&to=athirconnect@gmail.com" target="_blank" rel="noopener noreferrer"
           class="about-social-card" aria-label="Email">
          <span class="about-social-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M2 7l10 7 10-7"/>
            </svg>
          </span>
          <span class="about-social-name">Email</span>
          <span class="about-social-arrow" aria-hidden="true">↗</span>
        </a>

        <a href="https://wa.me/21623815975" target="_blank" rel="noopener noreferrer"
           class="about-social-card" aria-label="WhatsApp">
          <span class="about-social-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.57A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.24-1.44l-.37-.22-3.87.99 1.02-3.76-.24-.38A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.47-7.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51H6.9c-.17 0-.45.06-.69.3-.23.23-.9.88-.9 2.14s.92 2.48 1.05 2.65c.13.17 1.82 2.78 4.41 3.9.62.27 1.1.43 1.47.55.62.2 1.18.17 1.63.1.5-.07 1.53-.62 1.75-1.23.22-.6.22-1.12.15-1.23-.07-.1-.27-.17-.57-.32z"/>
            </svg>
          </span>
          <span class="about-social-name">WhatsApp</span>
          <span class="about-social-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </section>

    <section class="home-cta-section page-shell">
      <div class="home-cta-copy">
        <p class="eyebrow">{{ i18n.t('contact.heading.eyebrow') }}</p>
        <h2>{{ i18n.t('home.cta.title') }}</h2>
      </div>
      <a class="button button-light" routerLink="/contact">{{ i18n.t('home.cta.button') }} <span aria-hidden="true">↗</span></a>
    </section>
  `,
  styles: [`
    /* ── Hero : image floutée + fondu vers le fond de page ───── */
    .about-hero {
      position: relative;
      isolation: isolate;
      overflow: hidden;
    }
    .about-hero .page-hero {
      border-bottom: 0; /* le dégradé remplace le trait de séparation */
    }
    .about-hero-bg {
      position: absolute;
      inset-block: 0;
      left: 50%;
      width: 100vw;
      transform: translateX(-50%);
      z-index: -1;
      overflow: hidden;
      background: var(--paper);
      -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 45%, rgb(0 0 0 / 55%) 75%, transparent 100%);
              mask-image: linear-gradient(to bottom, #000 0%, #000 45%, rgb(0 0 0 / 55%) 75%, transparent 100%);
    }
    .about-hero-img {
      position: absolute;
      inset: -28px; /* cache les bords adoucis par le flou */
      width: calc(100% + 56px);
      height: calc(100% + 56px);
      max-width: none;
      object-fit: cover;
      filter: blur(7px) saturate(.9);
    }
    .about-hero-overlay {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(to bottom, rgb(248 246 239 / 62%) 0%, rgb(248 246 239 / 74%) 100%);
    }

    /* ── Logo (même icône que sur l'accueil) ─────────────────── */
    .about-logo {
      display: block;
      width: 120px;
      height: 120px;
      margin-inline: auto;
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid var(--brand-coral);
      box-shadow: 0 0 0 8px rgb(190 100 77 / 12%), 0 0 0 16px rgb(190 100 77 / 6%);
      background: var(--brand-teal);
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }
    .about-hero .about-art-note { margin-top: 28px; }

    .about-social {
      padding-block: clamp(48px, 7vw, 80px);
      border-top: 1px solid var(--line);
    }
    .about-social-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1px;
      background: var(--line);
      border: 1px solid var(--line);
      margin-top: 24px;
    }
    .about-social-card {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 22px 24px;
      background: var(--paper);
      color: var(--ink-muted);
      text-decoration: none;
      transition: background .2s ease, color .2s ease;
      &:hover {
        background: var(--surface-soft);
        color: var(--brand-teal);
        .about-social-arrow { opacity: 1; }
      }
    }
    .about-social-icon {
      display: grid;
      place-items: center;
      width: 40px; height: 40px;
      border: 1px solid var(--line);
      flex-shrink: 0;
      svg { width: 18px; height: 18px; }
    }
    .about-social-name {
      flex: 1;
      font-size: .88rem;
      font-weight: 600;
      color: var(--brand-teal);
    }
    .about-social-arrow {
      font-size: 1rem;
      color: var(--brand-coral);
      opacity: 0;
      transition: opacity .2s ease;
    }
    @media (max-width: 760px) {
      .about-social-grid { grid-template-columns: repeat(3, 1fr); }
    }
    @media (max-width: 480px) {
      .about-social-grid { grid-template-columns: repeat(2, 1fr); }
    }
  `]
})
export class AboutPageComponent {
  readonly values = [1, 2, 3];

  /* Même image que le hero de l'accueil */
  readonly heroImage =
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80&auto=format&fit=crop';

  constructor(readonly i18n: I18nService) {}
}