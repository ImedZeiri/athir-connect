import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FEATURED_SERVICES } from '../../core/data/service-catalog';
import { I18nService } from '../../core/services/i18n.service';
import { ServiceGridComponent } from '../../shared/components/service-grid.component';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [RouterLink, ServiceGridComponent],
  template: `
    <section class="page-hero page-shell services-page-hero">
      <div class="page-hero-copy">
        <p class="eyebrow">{{ i18n.t('services.heading.eyebrow') }}</p>
        <h1>{{ i18n.t('services.heading.title') }}</h1>
        <p class="lead">{{ i18n.t('services.heading.body') }}</p>
      </div>
      <div class="services-orbit" aria-hidden="true">
        <span class="orbit-ring"></span><span class="orbit-ring orbit-ring-inner"></span>
        <span class="orbit-core">A<span>.</span></span>
        <span class="orbit-caption">ÉTUDES · LANGUES · MOBILITÉ</span>
      </div>
    </section>
    <section class="services-section section-pad">
      <div class="page-shell"><app-service-grid [services]="services" /></div>
    </section>
    <section class="home-cta-section page-shell">
      <div class="home-cta-copy">
        <p class="eyebrow">{{ i18n.t('contact.heading.eyebrow') }}</p>
        <h2>{{ i18n.t('home.cta.title') }}</h2>
      </div>
      <a class="button button-light" routerLink="/contact">{{ i18n.t('services.contact') }} <span aria-hidden="true">↗</span></a>
    </section>
  `
})
export class ServicesPageComponent {
  readonly services = FEATURED_SERVICES;
  constructor(readonly i18n: I18nService) {}
}
