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
          <div>
            <strong>{{ i18n.t('contact.info.responseTitle') }}</strong>
            <p>{{ i18n.t('contact.info.responseBody') }}</p>
          </div>
        </div>

        <div class="contact-social">
          <span class="contact-social-label">{{ i18n.t('social.follow') }}</span>
          <div class="contact-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
               class="contact-social-link" [attr.aria-label]="i18n.t('social.facebook')">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
              <span>{{ i18n.t('social.facebook') }}</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               class="contact-social-link" [attr.aria-label]="i18n.t('social.instagram')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                   stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/>
              </svg>
              <span>{{ i18n.t('social.instagram') }}</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               class="contact-social-link" [attr.aria-label]="i18n.t('social.linkedin')">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              <span>{{ i18n.t('social.linkedin') }}</span>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
               class="contact-social-link" [attr.aria-label]="i18n.t('social.youtube')">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#f8f6ef"/>
              </svg>
              <span>{{ i18n.t('social.youtube') }}</span>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
               class="contact-social-link" [attr.aria-label]="i18n.t('social.tiktok')">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
              </svg>
              <span>{{ i18n.t('social.tiktok') }}</span>
            </a>
          </div>
        </div>
      </div>

      <div class="contact-form-panel"><app-inquiry-form /></div>
    </section>
  `,
  styles: [`
    .contact-social { margin-top: 36px; }
    .contact-social-label {
      display: block;
      margin-bottom: 14px;
      color: var(--ink-muted);
      font-size: .7rem;
      font-weight: 700;
      letter-spacing: .14em;
      text-transform: uppercase;
    }
    .contact-social-icons { display: flex; flex-direction: column; gap: 8px; }
    .contact-social-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border: 1px solid var(--line);
      color: var(--ink-muted);
      text-decoration: none;
      font-size: .84rem;
      font-weight: 500;
      transition: color .18s ease, border-color .18s ease, background .18s ease;
      svg { width: 18px; height: 18px; flex-shrink: 0; }
      &:hover { color: var(--brand-teal); border-color: var(--brand-teal); background: var(--surface-soft); }
    }
  `]
})
export class ContactPageComponent {
  constructor(readonly i18n: I18nService) {}
}
