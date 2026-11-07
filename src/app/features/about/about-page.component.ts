import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-hero page-shell">
      <div class="page-hero-copy">
        <p class="eyebrow">{{ i18n.t('about.heading.eyebrow') }}</p>
        <h1>{{ i18n.t('about.heading.title') }}</h1>
        <p class="lead">{{ i18n.t('about.heading.body') }}</p>
      </div>
      <div class="page-hero-art" aria-hidden="true">
        <span class="about-mark">A<span>.</span></span>
        <span class="about-art-note">LEARN<br>CONNECT<br>GROW</span>
      </div>
    </section>

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

    <section class="home-cta-section page-shell">
      <div class="home-cta-copy">
        <p class="eyebrow">{{ i18n.t('contact.heading.eyebrow') }}</p>
        <h2>{{ i18n.t('home.cta.title') }}</h2>
      </div>
      <a class="button button-light" routerLink="/contact">{{ i18n.t('home.cta.button') }} <span aria-hidden="true">↗</span></a>
    </section>
  `
})
export class AboutPageComponent {
  readonly values = [1, 2, 3];
  constructor(readonly i18n: I18nService) {}
}
