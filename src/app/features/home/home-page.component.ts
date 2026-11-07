import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FEATURED_SERVICES } from '../../core/data/service-catalog';
import { I18nService } from '../../core/services/i18n.service';
import { ServiceGridComponent } from '../../shared/components/service-grid.component';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';

interface GalleryItem {
  src: string;
  alt: string;
  tag: string;
}

interface VideoItem {
  id: string;
  title: string;
  caption: string;
  thumb: string;
}

interface Review {
  name: string;
  country: string;
  flag: string;
  service: string;
  rating: number;
  text: string;
  avatar: string;
}

interface Stat {
  value: string;
  labelKey: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, ServiceGridComponent, SafeUrlPipe],
  template: `
    <!-- ── Hero ─────────────────────────────────────────────── -->
    <section class="home-hero">
      <div class="hero-inner page-shell">
        <div class="hero-copy">
          <p class="eyebrow"><span class="eyebrow-rule"></span>{{ i18n.t('hero.eyebrow') }}</p>
          <h1>{{ i18n.t('hero.title') }}<br><em>{{ i18n.t('hero.emphasis') }}</em></h1>
          <p class="hero-description">{{ i18n.t('hero.description') }}</p>
          <div class="hero-actions">
            <a class="button button-primary" routerLink="/services">{{ i18n.t('hero.primary') }} <span aria-hidden="true">↗</span></a>
            <a class="button button-text" routerLink="/contact">{{ i18n.t('hero.secondary') }} <span aria-hidden="true">↗</span></a>
          </div>
          <p class="hero-note"><span aria-hidden="true">✳</span>{{ i18n.t('hero.note') }}</p>
        </div>
        <div class="hero-art" role="img" [attr.aria-label]="i18n.t('hero.emphasis')">
          <div class="hero-art-orbit orbit-one"></div>
          <div class="hero-art-orbit orbit-two"></div>
          <div class="hero-sun"></div>
          <div class="hero-letter">أ<span>•</span></div>
          <div class="hero-art-caption"><span>01</span><span>—</span><span>Au-delà des frontières</span></div>
          <div class="hero-level-card">
            <span class="level-card-label">LANGUES</span>
            <strong>A1 <i>—</i> C2</strong>
            <span class="level-card-line"><span></span></span>
            <span class="level-card-copy">FR · EN · DE · AR</span>
          </div>
          <span class="hero-stamp">ATHIR<br>CONNECT</span>
        </div>
      </div>
      <div class="hero-bottom page-shell">
        <span>{{ i18n.t('home.intro.eyebrow') }}</span>
        <span class="hero-bottom-line"></span>
        <span>{{ i18n.t('hero.note') }}</span>
      </div>
    </section>

    <!-- ── Intro band ─────────────────────────────────────────── -->
    <section class="intro-band page-shell section-pad">
      <p class="eyebrow">{{ i18n.t('home.intro.eyebrow') }}</p>
      <div class="intro-band-content">
        <h2>{{ i18n.t('home.intro.title') }}</h2>
        <p>{{ i18n.t('home.intro.body') }}</p>
      </div>
    </section>

    <!-- ── Services ───────────────────────────────────────────── -->
    <section class="services-section section-pad">
      <div class="page-shell">
        <div class="section-heading">
          <div>
            <p class="eyebrow">{{ i18n.t('home.services.eyebrow') }}</p>
            <h2>{{ i18n.t('home.services.title') }}</h2>
          </div>
          <p>{{ i18n.t('home.services.body') }}</p>
        </div>
        <app-service-grid [services]="featuredServices" />
        <a class="section-text-link" routerLink="/services">{{ i18n.t('home.services.cta') }} <span aria-hidden="true">↗</span></a>
      </div>
    </section>

    <!-- ── Gallery Slider ─────────────────────────────────────── -->
    <section class="gallery-section section-pad">
      <div class="page-shell gallery-header">
        <div>
          <p class="eyebrow"><span class="eyebrow-rule"></span>{{ i18n.t('home.gallery.eyebrow') }}</p>
          <h2 class="gallery-title">{{ i18n.t('home.gallery.title') }}</h2>
        </div>
        <p class="gallery-lead">{{ i18n.t('home.gallery.lead') }}</p>
      </div>

      <!-- Row 1 — left to right -->
      <div class="slider-track-wrap" [attr.aria-label]="i18n.t('home.gallery.eyebrow')" role="region">
        <div class="slider-track track-ltr">
          @for (item of sliderRow1Double; track $index) {
            <figure class="slider-cell" aria-hidden="true">
              <img [src]="item.src" [alt]="item.alt" loading="lazy" decoding="async">
              <figcaption><span class="gallery-tag">{{ item.tag }}</span></figcaption>
            </figure>
          }
        </div>
      </div>

      <!-- Row 2 — right to left -->
      <div class="slider-track-wrap" aria-hidden="true">
        <div class="slider-track track-rtl">
          @for (item of sliderRow2Double; track $index) {
            <figure class="slider-cell">
              <img [src]="item.src" [alt]="item.alt" loading="lazy" decoding="async">
              <figcaption><span class="gallery-tag">{{ item.tag }}</span></figcaption>
            </figure>
          }
        </div>
      </div>
    </section>

    <!-- ── Video Section ──────────────────────────────────────── -->
    <section class="video-section section-pad">
      <div class="page-shell">
        <div class="video-header">
          <p class="eyebrow"><span class="eyebrow-rule"></span>{{ i18n.t('home.video.eyebrow') }}</p>
          <h2>{{ i18n.t('home.video.title') }}</h2>
          <p class="video-lead">{{ i18n.t('home.video.lead') }}</p>
        </div>

        <div class="video-grid">
          @for (video of videoItems; track video.id) {
            <div class="video-card">
              @if (activeVideo() === video.id) {
                <div class="video-embed-wrap">
                  <iframe
                    [src]="'https://www.youtube.com/embed/' + video.id + '?autoplay=1&rel=0' | safeUrl"
                    [title]="video.title"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    loading="lazy"
                  ></iframe>
                </div>
              } @else {
                <button
                  class="video-thumb-btn"
                  type="button"
                  [attr.aria-label]="'Lire : ' + video.title"
                  (click)="playVideo(video.id)"
                >
                  <img [src]="video.thumb" [alt]="video.title" loading="lazy" decoding="async">
                  <span class="video-play-overlay" aria-hidden="true">
                    <span class="video-play-ring">
                      <svg viewBox="0 0 48 48" fill="none">
                        <circle cx="24" cy="24" r="23" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M20 16l14 8-14 8V16z" fill="currentColor"/>
                      </svg>
                    </span>
                  </span>
                </button>
              }
              <div class="video-meta">
                <h3>{{ video.title }}</h3>
                <p>{{ video.caption }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ── Stats band ────────────────────────────────────────── -->
    <!-- ── Stats band ──────────────────────────────────────────── -->
    <div class="stats-band">
      <div class="stats-band-inner page-shell">
        <div class="stats-brand-col">
          <img src="assets/logo.jpg" alt="ATHIR CONNECT" class="stats-logo" loading="lazy">
          <div class="stats-brand-text">
            <strong>ATHIR CONNECT</strong>
            <span>{{ i18n.t('brand.tagline') }}</span>
          </div>
        </div>
        <div class="stats-divider" aria-hidden="true"></div>
        <div class="stats-numbers">
          @for (stat of stats; track stat.value) {
            <div class="stat-item">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-label">{{ i18n.t(stat.labelKey) }}</span>
            </div>
          }
        </div>
      </div>
    </div>

    <!-- ── Reviews ───────────────────────────────────────────────── -->
    <section class="reviews-section">
      <div class="reviews-bg-strip" aria-hidden="true"></div>
      <div class="page-shell reviews-inner">

        <div class="reviews-header">
          <p class="eyebrow reviews-eyebrow"><span class="eyebrow-rule"></span>{{ i18n.t('home.reviews.eyebrow') }}</p>
          <h2 class="reviews-title">{{ i18n.t('home.reviews.title') }}</h2>
          <p class="reviews-lead">{{ i18n.t('home.reviews.lead') }}</p>
          <div class="reviews-aggregate">
            <div class="agg-stars">
              @for (s of starsArray(5); track $index) {
                <span class="star filled">&#9733;</span>
              }
            </div>
            <span class="agg-score">4.9</span>
            <span class="agg-count">({{ reviews.length * 80 }}+ avis)</span>
          </div>
        </div>

        <div class="reviews-grid">
          @for (review of reviews; track review.name; let i = $index) {
            <article class="review-card" [class.review-featured]="i === 0">
              <div class="review-card-top">
                <div class="review-avatar-wrap">
                  <img
                    class="review-avatar"
                    [src]="review.avatar"
                    [alt]="review.name"
                    loading="lazy"
                    decoding="async"
                  >
                  <span class="review-flag">{{ review.flag }}</span>
                </div>
                <div class="review-author-info">
                  <strong>{{ review.name }}</strong>
                  <span class="review-country">{{ review.country }}</span>
                  <div class="review-stars" [attr.aria-label]="review.rating + ' étoiles sur 5'">
                    @for (s of starsArray(review.rating); track $index) {
                      <span class="star" [class.filled]="s">&#9733;</span>
                    }
                  </div>
                </div>
                <span class="review-service-badge">{{ review.service }}</span>
              </div>
              <blockquote class="review-text">
                <span class="review-quote" aria-hidden="true">&ldquo;</span>
                <p>{{ review.text }}</p>
              </blockquote>
            </article>
          }
        </div>

      </div>
    </section>

    <!-- ── Steps ──────────────────────────────────────────────── -->
    <section class="steps-section section-pad">
      <div class="page-shell">
        <div class="steps-heading">
          <p class="eyebrow">{{ i18n.t('home.steps.eyebrow') }}</p>
          <h2>{{ i18n.t('home.steps.title') }}</h2>
          <p>{{ i18n.t('home.steps.body') }}</p>
        </div>
        <div class="steps-grid">
          @for (step of steps; track step; let i = $index) {
            <article class="step-item">
              <span class="step-number">0{{ i + 1 }}</span>
              <span class="step-rule"></span>
              <h3>{{ i18n.t('home.step' + (i + 1) + '.title') }}</h3>
              <p>{{ i18n.t('home.step' + (i + 1) + '.body') }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- ── Promise ────────────────────────────────────────────── -->
    <section class="promise-section">
      <div class="page-shell promise-inner">
        <div class="promise-mark" aria-hidden="true">A<span>.</span></div>
        <div>
          <p class="eyebrow">{{ i18n.t('home.promise.eyebrow') }}</p>
          <h2>{{ i18n.t('home.promise.title') }}</h2>
          <p>{{ i18n.t('home.promise.body') }}</p>
        </div>
        <a class="circle-link" routerLink="/about" [attr.aria-label]="i18n.t('nav.about')"><span aria-hidden="true">↗</span></a>
      </div>
    </section>

    <!-- ── CTA ────────────────────────────────────────────────── -->
    <section class="home-cta-section page-shell">
      <div class="home-cta-copy">
        <p class="eyebrow">{{ i18n.t('contact.heading.eyebrow') }}</p>
        <h2>{{ i18n.t('home.cta.title') }}</h2>
        <p>{{ i18n.t('home.cta.body') }}</p>
      </div>
      <a class="button button-light" routerLink="/contact">{{ i18n.t('home.cta.button') }} <span aria-hidden="true">↗</span></a>
    </section>
  `,
  styles: [`
    /* ── Gallery slider ──────────────────────────────────────── */
    .gallery-section {
      background: var(--surface-soft);
      overflow: hidden;
    }
    .gallery-header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px 8%;
      align-items: end;
      margin-bottom: clamp(36px, 5vw, 56px);
    }
    .gallery-title { margin-top: 10px; }
    .gallery-lead { color: var(--ink-muted); line-height: 1.8; }

    .slider-track-wrap {
      overflow: hidden;
      margin-bottom: 8px;
      /* pause on hover */
      &:hover .slider-track { animation-play-state: paused; }
    }

    .slider-track {
      display: flex;
      gap: 8px;
      width: max-content;
      will-change: transform;
    }

    /* LTR: scroll left */
    .track-ltr {
      animation: slide-ltr 40s linear infinite;
    }
    /* RTL: scroll right */
    .track-rtl {
      animation: slide-rtl 36s linear infinite;
    }

    .slider-cell {
      position: relative;
      width: 340px;
      height: 240px;
      flex-shrink: 0;
      overflow: hidden;
      margin: 0;
      background: var(--line);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform .5s ease;
      }

      figcaption {
        position: absolute;
        inset-inline-start: 0;
        inset-block-end: 0;
        width: 100%;
        padding: 28px 14px 12px;
        background: linear-gradient(to top, rgb(25 64 60 / 75%) 0%, transparent 100%);
        opacity: 0;
        transition: opacity .3s ease;
      }

      &:hover img { transform: scale(1.05); }
      &:hover figcaption { opacity: 1; }
    }

    .gallery-tag {
      display: inline-block;
      padding: 4px 10px;
      background: var(--brand-coral);
      color: #fff9ef;
      font-size: .62rem;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
    }

    @keyframes slide-ltr {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes slide-rtl {
      0%   { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }

    /* ── Video ───────────────────────────────────────────────── */
    .video-section { background: var(--paper); border-top: 1px solid var(--line); }
    .video-header {
      max-width: 680px;
      margin-bottom: clamp(36px, 5vw, 60px);
      h2 { margin: 10px 0 16px; }
    }
    .video-lead { color: var(--ink-muted); line-height: 1.8; }

    .video-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 28px;
    }

    .video-card {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--line);
      overflow: hidden;
      background: var(--surface);
    }

    .video-thumb-btn {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      padding: 0;
      border: 0;
      background: var(--brand-teal);
      cursor: pointer;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: .82;
        display: block;
        transition: opacity .3s ease, transform .4s ease;
      }

      /* pause-like effect: dim + scale on hover */
      &:hover img {
        opacity: .55;
        transform: scale(1.04);
      }
      &:hover .video-play-ring {
        transform: scale(1.12);
        background: var(--brand-coral);
      }
    }

    .video-play-overlay {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
    }

    .video-play-ring {
      display: grid;
      place-items: center;
      width: 68px; height: 68px;
      border-radius: 50%;
      background: rgb(25 64 60 / 82%);
      color: #fff9ef;
      transition: background .25s ease, transform .25s ease;
      svg { width: 52px; height: 52px; }
    }

    .video-embed-wrap {
      position: relative;
      aspect-ratio: 16 / 9;
      width: 100%;
      iframe {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        border: 0;
        display: block;
      }
    }

    .video-meta {
      padding: 20px 22px 22px;
      border-top: 1px solid var(--line-soft);
      h3 { font-size: .96rem; color: var(--brand-teal); margin-bottom: 6px; }
      p  { color: var(--ink-muted); font-size: .82rem; line-height: 1.6; margin: 0; }
    }

    /* ── Responsive ──────────────────────────────────────────── */
    @media (max-width: 1024px) {
      .gallery-header { grid-template-columns: 1fr; }
    }
    @media (max-width: 760px) {
      .slider-cell { width: 260px; height: 190px; }
      .video-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 480px) {
      .slider-cell { width: 200px; height: 160px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .slider-track { animation: none !important; }
    }

    /* ── Stats band ────────────────────────────────────────── */
    .stats-band {
      background: var(--brand-teal);
      padding-block: clamp(32px, 4.5vw, 52px);
      border-top: 3px solid var(--brand-coral);
    }
    .stats-band-inner {
      display: grid;
      grid-template-columns: auto 1px 1fr;
      gap: 0 clamp(32px, 5vw, 72px);
      align-items: center;
    }
    .stats-brand-col {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .stats-logo {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--brand-coral);
      flex-shrink: 0;
    }
    .stats-brand-text {
      display: grid;
      gap: 4px;
      strong {
        color: #e9e7d9;
        font-size: .82rem;
        font-weight: 700;
        letter-spacing: .12em;
      }
      span {
        color: rgb(233 231 217 / 55%);
        font: italic .72rem Georgia, serif;
      }
    }
    .stats-divider {
      width: 1px;
      height: 60px;
      background: rgb(233 231 217 / 18%);
    }
    .stats-numbers {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0;
    }
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 16px 12px;
      text-align: center;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        inset-inline-end: 0;
        top: 20%;
        height: 60%;
        width: 1px;
        background: rgb(233 231 217 / 14%);
      }
      &:last-child::after { display: none; }
    }
    .stat-value {
      font: 400 clamp(2rem, 3.8vw, 3.2rem)/1 var(--font-display);
      color: #e9e7d9;
      letter-spacing: -.03em;
    }
    .stat-label {
      color: rgb(233 231 217 / 58%);
      font-size: .7rem;
      font-weight: 600;
      letter-spacing: .08em;
      text-transform: uppercase;
      max-width: 110px;
      line-height: 1.4;
    }

    /* ── Reviews ──────────────────────────────────────────── */
    .reviews-section {
      position: relative;
      padding-block: clamp(64px, 10vw, 112px);
      background: var(--paper);
      overflow: hidden;
    }
    .reviews-bg-strip {
      position: absolute;
      inset-inline-start: 0;
      inset-block-start: 0;
      width: 38%;
      height: 100%;
      background: var(--surface-soft);
      border-inline-end: 1px solid var(--line);
    }
    .reviews-inner {
      position: relative;
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: clamp(40px, 6vw, 88px);
      align-items: start;
    }
    .reviews-header {
      position: sticky;
      top: 110px;
    }
    .reviews-eyebrow { margin-bottom: 16px; }
    .reviews-title {
      font-size: clamp(1.8rem, 3.2vw, 2.8rem);
      margin: 0 0 18px;
      line-height: 1.1;
    }
    .reviews-lead {
      color: var(--ink-muted);
      font-size: .92rem;
      line-height: 1.8;
      margin-bottom: 28px;
    }
    .reviews-aggregate {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 18px;
      background: var(--surface);
      border: 1px solid var(--line);
      border-inline-start: 3px solid #e8a030;
    }
    .agg-stars { display: flex; gap: 2px; }
    .agg-score {
      font: 400 1.5rem/1 var(--font-display);
      color: var(--brand-teal);
    }
    .agg-count {
      color: var(--ink-muted);
      font-size: .78rem;
    }

    .reviews-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .review-card {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: clamp(20px, 2.8vw, 30px);
      background: var(--surface);
      border: 1px solid var(--line);
      transition: box-shadow .25s ease, transform .25s ease, border-color .25s ease;
      &:hover {
        box-shadow: 0 10px 36px rgb(25 64 60 / 10%);
        transform: translateY(-4px);
        border-color: var(--brand-coral);
      }
    }
    .review-featured {
      grid-column: span 2;
      background: var(--brand-teal);
      border-color: var(--brand-teal);
      .review-author-info strong { color: #e9e7d9; }
      .review-country { color: rgb(233 231 217 / 60%); }
      .review-text p { color: #e9e7d9; }
      .review-quote { color: var(--brand-coral-lt); }
      .review-service-badge {
        background: rgb(233 231 217 / 12%);
        color: var(--brand-coral-lt);
        border-color: rgb(233 231 217 / 20%);
      }
    }

    .review-card-top {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    .review-avatar-wrap {
      position: relative;
      flex-shrink: 0;
    }
    .review-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--line);
      display: block;
    }
    .review-flag {
      position: absolute;
      inset-block-end: -4px;
      inset-inline-end: -4px;
      font-size: .8rem;
      line-height: 1;
    }
    .review-author-info {
      flex: 1;
      display: grid;
      gap: 3px;
      strong { font-size: .88rem; color: var(--brand-teal); font-weight: 700; }
    }
    .review-country {
      font-size: .72rem;
      color: var(--ink-muted);
    }
    .review-stars { display: flex; gap: 2px; margin-top: 3px; }
    .star {
      font-size: .82rem;
      color: var(--line);
      &.filled { color: #e8a030; }
    }
    .review-service-badge {
      flex-shrink: 0;
      align-self: flex-start;
      padding: 4px 10px;
      background: var(--surface-soft);
      border: 1px solid var(--line);
      color: var(--brand-teal);
      font-size: .58rem;
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .review-text {
      flex: 1;
      margin: 0;
      position: relative;
    }
    .review-quote {
      display: block;
      font: 400 3rem/1 var(--font-display);
      color: var(--brand-coral);
      opacity: .35;
      margin-bottom: -14px;
      line-height: .8;
    }
    .review-text p {
      color: var(--ink);
      font-size: .9rem;
      line-height: 1.78;
      margin: 0;
    }

    @media (max-width: 1024px) {
      .stats-band-inner { grid-template-columns: 1fr; gap: 24px; }
      .stats-divider { display: none; }
      .stats-brand-col { justify-content: center; }
      .reviews-inner { grid-template-columns: 1fr; }
      .reviews-header { position: static; }
    }
    @media (max-width: 900px) {
      .stats-numbers { grid-template-columns: repeat(2, 1fr); }
      .reviews-bg-strip { display: none; }
    }
    @media (max-width: 600px) {
      .reviews-grid { grid-template-columns: 1fr; }
      .review-featured { grid-column: span 1; }
    }
  `]
})
export class HomePageComponent {
  readonly featuredServices = FEATURED_SERVICES;
  readonly steps = [1, 2, 3];
  readonly activeVideo = signal<string | null>(null);

  constructor(readonly i18n: I18nService) {}

  /* ── Gallery rows — each array is duplicated for seamless loop ── */
  private readonly row1: GalleryItem[] = [
    { src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&q=80&auto=format&fit=crop', alt: 'Étudiants en cours de langue', tag: 'Formation linguistique' },
    { src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&q=80&auto=format&fit=crop', alt: 'Préparation à un examen', tag: 'Certification' },
    { src: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=700&q=80&auto=format&fit=crop', alt: 'Étudiant qui prend des notes', tag: 'Études' },
    { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80&auto=format&fit=crop', alt: "Groupe d'étudiants internationaux", tag: 'Mobilité internationale' },
    { src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80&auto=format&fit=crop', alt: "Avion — études à l'étranger", tag: 'Visa étudiant' },
    { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80&auto=format&fit=crop', alt: 'Conseiller accompagnant un étudiant', tag: 'Accompagnement' },
  ];

  private readonly row2: GalleryItem[] = [
    { src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=700&q=80&auto=format&fit=crop', alt: 'Campus universitaire', tag: 'Université' },
    { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=80&auto=format&fit=crop', alt: 'Livres et apprentissage', tag: 'Langues' },
    { src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=700&q=80&auto=format&fit=crop', alt: 'Étudiants en bibliothèque', tag: 'Recherche' },
    { src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=700&q=80&auto=format&fit=crop', alt: 'Passeport et documents de voyage', tag: 'Immigration' },
    { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80&auto=format&fit=crop', alt: 'Travail en groupe', tag: 'Équivalence' },
    { src: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=700&q=80&auto=format&fit=crop', alt: 'Salle de classe moderne', tag: 'Formation' },
  ];

  /* Duplicate each row so the seamless loop works */
  get sliderRow1Double(): GalleryItem[] { return [...this.row1, ...this.row1]; }
  get sliderRow2Double(): GalleryItem[] { return [...this.row2, ...this.row2]; }

  /* ── Videos ─────────────────────────────────────────────────── */
  readonly videoItems: VideoItem[] = [
    {
      id: 'V_LnMNKMbwk',
      title: 'Apprendre une langue : méthodes et conseils',
      caption: "Techniques d'apprentissage des langues étrangères",
      thumb: 'https://img.youtube.com/vi/V_LnMNKMbwk/maxresdefault.jpg'
    },
    {
      id: 'hmMnFDMkMoI',
      title: "Étudier à l'étranger : comment préparer son dossier",
      caption: 'Guide complet pour les études internationales',
      thumb: 'https://img.youtube.com/vi/hmMnFDMkMoI/maxresdefault.jpg'
    }
  ];

  playVideo(id: string): void {
    this.activeVideo.set(id);
  }

  starsArray(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }

  readonly stats: Stat[] = [
    { value: '500+', labelKey: 'home.stats.students' },
    { value: '4',    labelKey: 'home.stats.languages' },
    { value: '30+',  labelKey: 'home.stats.countries' },
    { value: '97%',  labelKey: 'home.stats.satisfaction' }
  ];

  readonly reviews: Review[] = [
    {
      name: 'Amira Benali',
      country: 'Algérie → France',
      flag: '🇩🇿',
      service: 'Visa étudiant',
      rating: 5,
      text: "L'accompagnement pour mon dossier de visa étudiant était clair et structuré. J'ai obtenu mon visa en moins de 3 semaines. Je recommande vivement ATHIR CONNECT.",
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80&auto=format&fit=crop&crop=face'
    },
    {
      name: 'Karim Meziane',
      country: 'Maroc → Allemagne',
      flag: '🇲🇦',
      service: 'Formation linguistique',
      rating: 5,
      text: "J'ai commencé l'allemand de zéro. En 6 mois j'ai atteint le niveau B1. Les cours sont adaptés à mon rythme et les formateurs sont très pédagogues.",
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&q=80&auto=format&fit=crop&crop=face'
    },
    {
      name: 'Sara Ouhabi',
      country: 'Tunisie → Canada',
      flag: '🇹🇳',
      service: 'Inscriptions universitaires',
      rating: 5,
      text: "Grâce à ATHIR CONNECT, j'ai été acceptée dans deux universités canadiennes. Le suivi de mon dossier était impeccable et les conseils très précis.",
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&q=80&auto=format&fit=crop&crop=face'
    },
    {
      name: 'Youssef Tazi',
      country: 'Maroc → Belgique',
      flag: '🇲🇦',
      service: 'Équivalence de diplômes',
      rating: 4,
      text: "La procédure d'équivalence de mon diplôme d'ingénieur était complexe. L'équipe m'a guidé pas à pas et mon dossier a été accepté du premier coup.",
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&q=80&auto=format&fit=crop&crop=face'
    },
    {
      name: 'Nadia Cherif',
      country: 'Algérie → Espagne',
      flag: '🇩🇿',
      service: 'Préparation aux examens',
      rating: 5,
      text: "J'ai réussi le DELF B2 du premier essai grâce à la préparation intensive proposée. Les exercices ciblés et les simulations d'examen ont fait toute la différence.",
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80&auto=format&fit=crop&crop=face'
    },
    {
      name: 'Omar Idrissi',
      country: 'Maroc → Pays-Bas',
      flag: '🇲🇦',
      service: 'Études et immigration',
      rating: 5,
      text: "Un accompagnement humain et professionnel. Toutes mes questions sur le processus d'immigration pour études ont trouvé des réponses claires et rapides.",
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&q=80&auto=format&fit=crop&crop=face'
    }
  ];
}
