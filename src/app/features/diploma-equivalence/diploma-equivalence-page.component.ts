import { Component } from '@angular/core';
import { ServiceDetailComponent } from '../../shared/components/service-detail.component';

@Component({
  selector: 'app-diploma-equivalence-page',
  standalone: true,
  imports: [ServiceDetailComponent],
  template: `<app-service-detail [serviceKey]="'diplomaEquivalence'" />`
})
export class DiplomaEquivalencePageComponent {}
