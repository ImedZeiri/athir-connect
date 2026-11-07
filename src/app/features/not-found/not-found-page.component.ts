import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="not-found-page page-shell">
      <span class="not-found-code">404</span>
      <p class="eyebrow">{{ i18n.t('notFound.title') }}</p>
      <h1>{{ i18n.t('notFound.body') }}</h1>
      <div class="not-found-actions">
        <a class="button button-primary" routerLink="/">{{ i18n.t('notFound.home') }} <span aria-hidden="true">↗</span></a>
        <a class="button button-text" routerLink="/services">{{ i18n.t('nav.services') }} <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  `
})
export class NotFoundPageComponent {
  constructor(readonly i18n: I18nService) {}
}
