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
            <a href="https://www.facebook.com/share/19uYsKwUNb/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"
               class="contact-social-link" [attr.aria-label]="i18n.t('social.facebook')">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
              <span>{{ i18n.t('social.facebook') }}</span>
            </a>
            <a href="https://www.instagram.com/athir_connect?srtk=MWNjNXRyajlxc2ZoMA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer"
               class="contact-social-link" [attr.aria-label]="i18n.t('social.instagram')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                   stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/>
              </svg>
              <span>{{ i18n.t('social.instagram') }}</span>
            </a>
            <a href="https://www.tiktok.com/@lilyhm20?_r=1&_t=ZG-9BD5jRtnUI4" target="_blank" rel="noopener noreferrer"
               class="contact-social-link" [attr.aria-label]="i18n.t('social.tiktok')">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
              </svg>
              <span>{{ i18n.t('social.tiktok') }}</span>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&to=athirconnect@gmail.com" target="_blank" rel="noopener noreferrer"
               class="contact-social-link" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M2 7l10 7 10-7"/>
              </svg>
              <span>athirconnect&#64;gmail.com</span>
            </a>
            <a href="https://wa.me/21623815975" target="_blank" rel="noopener noreferrer"
               class="contact-social-link" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.57A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.24-1.44l-.37-.22-3.87.99 1.02-3.76-.24-.38A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.47-7.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51H6.9c-.17 0-.45.06-.69.3-.23.23-.9.88-.9 2.14s.92 2.48 1.05 2.65c.13.17 1.82 2.78 4.41 3.9.62.27 1.1.43 1.47.55.62.2 1.18.17 1.63.1.5-.07 1.53-.62 1.75-1.23.22-.6.22-1.12.15-1.23-.07-.1-.27-.17-.57-.32z"/>
              </svg>
              <span>+216 23 815 975</span>
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
