import { Component, Input } from '@angular/core';
import { ServiceId } from '../../core/models/site.models';
import { ServiceCardComponent } from './service-card.component';

@Component({
  selector: 'app-service-grid',
  standalone: true,
  imports: [ServiceCardComponent],
  template: `
    <div class="service-grid">
      @for (service of services; track service; let i = $index) {
        <app-service-card [serviceId]="service" [number]="number(i + 1)" />
      }
    </div>
  `
})
export class ServiceGridComponent {
  @Input() services: readonly ServiceId[] = [];

  number(value: number): string {
    return String(value).padStart(2, '0');
  }
}
