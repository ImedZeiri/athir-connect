import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceId } from '../../core/models/site.models';
import { I18nService } from '../../core/services/i18n.service';
import { servicePath } from '../../core/data/service-catalog';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a class="service-card" [routerLink]="path">
      <span class="service-card-top">
        <span class="service-card-number">{{ number }}</span>
        <span class="service-card-arrow" aria-hidden="true">↗</span>
      </span>
      <h3>{{ i18n.t(key + '.title') }}</h3>
      <p>{{ i18n.t(key + '.short') }}</p>
      <span class="service-card-link">{{ i18n.t('serviceDetail.cta') }}</span>
    </a>
  `,
  styles: [`
    :host { display: block; min-width: 0; }
  `]
})
export class ServiceCardComponent {
  @Input({ required: true }) serviceId!: ServiceId;
  @Input() number = '01';

  constructor(readonly i18n: I18nService) {}

  get key(): string {
    return `service.${this.serviceId}`;
  }

  get path(): string {
    return servicePath(this.serviceId);
  }
}
