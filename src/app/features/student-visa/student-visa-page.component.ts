import { Component } from '@angular/core';
import { ServiceDetailComponent } from '../../shared/components/service-detail.component';

@Component({
  selector: 'app-student-visa-page',
  standalone: true,
  imports: [ServiceDetailComponent],
  template: `<app-service-detail [serviceKey]="'studentVisa'" />`
})
export class StudentVisaPageComponent {}
