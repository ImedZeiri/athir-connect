import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { LanguageCode } from '../models/site.models';
import { TRANSLATIONS } from '../i18n/translations';

const STORAGE_KEY = 'athir-connect-language';
const DEFAULT_LANGUAGE: LanguageCode = 'fr';
const SUPPORTED_LANGUAGES: readonly LanguageCode[] = ['fr', 'en', 'de', 'ar'];

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly language = signal<LanguageCode>(DEFAULT_LANGUAGE);
  private readonly browser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    this.browser = isPlatformBrowser(platformId);
    if (this.browser) {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (this.isLanguage(stored)) this.language.set(stored);
    }
    this.updateDocumentLanguage();
  }

  t(key: string): string {
    const active = TRANSLATIONS[this.language()];
    const fallback = TRANSLATIONS[DEFAULT_LANGUAGE];
    return active[key as keyof typeof active] ?? fallback[key as keyof typeof fallback] ?? key;
  }

  copy(keys: readonly string[]): Record<string, string> {
    return Object.fromEntries(keys.map((key) => [key, this.t(key)]));
  }

  setLanguage(value: string): void {
    if (!this.isLanguage(value)) return;
    this.language.set(value);
    if (this.browser) window.localStorage.setItem(STORAGE_KEY, value);
    this.updateDocumentLanguage();
  }

  private isLanguage(value: string | null): value is LanguageCode {
    return SUPPORTED_LANGUAGES.includes(value as LanguageCode);
  }

  private updateDocumentLanguage(): void {
    const language = this.language();
    this.document.documentElement.lang = language;
    this.document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }
}
