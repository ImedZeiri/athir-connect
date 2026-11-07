import { Component } from '@angular/core';
import { ServiceDetailComponent } from '../../shared/components/service-detail.component';

@Component({
  selector: 'app-immigration-page',
  standalone: true,
  imports: [ServiceDetailComponent],
  template: `<app-service-detail [serviceKey]="'immigration'" />`
})
export class ImmigrationPageComponent {}
