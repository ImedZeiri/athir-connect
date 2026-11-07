import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FEATURED_SERVICES } from '../../core/data/service-catalog';
import { ServiceId } from '../../core/models/site.models';
import { I18nService } from '../../core/services/i18n.service';
import { ServiceGridComponent } from '../../shared/components/service-grid.component';

type ServiceCategory = 'all' | 'learning' | 'mobility';

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
      <div class="page-shell">
        <div class="service-discovery">
          <label class="service-search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8"></circle>
              <path d="m16 16 5 5"></path>
            </svg>
            <input
              type="search"
              [value]="searchTerm"
              [attr.aria-label]="i18n.t('services.search.label')"
              [placeholder]="i18n.t('services.search.placeholder')"
              (input)="onSearch($event)"
            />
          </label>

          <div
            class="service-filter-group"
            role="group"
            [attr.aria-label]="i18n.t('services.filter.label')"
          >
            @for (filter of filters; track filter.id) {
              <button
                class="service-filter"
                type="button"
                [class.is-active]="activeFilter === filter.id"
                [attr.aria-pressed]="activeFilter === filter.id"
                (click)="setFilter(filter.id)"
              >
                {{ i18n.t(filter.labelKey) }}
              </button>
            }
          </div>
        </div>

        <p class="service-results" aria-live="polite">
          {{ filteredServices.length }}
          {{
            i18n.t(
              filteredServices.length === 1
                ? 'services.search.resultsSingular'
                : 'services.search.resultsPlural'
            )
          }}
        </p>

        @if (filteredServices.length) {
          <app-service-grid [services]="filteredServices" />
        } @else {
          <p class="service-empty" role="status">
            {{ i18n.t('services.search.empty') }}
          </p>
        }
      </div>
    </section>
    <section class="home-cta-section page-shell">
      <div class="home-cta-copy">
        <p class="eyebrow">{{ i18n.t('contact.heading.eyebrow') }}</p>
        <h2>{{ i18n.t('home.cta.title') }}</h2>
      </div>
      <a class="button button-light" routerLink="/contact">{{ i18n.t('services.contact') }} <span aria-hidden="true">↗</span></a>
    </section>
  `,
  styles: [`
    .service-discovery {
      display: grid;
      grid-template-columns: minmax(240px, 1fr) auto;
      align-items: center;
      gap: 16px;
      margin-bottom: 12px;
    }
    .service-search {
      display: flex;
      align-items: center;
      gap: 12px;
      min-height: 54px;
      padding: 0 16px;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: var(--surface);
      box-shadow: var(--shadow-soft);
      transition: border-color .2s ease, box-shadow .2s ease;
      &:focus-within {
        border-color: var(--brand-teal);
        box-shadow: 0 0 0 3px rgb(26 58 107 / 10%);
      }
      svg {
        width: 20px;
        height: 20px;
        flex: 0 0 auto;
        fill: none;
        stroke: var(--ink-muted);
        stroke-width: 1.7;
        stroke-linecap: round;
      }
      input {
        width: 100%;
        min-width: 0;
        border: 0;
        outline: 0;
        color: var(--ink);
        background: transparent;
        font: inherit;
        &::placeholder { color: var(--ink-muted); opacity: .8; }
      }
    }
    .service-filter-group {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .service-filter {
      min-height: 44px;
      padding: 0 15px;
      border: 1px solid var(--line);
      border-radius: 999px;
      color: var(--ink-muted);
      background: var(--surface);
      font: 600 .78rem/1.2 var(--font-body);
      cursor: pointer;
      transition: color .18s ease, background .18s ease, border-color .18s ease, transform .18s ease;
      &:hover { border-color: var(--brand-teal); color: var(--brand-teal); transform: translateY(-1px); }
      &.is-active { border-color: var(--brand-teal); color: #fff; background: var(--brand-teal); }
    }
    .service-results {
      margin: 0 0 18px;
      color: var(--ink-muted);
      font-size: .82rem;
    }
    .service-empty {
      padding: 28px;
      border: 1px dashed var(--line);
      border-radius: 16px;
      color: var(--ink-muted);
      background: var(--surface);
      text-align: center;
    }
    @media (max-width: 820px) {
      .service-discovery { grid-template-columns: 1fr; }
    }
  `]
})
export class ServicesPageComponent {
  readonly services = FEATURED_SERVICES;
  readonly filters: { id: ServiceCategory; labelKey: string }[] = [
    { id: 'all', labelKey: 'services.filter.all' },
    { id: 'learning', labelKey: 'services.filter.learning' },
    { id: 'mobility', labelKey: 'services.filter.mobility' }
  ];
  activeFilter: ServiceCategory = 'all';
  searchTerm = '';

  constructor(readonly i18n: I18nService) {}

  get filteredServices(): ServiceId[] {
    const locale = this.i18n.language();
    const query = this.normalizeSearch(this.searchTerm.trim(), locale);

    return this.services.filter((id) => {
      const isLearning = id === 'languageTraining' || id === 'examPreparation';
      const matchesCategory =
        this.activeFilter === 'all' ||
        (this.activeFilter === 'learning' && isLearning) ||
        (this.activeFilter === 'mobility' && !isLearning);
      const searchText = [
        this.i18n.t(`service.${id}.title`),
        this.i18n.t(`service.${id}.short`)
      ].join(' ').toLocaleLowerCase(locale);

      return matchesCategory && (!query || this.normalizeSearch(searchText, locale).includes(query));
    });
  }

  setFilter(filter: ServiceCategory): void {
    this.activeFilter = filter;
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  private normalizeSearch(value: string, locale: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase(locale);
  }
}
