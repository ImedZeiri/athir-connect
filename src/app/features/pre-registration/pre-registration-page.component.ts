import { Component } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import { InquiryFormComponent } from '../../shared/components/inquiry-form.component';

@Component({
  selector: 'app-pre-registration-page',
  standalone: true,
  imports: [InquiryFormComponent],
  template: `
    <section class="page-hero page-shell registration-page-hero">
      <div class="page-hero-copy">
        <p class="eyebrow">{{ i18n.t('registration.heading.eyebrow') }}</p>
        <h1>{{ i18n.t('registration.heading.title') }}</h1>
        <p class="lead">{{ i18n.t('registration.heading.body') }}</p>
      </div>
      <div class="registration-seal" aria-hidden="true">A<span>.</span></div>
    </section>
    <section class="registration-content page-shell section-pad">
      <aside class="registration-note">
        <span aria-hidden="true">i</span>
        <div><h2>{{ i18n.t('registration.noteTitle') }}</h2><p>{{ i18n.t('registration.noteBody') }}</p></div>
      </aside>
      <div class="contact-form-panel"><app-inquiry-form [registration]="true" /></div>
    </section>
  `
})
export class PreRegistrationPageComponent {
  constructor(readonly i18n: I18nService) {}
}
