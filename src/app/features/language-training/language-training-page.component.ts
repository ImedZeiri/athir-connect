import { Component } from '@angular/core';
import { ServiceDetailComponent } from '../../shared/components/service-detail.component';

@Component({
  selector: 'app-language-training-page',
  standalone: true,
  imports: [ServiceDetailComponent],
  template: `<app-service-detail [serviceKey]="'languageTraining'" />`
})
export class LanguageTrainingPageComponent {}
