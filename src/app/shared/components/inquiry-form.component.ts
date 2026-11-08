import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ServiceId } from '../../core/models/site.models';
import { SERVICE_CATALOG } from '../../core/data/service-catalog';
import { I18nService } from '../../core/services/i18n.service';
import { WhatsappMessageService } from '../../core/services/whatsapp-message.service';

@Component({
  selector: 'app-inquiry-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form class="inquiry-form" #inquiryForm="ngForm" (ngSubmit)="prepareMessage(inquiryForm)" novalidate>
      <div class="form-row">
        <label class="form-field">
          <span>{{ i18n.t('form.name') }} <b aria-hidden="true">*</b></span>
          <input [(ngModel)]="request.name" name="name" type="text" autocomplete="name" required minlength="2"
            [attr.aria-invalid]="inquiryForm.submitted && inquiryForm.controls['name'].invalid"
            [placeholder]="i18n.t('form.name')">
          @if (inquiryForm.submitted && inquiryForm.controls['name'].invalid) {
            <small class="field-error">{{ i18n.t('form.required') }}</small>
          }
        </label>
        <label class="form-field">
          <span>{{ i18n.t('form.email') }} <b aria-hidden="true">*</b></span>
          <input [(ngModel)]="request.email" name="email" type="email" autocomplete="email" required email
            [attr.aria-invalid]="inquiryForm.submitted && inquiryForm.controls['email'].invalid"
            [placeholder]="i18n.t('form.email')">
          @if (inquiryForm.submitted && inquiryForm.controls['email'].invalid) {
            <small class="field-error">{{ i18n.t('form.invalidEmail') }}</small>
          }
        </label>
      </div>

      <div class="form-row">
        <label class="form-field">
          <span>{{ i18n.t('form.phone') }}</span>
          <input [(ngModel)]="request.phone" name="phone" type="tel" autocomplete="tel"
            [placeholder]="i18n.t('form.phone')">
        </label>
        <label class="form-field">
          <span>{{ i18n.t('form.service') }} <b aria-hidden="true">*</b></span>
          <select [(ngModel)]="request.service" name="service" required
            [attr.aria-invalid]="inquiryForm.submitted && inquiryForm.controls['service'].invalid">
            <option value="" disabled>{{ i18n.t('form.servicePlaceholder') }}</option>
            @for (service of services; track service.id) {
              <option [value]="service.id">{{ i18n.t(service.translationKey + '.title') }}</option>
            }
          </select>
          @if (inquiryForm.submitted && inquiryForm.controls['service'].invalid) {
            <small class="field-error">{{ i18n.t('form.required') }}</small>
          }
        </label>
      </div>

      <label class="form-field">
        <span>{{ i18n.t('form.level') }}</span>
        <select [(ngModel)]="request.languageLevel" name="languageLevel">
          <option value="">{{ i18n.t('form.levelPlaceholder') }}</option>
          @for (level of levels; track level.code) {
            <option [value]="level.code">{{ i18n.t(level.key) }}</option>
          }
        </select>
      </label>

      <label class="form-field">
        <span>{{ i18n.t('form.message') }} <b aria-hidden="true">*</b></span>
        <textarea [(ngModel)]="request.message" name="message" required minlength="10" rows="5"
          [attr.aria-invalid]="inquiryForm.submitted && inquiryForm.controls['message'].invalid"
          [placeholder]="i18n.t('form.messagePlaceholder')"></textarea>
        @if (inquiryForm.submitted && inquiryForm.controls['message'].invalid) {
          <small class="field-error">{{ i18n.t('form.required') }}</small>
        }
      </label>

      <button class="button button-primary form-submit" type="submit">
        {{ i18n.t('form.submit') }} <span aria-hidden="true">↗</span>
      </button>

      @if (whatsappUrl) {
        <div class="form-confirmation" role="status" aria-live="polite">
          <div class="form-confirmation-top">
            <span class="form-confirmation-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.57A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.24-1.44l-.37-.22-3.87.99 1.02-3.76-.24-.38A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.47-7.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51H6.9c-.17 0-.45.06-.69.3-.23.23-.9.88-.9 2.14s.92 2.48 1.05 2.65c.13.17 1.82 2.78 4.41 3.9.62.27 1.1.43 1.47.55.62.2 1.18.17 1.63.1.5-.07 1.53-.62 1.75-1.23.22-.6.22-1.12.15-1.23-.07-.1-.27-.17-.57-.32z"/></svg>
            </span>
            <p>{{ i18n.t('form.whatsappReady') }}</p>
            <button type="button" class="form-confirmation-close" (click)="whatsappUrl = ''" aria-label="Fermer">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 5l10 10M15 5L5 15"/></svg>
            </button>
          </div>
          <a class="button-whatsapp" [href]="whatsappUrl" target="_blank" rel="noopener noreferrer">
            {{ i18n.t('form.whatsapp') }} <span aria-hidden="true">↗</span>
          </a>
          <small>{{ i18n.t('form.whatsappNote') }}</small>
        </div>
      }
    </form>
  `,
  styles: [`
    .inquiry-form { display: grid; gap: 22px; }
    .form-row { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 18px; }
    .form-field { display: grid; gap: 8px; color: var(--ink); font-size: .84rem; font-weight: 600; }
    .form-field b { color: var(--brand-coral); }
    .form-field input, .form-field select, .form-field textarea { width: 100%; min-height: 50px; padding: 13px 15px; border: 1px solid var(--line); border-radius: 0; color: var(--ink); background: var(--surface); font: 400 .94rem/1.5 var(--font-body); transition: border-color .18s ease, box-shadow .18s ease; }
    .form-field textarea { min-height: 145px; resize: vertical; }
    .form-field input::placeholder, .form-field textarea::placeholder { color: #939a93; }
    .form-field input:focus, .form-field select:focus, .form-field textarea:focus { outline: none; border-color: var(--brand-teal); box-shadow: 0 0 0 3px rgb(25 64 60 / 10%); }
    .form-field [aria-invalid="true"] { border-color: #a63e32; }
    .field-error { color: #a63e32; font-size: .78rem; font-weight: 500; }
    .form-submit { justify-self: start; border: 0; cursor: pointer; font-family: inherit; }
    .form-confirmation {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: grid;
      gap: 10px;
      width: 300px;
      padding: 14px 16px;
      background: #fff;
      border-radius: 14px;
      border: 1px solid #d4e8d4;
      box-shadow: 0 8px 32px -8px rgb(0 0 0 / 22%), 0 2px 8px -2px rgb(0 0 0 / 10%);
      animation: toast-in .28s cubic-bezier(.22,.61,.36,1);
    }
    @keyframes toast-in {
      from { opacity: 0; transform: translateY(12px) scale(.97); }
    }
    .form-confirmation-top {
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }
    .form-confirmation-icon {
      display: grid;
      place-items: center;
      width: 30px;
      height: 30px;
      flex-shrink: 0;
      border-radius: 50%;
      background: #e8f5e9;
      color: #25d366;
      svg { width: 15px; height: 15px; }
    }
    .form-confirmation-top p {
      flex: 1;
      margin: 0;
      color: var(--ink);
      font-size: .8rem;
      font-weight: 600;
      line-height: 1.5;
      padding-top: 4px;
    }
    .form-confirmation-close {
      display: grid;
      place-items: center;
      width: 22px;
      height: 22px;
      flex-shrink: 0;
      border: 1px solid var(--line);
      border-radius: 50%;
      background: transparent;
      color: var(--ink-muted);
      cursor: pointer;
      transition: background .15s ease, color .15s ease;
      svg { width: 9px; height: 9px; }
      &:hover { background: var(--line); color: var(--ink); }
    }
    .button-whatsapp {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      min-height: 38px;
      padding: 0 14px;
      border-radius: 10px;
      background: #25d366;
      color: #fff;
      font: 700 .8rem/1 var(--font-body);
      text-decoration: none;
      letter-spacing: .02em;
      transition: background .18s ease, transform .18s ease;
      &:hover { background: #1ebe5d; transform: translateY(-1px); }
    }
    .form-confirmation small {
      color: var(--ink-muted);
      font-size: .72rem;
      line-height: 1.5;
    }
    @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } .form-submit, .button-whatsapp { width: 100%; justify-content: center; } }
  `]
})
export class InquiryFormComponent {
  @Input() registration = false;
  readonly services = SERVICE_CATALOG;
  readonly levels = [
    { code: 'A1', key: 'form.levelA1' },
    { code: 'A2', key: 'form.levelA2' },
    { code: 'B1', key: 'form.levelB1' },
    { code: 'B2', key: 'form.levelB2' },
    { code: 'C1', key: 'form.levelC1' },
    { code: 'C2', key: 'form.levelC2' }
  ];
  request = this.emptyRequest();
  whatsappUrl = '';

  constructor(
    readonly i18n: I18nService,
    private readonly whatsapp: WhatsappMessageService
  ) {}

  prepareMessage(form: NgForm): void {
    if (form.invalid) return;
    this.whatsappUrl = this.whatsapp.buildUrl(this.request, this.registration);
  }

  private emptyRequest(): {
    name: string;
    email: string;
    phone: string;
    service: ServiceId | '';
    languageLevel: string;
    message: string;
  } {
    return { name: '', email: '', phone: '', service: '', languageLevel: '', message: '' };
  }
}
