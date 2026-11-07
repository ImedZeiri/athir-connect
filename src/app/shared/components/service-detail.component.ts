import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceId } from '../../core/models/site.models';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="service-detail-page page-shell">
      <div class="service-detail-intro">
        <a class="back-link" routerLink="/services">
          <span aria-hidden="true">←</span> {{ i18n.t('nav.services') }}
        </a>
        <p class="eyebrow">{{ i18n.t('serviceDetail.eyebrow') }}</p>
        <h1>{{ i18n.t(key + '.title') }}</h1>
        <p class="lead">{{ i18n.t(key + '.intro') }}</p>
        <a class="button button-primary" routerLink="/pre-registration">
          {{ i18n.t('serviceDetail.cta') }} <span aria-hidden="true">↗</span>
        </a>
      </div>

      <aside class="service-detail-panel">
        <div class="panel-symbol" aria-hidden="true">A<span>.</span></div>
        <p class="eyebrow">{{ i18n.t('serviceDetail.included') }}</p>
        <ul class="check-list">
          @for (index of featureIndices; track index) {
            <li><span class="check-mark" aria-hidden="true">✓</span>{{ i18n.t(key + '.feature' + index) }}</li>
          }
        </ul>
      </aside>

      <div class="service-note">
        <span class="service-note-mark" aria-hidden="true">i</span>
        <div>
          <h2>{{ i18n.t('serviceDetail.noteTitle') }}</h2>
          <p>{{ i18n.t('serviceDetail.noteBody') }}</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .service-detail-page { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(300px, .9fr); gap: 64px 9%; align-items: center; padding-block: clamp(56px, 9vw, 118px); }
    .service-detail-intro { max-width: 690px; }
    .back-link { display: inline-flex; gap: 9px; align-items: center; margin-bottom: 44px; color: var(--ink-muted); text-decoration: none; font-size: .86rem; }
    .back-link:hover { color: var(--brand-teal); }
    .service-detail-intro h1 { max-width: 720px; margin: 14px 0 22px; color: var(--brand-teal); font: 500 clamp(2.55rem, 5.6vw, 5rem)/1.06 var(--font-display); letter-spacing: -.045em; }
    .service-detail-intro .lead { max-width: 620px; margin: 0 0 30px; color: var(--ink-muted); font-size: 1.12rem; line-height: 1.8; }
    .service-detail-panel { position: relative; overflow: hidden; padding: clamp(26px, 4vw, 45px); background: var(--surface-soft); }
    .panel-symbol { position: absolute; inset-inline-end: 24px; inset-block-start: 7px; color: rgb(25 64 60 / 8%); font: 500 8rem/1 var(--font-display); }
    .panel-symbol span { color: var(--brand-coral); }
    .service-detail-panel .eyebrow { position: relative; margin-bottom: 25px; }
    .check-list { position: relative; display: grid; gap: 0; margin: 0; padding: 0; list-style: none; }
    .check-list li { display: grid; grid-template-columns: 21px 1fr; gap: 12px; align-items: start; padding: 16px 0; border-top: 1px solid var(--line-soft); color: var(--ink); line-height: 1.6; }
    .check-mark { display: inline-grid; place-items: center; width: 21px; height: 21px; border: 1px solid var(--brand-coral); border-radius: 50%; color: var(--brand-coral); font-size: .72rem; }
    .service-note { grid-column: 1 / -1; display: grid; grid-template-columns: 42px 1fr; gap: 16px; align-items: start; max-width: 880px; padding-top: 26px; border-top: 1px solid var(--line); }
    .service-note-mark { display: grid; place-items: center; width: 36px; height: 36px; border: 1px solid var(--brand-coral); border-radius: 50%; color: var(--brand-coral); font: italic 1.1rem var(--font-display); }
    .service-note h2 { margin: 0 0 8px; color: var(--brand-teal); font: 500 1.35rem var(--font-display); }
    .service-note p { max-width: 760px; margin: 0; color: var(--ink-muted); line-height: 1.75; }
    @media (max-width: 780px) { .service-detail-page { grid-template-columns: 1fr; gap: 38px; } .back-link { margin-bottom: 30px; } .service-note { grid-column: auto; } }
  `]
})
export class ServiceDetailComponent {
  @Input({ required: true }) serviceKey!: ServiceId;
  readonly featureIndices = [1, 2, 3];

  constructor(readonly i18n: I18nService) {}

  get key(): string {
    return `service.${this.serviceKey}`;
  }
}
