import { Injectable } from '@angular/core';
import { ContactRequest } from '../models/site.models';
import { SERVICE_CATALOG } from '../data/service-catalog';
import { I18nService } from './i18n.service';

@Injectable({ providedIn: 'root' })
export class WhatsappMessageService {
  constructor(private readonly i18n: I18nService) {}

  buildUrl(request: ContactRequest, registration: boolean): string {
    const language = this.i18n.language();
    const service = SERVICE_CATALOG.find((item) => item.id === request.service);
    const lines = [
      registration
        ? this.i18n.t('registration.heading.title')
        : this.i18n.t('contact.heading.title'),
      `${this.i18n.t('form.name')}: ${request.name.trim()}`,
      `${this.i18n.t('form.email')}: ${request.email.trim()}`,
      request.phone.trim() ? `${this.i18n.t('form.phone')}: ${request.phone.trim()}` : '',
      service ? `${this.i18n.t('form.service')}: ${this.i18n.t(`${service.translationKey}.title`)}` : '',
      request.languageLevel ? `${this.i18n.t('form.level')}: ${this.i18n.t(`form.level${request.languageLevel}`)}` : '',
      `${this.i18n.t('form.message')}: ${request.message.trim()}`
    ].filter(Boolean);

    return `https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}&lang=${language}`;
  }
}
