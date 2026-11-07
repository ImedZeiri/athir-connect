import { Component, inject, signal } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';

const WA_NUMBER = '213XXXXXXXXX'; // ← remplacer par le vrai numéro

@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  template: `
    <div class="wa-fab-wrap" [class.is-open]="open()">

      <!-- Bubble tooltip -->
      <div class="wa-bubble" role="status" aria-live="polite">
        <div class="wa-bubble-header">
          <span class="wa-bubble-avatar" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="#25D366"/>
              <path d="M20 10C14.48 10 10 14.48 10 20c0 1.85.5 3.58 1.37 5.07L10 30l5.09-1.34A9.94 9.94 0 0 0 20 30c5.52 0 10-4.48 10-10S25.52 10 20 10Z" fill="#fff" opacity=".15"/>
              <path d="M26.5 23.5c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51H16.5c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" fill="#fff"/>
            </svg>
          </span>
          <div class="wa-bubble-info">
            <strong>ATHIR CONNECT</strong>
            <span class="wa-online">
              <span class="wa-dot" aria-hidden="true"></span>
              {{ i18n.t('wa.online') }}
            </span>
          </div>
          <button class="wa-bubble-close" type="button" (click)="toggle()" [attr.aria-label]="i18n.t('wa.close')">
            <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div class="wa-bubble-body">
          <p>{{ i18n.t('wa.greeting') }}</p>
        </div>
        <a class="wa-bubble-cta" [href]="waUrl" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 18.33A8.33 8.33 0 1 0 1.67 10 8.33 8.33 0 0 0 10 18.33Z" stroke="currentColor" stroke-width="1.3"/>
            <path d="M6.67 10h6.66M10 6.67 13.33 10 10 13.33" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ i18n.t('wa.cta') }}
        </a>
      </div>

      <!-- FAB button -->
      <button
        class="wa-fab"
        type="button"
        [attr.aria-label]="i18n.t('wa.label')"
        [attr.aria-expanded]="open()"
        (click)="toggle()"
      >
        @if (!open()) {
          <svg class="wa-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M16 2C8.27 2 2 8.27 2 16c0 2.47.67 4.78 1.83 6.77L2 30l7.47-1.8A13.93 13.93 0 0 0 16 30c7.73 0 14-6.27 14-14S23.73 2 16 2Z" fill="#fff" opacity=".18"/>
            <path d="M22.5 19.5c-.4-.2-2.36-1.16-2.72-1.3-.36-.13-.62-.2-.88.2-.26.4-1.02 1.3-1.25 1.56-.23.27-.46.3-.86.1-.4-.2-1.68-.62-3.2-1.97-1.18-1.05-1.98-2.35-2.21-2.75-.23-.4-.02-.62.17-.82.18-.18.4-.46.6-.7.2-.22.26-.4.4-.66.13-.26.06-.5-.03-.7-.1-.2-.88-2.17-1.2-2.97-.32-.77-.65-.67-.88-.68H9.5c-.26 0-.7.1-1.06.5-.36.4-1.38 1.35-1.38 3.3s1.42 3.83 1.62 4.1c.2.26 2.8 4.27 6.77 5.98.95.41 1.69.65 2.27.84.95.3 1.82.26 2.5.16.76-.12 2.36-.96 2.7-1.9.33-.93.33-1.73.23-1.9-.1-.16-.36-.26-.76-.46Z" fill="#fff"/>
          </svg>
          <span class="wa-pulse" aria-hidden="true"></span>
        } @else {
          <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" style="width:18px;height:18px">
            <path d="M2 2l10 10M12 2L2 12" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
          </svg>
        }
      </button>
    </div>
  `,
  styles: [`
    .wa-fab-wrap {
      position: fixed;
      inset-inline-end: 28px;
      inset-block-end: 28px;
      z-index: 999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 14px;
    }

    /* ── Bubble ── */
    .wa-bubble {
      width: 300px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgb(0 0 0 / 18%);
      overflow: hidden;
      opacity: 0;
      transform: translateY(12px) scale(.96);
      pointer-events: none;
      transition: opacity .22s ease, transform .22s ease;
    }
    .is-open .wa-bubble {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    .wa-bubble-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 14px 12px;
      background: #075E54;
      color: #fff;
    }
    .wa-bubble-avatar svg { width: 38px; height: 38px; flex-shrink: 0; }
    .wa-bubble-info {
      flex: 1;
      display: grid;
      gap: 3px;
      strong { font-size: .82rem; font-weight: 700; letter-spacing: .02em; }
    }
    .wa-online {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: .7rem;
      opacity: .85;
    }
    .wa-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #25D366;
      animation: wa-blink 2s ease infinite;
    }
    .wa-bubble-close {
      display: grid;
      place-items: center;
      width: 28px; height: 28px;
      border: 0;
      border-radius: 50%;
      background: rgb(255 255 255 / 15%);
      color: #fff;
      cursor: pointer;
      transition: background .18s ease;
      &:hover { background: rgb(255 255 255 / 28%); }
      svg { width: 12px; height: 12px; }
    }

    .wa-bubble-body {
      padding: 16px 16px 4px;
      p {
        margin: 0;
        color: #333;
        font-size: .88rem;
        line-height: 1.65;
      }
    }

    .wa-bubble-cta {
      display: flex;
      align-items: center;
      gap: 9px;
      margin: 14px 16px 16px;
      padding: 11px 16px;
      background: #25D366;
      color: #fff;
      font-size: .82rem;
      font-weight: 700;
      text-decoration: none;
      border-radius: 6px;
      transition: background .18s ease;
      svg { width: 18px; height: 18px; flex-shrink: 0; }
      &:hover { background: #1ebe5d; }
    }

    /* ── FAB button ── */
    .wa-fab {
      position: relative;
      display: grid;
      place-items: center;
      width: 58px; height: 58px;
      border: 0;
      border-radius: 50%;
      background: #25D366;
      color: #fff;
      cursor: pointer;
      box-shadow: 0 4px 18px rgb(37 211 102 / 45%);
      transition: background .2s ease, transform .2s ease, box-shadow .2s ease;
      &:hover {
        background: #1ebe5d;
        transform: scale(1.07);
        box-shadow: 0 6px 24px rgb(37 211 102 / 55%);
      }
    }
    .wa-icon { width: 28px; height: 28px; }

    .wa-pulse {
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid #25D366;
      opacity: 0;
      animation: wa-pulse 2.4s ease infinite;
    }

    @keyframes wa-pulse {
      0%   { opacity: .6; transform: scale(1); }
      70%  { opacity: 0;  transform: scale(1.35); }
      100% { opacity: 0;  transform: scale(1.35); }
    }
    @keyframes wa-blink {
      0%, 100% { opacity: 1; }
      50%       { opacity: .4; }
    }

    @media (max-width: 480px) {
      .wa-fab-wrap { inset-inline-end: 16px; inset-block-end: 16px; }
      .wa-bubble { width: calc(100vw - 32px); }
    }
  `]
})
export class WhatsappFabComponent {
  readonly i18n = inject(I18nService);
  readonly open = signal(false);

  get waUrl(): string {
    const msg = encodeURIComponent(this.i18n.t('wa.greeting'));
    return `https://wa.me/${WA_NUMBER}?text=${msg}`;
  }

  toggle(): void {
    this.open.update((v) => !v);
  }
}
