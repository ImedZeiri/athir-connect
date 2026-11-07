import { Component } from '@angular/core';
import { ServiceDetailComponent } from '../../shared/components/service-detail.component';

@Component({
  selector: 'app-exam-preparation-page',
  standalone: true,
  imports: [ServiceDetailComponent],
  template: `<app-service-detail [serviceKey]="'examPreparation'" />`
})
export class ExamPreparationPageComponent {}
