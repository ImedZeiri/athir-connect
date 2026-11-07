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
            [attr.aria-invalid]="inquiryForm.submitted && inquiryForm.controls['name']?.invalid"
            [placeholder]="i18n.t('form.name')">
          @if (inquiryForm.submitted && inquiryForm.controls['name']?.invalid) {
            <small class="field-error">{{ i18n.t('form.required') }}</small>
          }
        </label>
        <label class="form-field">
          <span>{{ i18n.t('form.email') }} <b aria-hidden="true">*</b></span>
          <input [(ngModel)]="request.email" name="email" type="email" autocomplete="email" required email
            [attr.aria-invalid]="inquiryForm.submitted && inquiryForm.controls['email']?.invalid"
            [placeholder]="i18n.t('form.email')">
          @if (inquiryForm.submitted && inquiryForm.controls['email']?.invalid) {
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
            [attr.aria-invalid]="inquiryForm.submitted && inquiryForm.controls['service']?.invalid">
            <option value="" disabled>{{ i18n.t('form.servicePlaceholder') }}</option>
            @for (service of services; track service.id) {
              <option [value]="service.id">{{ i18n.t(service.translationKey + '.title') }}</option>
            }
          </select>
          @if (inquiryForm.submitted && inquiryForm.controls['service']?.invalid) {
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
          [attr.aria-invalid]="inquiryForm.submitted && inquiryForm.controls['message']?.invalid"
          [placeholder]="i18n.t('form.messagePlaceholder')"></textarea>
        @if (inquiryForm.submitted && inquiryForm.controls['message']?.invalid) {
          <small class="field-error">{{ i18n.t('form.required') }}</small>
        }
      </label>

      <button class="button button-primary form-submit" type="submit">
        {{ i18n.t('form.submit') }} <span aria-hidden="true">↗</span>
      </button>

      @if (whatsappUrl) {
        <div class="form-confirmation" role="status" aria-live="polite">
          <p>{{ i18n.t('form.whatsappReady') }}</p>
          <a class="button button-whatsapp" [href]="whatsappUrl" target="_blank" rel="noopener noreferrer">
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
    .form-confirmation { display: grid; gap: 12px; padding: 19px; border-inline-start: 3px solid var(--brand-teal); background: var(--surface-soft); }
    .form-confirmation p { margin: 0; color: var(--brand-teal); line-height: 1.65; }
    .form-confirmation small { color: var(--ink-muted); line-height: 1.6; }
    .button-whatsapp { justify-self: start; background: #236a53; }
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
