import { Component } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import { InquiryFormComponent } from '../../shared/components/inquiry-form.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [InquiryFormComponent],
  template: `
    <section class="page-hero page-shell contact-page-hero">
      <div class="page-hero-copy">
        <p class="eyebrow">{{ i18n.t('contact.heading.eyebrow') }}</p>
        <h1>{{ i18n.t('contact.heading.title') }}</h1>
        <p class="lead">{{ i18n.t('contact.heading.body') }}</p>
      </div>
      <div class="contact-seal" aria-hidden="true"><span>ATHIR</span><i>✳</i><span>CONNECT</span></div>
    </section>
    <section class="contact-content page-shell section-pad">
      <div class="contact-aside">
        <p class="eyebrow">{{ i18n.t('contact.info.heading') }}</p>
        <h2>{{ i18n.t('contact.info.body') }}</h2>
        <div class="contact-aside-note">
          <span aria-hidden="true">↗</span>
          <div><strong>{{ i18n.t('contact.info.responseTitle') }}</strong><p>{{ i18n.t('contact.info.responseBody') }}</p></div>
        </div>
      </div>
      <div class="contact-form-panel"><app-inquiry-form /></div>
    </section>
  `
})
export class ContactPageComponent {
  constructor(readonly i18n: I18nService) {}
}
