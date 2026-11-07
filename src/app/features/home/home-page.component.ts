import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FEATURED_SERVICES } from '../../core/data/service-catalog';
import { I18nService } from '../../core/services/i18n.service';
import { ServiceGridComponent } from '../../shared/components/service-grid.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, ServiceGridComponent],
  template: `
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

    <section class="intro-band page-shell section-pad">
      <p class="eyebrow">{{ i18n.t('home.intro.eyebrow') }}</p>
      <div class="intro-band-content">
        <h2>{{ i18n.t('home.intro.title') }}</h2>
        <p>{{ i18n.t('home.intro.body') }}</p>
      </div>
    </section>

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

    <section class="home-cta-section page-shell">
      <div class="home-cta-copy">
        <p class="eyebrow">{{ i18n.t('contact.heading.eyebrow') }}</p>
        <h2>{{ i18n.t('home.cta.title') }}</h2>
        <p>{{ i18n.t('home.cta.body') }}</p>
      </div>
      <a class="button button-light" routerLink="/contact">{{ i18n.t('home.cta.button') }} <span aria-hidden="true">↗</span></a>
    </section>
  `
})
export class HomePageComponent {
  readonly featuredServices = FEATURED_SERVICES;
  readonly steps = [1, 2, 3];

  constructor(readonly i18n: I18nService) {}
}
