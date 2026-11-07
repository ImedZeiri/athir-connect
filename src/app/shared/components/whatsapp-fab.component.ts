import {
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';

const WA_NUMBER = '213XXXXXXXXX'; // ← remplacer par le vrai numéro

interface ChatMessage {
  id: number;
  from: 'bot' | 'user';
  text: string;
  time: string;
  cta?: boolean;
}

interface Topic {
  id: string;
  label: string;
  keywords: string[];
  answer: string[];
}

/** Scénarios du faux chatbot (texte en français, à déplacer dans i18n si besoin). */
const TOPICS: Topic[] = [
  {
    id: 'visa',
    label: '🛂 Visa étudiant',
    keywords: ['visa', 'ambassade', 'consulat', 'rendez-vous', 'rdv'],
    answer: [
      'Nous préparons votre dossier de visa étudiant de A à Z : liste des pièces, vérification de chaque document et préparation avant le dépôt.',
      'Vers quel pays souhaitez-vous partir ? Un conseiller peut vous répondre en détail 👇',
    ],
  },
  {
    id: 'langues',
    label: '🗣️ Cours de langue',
    keywords: ['cours', 'langue', 'allemand', 'anglais', 'français', 'francais', 'arabe', 'niveau', 'a1', 'b1', 'b2', 'c1'],
    answer: [
      'Nous proposons des cours en FR, EN, DE et AR, du niveau A1 au C2, adaptés à votre rythme.',
      'Un petit test de niveau gratuit permet de vous placer dans le bon groupe. Souhaitez-vous qu’un conseiller vous le propose ?',
    ],
  },
  {
    id: 'admission',
    label: '🎓 Admission universitaire',
    keywords: ['admission', 'université', 'universite', 'inscription', 'candidature', 'master', 'licence', 'études', 'etudes'],
    answer: [
      'Nous vous aidons à choisir la bonne formation, à constituer votre dossier de candidature et à suivre chaque étape jusqu’à la réponse des universités.',
      'Dites-nous votre domaine d’études et votre pays souhaité, un conseiller vous orientera 👇',
    ],
  },
  {
    id: 'equivalence',
    label: '📄 Équivalence de diplômes',
    keywords: ['équivalence', 'equivalence', 'diplôme', 'diplome', 'reconnaissance', 'traduction'],
    answer: [
      'Nous vous guidons pas à pas pour la reconnaissance de votre diplôme : documents à fournir, traductions et démarches auprès des organismes compétents.',
      'Quel diplôme souhaitez-vous faire reconnaître ?',
    ],
  },
  {
    id: 'examens',
    label: '📝 Préparation aux examens',
    keywords: ['examen', 'goethe', 'ielts', 'toefl', 'test', 'delf', 'dalf', 'testdaf', 'certification'],
    answer: [
      'Nous proposons une préparation ciblée avec exercices et simulations d’examen (Goethe, IELTS, TOEFL, DELF…).',
      'Quel examen visez-vous et pour quelle date ?',
    ],
  },
];

const AGENT_LABEL = '💬 Parler à un conseiller';
const AGENT_KEYWORDS = ['conseiller', 'humain', 'agent', 'whatsapp', 'appeler', 'téléphone', 'telephone', 'contact'];
const HELLO_KEYWORDS = ['bonjour', 'salut', 'salam', 'hello', 'hi', 'bonsoir', 'مرحبا'];
const PRICE_KEYWORDS = ['prix', 'tarif', 'coût', 'cout', 'combien', 'gratuit'];

@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  template: `
    <div class="chat-wrap" [class.is-open]="open()">

      <!-- ── Chat window ─────────────────────────────────────── -->
      <section
        class="chat"
        role="dialog"
        aria-label="ATHIR CONNECT"
        [attr.aria-hidden]="!open()"
      >
        <header class="chat-header">
          <span class="chat-avatar">
            <img src="assets/logo.jpg" alt="" width="42" height="42">
          </span>
          <div class="chat-info">
            <strong>ATHIR CONNECT</strong>
            <span class="chat-online">
              @if (typing()) {
                {{ typingLabel }}
              } @else {
                <span class="chat-dot" aria-hidden="true"></span>{{ i18n.t('wa.online') }}
              }
            </span>
          </div>
          <button class="chat-close" type="button" (click)="toggle()" [attr.aria-label]="i18n.t('wa.close')">
            <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            </svg>
          </button>
        </header>

        <div class="chat-body" #scroller aria-live="polite">
          <span class="chat-day">Aujourd’hui</span>

          @for (m of messages(); track m.id) {
            <div class="msg" [class.msg-user]="m.from === 'user'" [class.msg-bot]="m.from === 'bot'">
              <p>{{ m.text }}</p>
              @if (m.cta) {
                <a class="msg-cta" [href]="waUrl" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <path d="M22.5 19.5c-.4-.2-2.36-1.16-2.72-1.3-.36-.13-.62-.2-.88.2-.26.4-1.02 1.3-1.25 1.56-.23.27-.46.3-.86.1-.4-.2-1.68-.62-3.2-1.97-1.18-1.05-1.98-2.35-2.21-2.75-.23-.4-.02-.62.17-.82.18-.18.4-.46.6-.7.2-.22.26-.4.4-.66.13-.26.06-.5-.03-.7-.1-.2-.88-2.17-1.2-2.97-.32-.77-.65-.67-.88-.68H9.5c-.26 0-.7.1-1.06.5-.36.4-1.38 1.35-1.38 3.3s1.42 3.83 1.62 4.1c.2.26 2.8 4.27 6.77 5.98.95.41 1.69.65 2.27.84.95.3 1.82.26 2.5.16.76-.12 2.36-.96 2.7-1.9.33-.93.33-1.73.23-1.9-.1-.16-.36-.26-.76-.46Z" fill="currentColor"/>
                  </svg>
                  {{ i18n.t('wa.cta') }}
                </a>
              }
              <span class="msg-meta">
                {{ m.time }}
                @if (m.from === 'user') {
                  <svg class="msg-ticks" viewBox="0 0 18 12" fill="none" aria-hidden="true">
                    <path d="M1 6.5 4.5 10 11 2M7 10l6.5-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                }
              </span>
            </div>
          }

          @if (typing()) {
            <div class="msg msg-bot msg-typing" aria-label="Écriture en cours">
              <span></span><span></span><span></span>
            </div>
          }

          @if (showChips() && !typing()) {
            <div class="chips" role="group" aria-label="Suggestions">
              @for (t of topics; track t.id) {
                <button class="chip" type="button" (click)="pick(t)">{{ t.label }}</button>
              }
              <button class="chip chip-agent" type="button" (click)="pickAgent()">{{ agentLabel }}</button>
            </div>
          }
        </div>

        <form class="chat-input" (submit)="$event.preventDefault(); send()">
          <input
            #field
            type="text"
            name="message"
            autocomplete="off"
            maxlength="240"
            placeholder="Écrivez votre message…"
            aria-label="Votre message"
            [value]="draft()"
            (input)="draft.set(field.value)"
          >
          <button class="chat-send" type="submit" aria-label="Envoyer" [disabled]="!draft().trim() || typing()">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12 2-12 2 0 6.4Z" fill="currentColor"/>
            </svg>
          </button>
        </form>
      </section>

      <!-- ── FAB ─────────────────────────────────────────────── -->
      <button
        class="fab"
        type="button"
        [attr.aria-label]="i18n.t('wa.label')"
        [attr.aria-expanded]="open()"
        (click)="toggle()"
      >
        @if (!open()) {
          <svg class="fab-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M16 2C8.27 2 2 8.27 2 16c0 2.47.67 4.78 1.83 6.77L2 30l7.47-1.8A13.93 13.93 0 0 0 16 30c7.73 0 14-6.27 14-14S23.73 2 16 2Z" fill="#fff" opacity=".18"/>
            <path d="M22.5 19.5c-.4-.2-2.36-1.16-2.72-1.3-.36-.13-.62-.2-.88.2-.26.4-1.02 1.3-1.25 1.56-.23.27-.46.3-.86.1-.4-.2-1.68-.62-3.2-1.97-1.18-1.05-1.98-2.35-2.21-2.75-.23-.4-.02-.62.17-.82.18-.18.4-.46.6-.7.2-.22.26-.4.4-.66.13-.26.06-.5-.03-.7-.1-.2-.88-2.17-1.2-2.97-.32-.77-.65-.67-.88-.68H9.5c-.26 0-.7.1-1.06.5-.36.4-1.38 1.35-1.38 3.3s1.42 3.83 1.62 4.1c.2.26 2.8 4.27 6.77 5.98.95.41 1.69.65 2.27.84.95.3 1.82.26 2.5.16.76-.12 2.36-.96 2.7-1.9.33-.93.33-1.73.23-1.9-.1-.16-.36-.26-.76-.46Z" fill="#fff"/>
          </svg>
          <span class="fab-pulse" aria-hidden="true"></span>
          @if (unread() > 0) {
            <span class="fab-badge" aria-label="1 nouveau message">{{ unread() }}</span>
          }
        } @else {
          <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" class="fab-close">
            <path d="M2 2l10 10M12 2L2 12" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
          </svg>
        }
      </button>
    </div>
  `,
  styles: [`

    :host {
      --wa-green: #25d366;
      --wa-green-dark: #1ebe5d;
      --chat-w: 380px;
      --chat-gap: 20px;
      --fab-size: 56px;
    }

    .chat-wrap {
      position: fixed;
      inset-inline-end: max(var(--chat-gap), env(safe-area-inset-right));
      inset-block-end: max(var(--chat-gap), env(safe-area-inset-bottom));
      z-index: 999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 12px;
      max-width: calc(100vw - 2 * var(--chat-gap));
    }

    /* ── Window ───────────────────────────────────────────── */
    .chat {
      display: flex;
      flex-direction: column;
      width: min(var(--chat-w), calc(100vw - 2 * var(--chat-gap)));
      /* hauteur fluide : jamais plus haute que l'écran moins le FAB et les marges */
      height: clamp(380px, 72dvh, 600px);
      max-height: calc(100dvh - var(--fab-size) - 2 * var(--chat-gap) - 12px);
      background: #efeae2;
      border-radius: 18px;
      box-shadow:
        0 24px 48px -16px rgb(25 64 60 / 45%),
        0 4px 12px rgb(0 0 0 / 10%),
        0 0 0 1px rgb(25 64 60 / 8%);
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      transform: translateY(14px) scale(.96);
      transform-origin: bottom right;
      pointer-events: none;
      transition: opacity .22s ease, transform .22s ease, visibility 0s linear .22s;
    }
    :host-context([dir='rtl']) .chat { transform-origin: bottom left; }
    .is-open .chat {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
      pointer-events: auto;
      transition-delay: 0s;
    }

    /* ── Header ───────────────────────────────────────────── */
    .chat-header {
      display: flex;
      align-items: center;
      gap: 11px;
      flex-shrink: 0;
      padding: 12px 12px 12px 14px;
      background: linear-gradient(135deg, var(--brand-teal, #19403c) 0%, var(--brand-teal-mid, #26534f) 100%);
      border-block-end: 3px solid var(--brand-coral, #be644d);
      color: #fff;
    }
    .chat-avatar {
      position: relative;
      flex-shrink: 0;
      img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgb(255 255 255 / 65%);
        background: var(--brand-teal, #19403c);
      }
    }
    .chat-avatar-status {
      position: absolute;
      inset-block-end: -1px;
      inset-inline-end: -1px;
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: var(--wa-green);
      border: 2px solid var(--brand-teal, #19403c);
    }
    .chat-info {
      flex: 1;
      display: grid;
      gap: 2px;
      min-width: 0;
      strong {
        overflow: hidden;
        font-size: .88rem;
        font-weight: 700;
        letter-spacing: .04em;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .chat-online {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: .72rem;
      line-height: 1.2;
      opacity: .88;
    }
    .chat-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--wa-green);
      animation: blink 2s ease infinite;
    }
    .chat-close {
      display: grid;
      place-items: center;
      flex-shrink: 0;
      width: 34px;
      height: 34px;
      border: 0;
      border-radius: 50%;
      background: rgb(255 255 255 / 12%);
      color: #fff;
      cursor: pointer;
      transition: background .18s ease, transform .18s ease;
      &:hover { background: rgb(255 255 255 / 26%); transform: rotate(90deg); }
      svg { width: 12px; height: 12px; }
    }

    /* ── Messages ─────────────────────────────────────────── */
    .chat-body {
      flex: 1 1 auto;
      min-height: 0; /* indispensable pour que le scroll fonctionne dans un flex column */
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding: 14px 14px 12px;
      overflow-y: auto;
      overscroll-behavior: contain;
      scroll-padding-block-end: 12px;
      background-color: #efeae2;
      background-image:
        radial-gradient(rgb(25 64 60 / 5%) 1px, transparent 1px),
        radial-gradient(rgb(190 100 77 / 5%) 1px, transparent 1px);
      background-size: 22px 22px, 22px 22px;
      background-position: 0 0, 11px 11px;
      scrollbar-width: thin;
      scrollbar-color: rgb(25 64 60 / 25%) transparent;
    }
    .chat-day {
      align-self: center;
      margin-block-end: 6px;
      padding: 3px 11px;
      border-radius: 8px;
      background: rgb(255 255 255 / 88%);
      box-shadow: 0 1px 1px rgb(0 0 0 / 8%);
      color: #54656f;
      font-size: .66rem;
      font-weight: 600;
      letter-spacing: .05em;
      text-transform: uppercase;
    }

    .msg {
      position: relative;
      max-width: 82%;
      padding: 7px 10px 5px;
      border-radius: 12px;
      box-shadow: 0 1px 1px rgb(0 0 0 / 10%);
      animation: pop .22s ease both;
      p {
        margin: 0;
        color: #1a2e2b;
        font-size: .86rem;
        line-height: 1.45;
        overflow-wrap: anywhere;
      }
    }
    .msg-bot {
      align-self: flex-start;
      background: #fff;
      border-start-start-radius: 3px;
    }
    .msg-user {
      align-self: flex-end;
      background: #d9fdd3;
      border-start-end-radius: 3px;
    }
    .msg-meta {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 4px;
      margin-block-start: 1px;
      color: #667781;
      font-size: .62rem;
      line-height: 1.2;
    }
    .msg-ticks { width: 14px; height: 9px; color: #53bdeb; }

    .msg-cta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-block-start: 8px;
      padding: 9px 14px;
      border-radius: 9px;
      background: var(--wa-green);
      color: #fff;
      font-size: .8rem;
      font-weight: 700;
      line-height: 1.2;
      text-decoration: none;
      transition: background .18s ease, transform .18s ease;
      svg { width: 17px; height: 17px; flex-shrink: 0; }
      &:hover { background: var(--wa-green-dark); transform: translateY(-1px); }
    }

    /* Typing indicator */
    .msg-typing {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 11px 13px;
      span {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #8696a0;
        animation: bounce 1.2s ease infinite;
        &:nth-child(2) { animation-delay: .15s; }
        &:nth-child(3) { animation-delay: .3s; }
      }
    }

    /* Quick replies */
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-block-start: 6px;
      animation: pop .25s ease both;
    }
    .chip {
      padding: 7px 12px;
      border: 1px solid var(--brand-teal, #19403c);
      border-radius: 999px;
      background: rgb(255 255 255 / 94%);
      color: var(--brand-teal, #19403c);
      font-family: inherit;
      font-size: .76rem;
      font-weight: 600;
      line-height: 1.2;
      cursor: pointer;
      transition: background .18s ease, color .18s ease, transform .18s ease;
      &:hover {
        background: var(--brand-teal, #19403c);
        color: #fff;
        transform: translateY(-1px);
      }
      &:active { transform: translateY(0); }
    }
    .chip-agent {
      border-color: var(--wa-green-dark);
      color: #0b6b3a;
      &:hover { background: var(--wa-green-dark); color: #fff; }
    }

    /* ── Input ────────────────────────────────────────────── */
    .chat-input {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      padding: 10px 12px calc(10px + env(safe-area-inset-bottom));
      background: #f0f2f5;
      border-block-start: 1px solid rgb(25 64 60 / 8%);
      input {
        flex: 1;
        min-width: 0;
        height: 40px;
        padding: 0 16px;
        border: 0;
        border-radius: 999px;
        background: #fff;
        color: #1a2e2b;
        font-family: inherit;
        font-size: .875rem;
        &::placeholder { color: #8696a0; }
        &:focus-visible { outline: 2px solid var(--brand-coral, #be644d); outline-offset: 1px; }
      }
    }
    .chat-send {
      display: grid;
      place-items: center;
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border: 0;
      border-radius: 50%;
      background: var(--brand-teal, #19403c);
      color: #fff;
      cursor: pointer;
      transition: background .18s ease, transform .18s ease, opacity .18s ease;
      svg { width: 18px; height: 18px; }
      &:hover:not(:disabled) { background: var(--brand-coral, #be644d); transform: scale(1.06); }
      &:disabled { opacity: .4; cursor: not-allowed; }
    }
    :host-context([dir='rtl']) .chat-send svg { transform: scaleX(-1); }

    /* ── FAB ──────────────────────────────────────────────── */
    .fab {
      position: relative;
      display: grid;
      place-items: center;
      flex-shrink: 0;
      width: var(--fab-size);
      height: var(--fab-size);
      border: 0;
      border-radius: 50%;
      background: var(--wa-green);
      color: #fff;
      cursor: pointer;
      box-shadow: 0 4px 16px rgb(37 211 102 / 45%);
      transition: background .2s ease, transform .2s ease, box-shadow .2s ease;
      &:hover {
        background: var(--wa-green-dark);
        transform: scale(1.07);
        box-shadow: 0 6px 22px rgb(37 211 102 / 55%);
      }
    }
    .fab-icon { width: 28px; height: 28px; }
    .fab-close { width: 17px; height: 17px; }
    .fab-pulse {
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid var(--wa-green);
      opacity: 0;
      animation: pulse 2.4s ease infinite;
    }
    .fab-badge {
      position: absolute;
      inset-block-start: -3px;
      inset-inline-end: -3px;
      display: grid;
      place-items: center;
      min-width: 20px;
      height: 20px;
      padding-inline: 5px;
      border: 2px solid #fff;
      border-radius: 999px;
      background: var(--brand-coral, #be644d);
      color: #fff;
      font-size: .66rem;
      font-weight: 700;
      line-height: 1;
    }

    /* ── Animations ───────────────────────────────────────── */
    @keyframes pop {
      from { opacity: 0; transform: translateY(8px) scale(.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes bounce {
      0%, 60%, 100% { transform: translateY(0); opacity: .5; }
      30%           { transform: translateY(-4px); opacity: 1; }
    }
    @keyframes pulse {
      0%   { opacity: .6; transform: scale(1); }
      70%  { opacity: 0;  transform: scale(1.35); }
      100% { opacity: 0;  transform: scale(1.35); }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50%      { opacity: .4; }
    }

    /* ── Responsive ───────────────────────────────────────── */
    @media (max-width: 480px) {
      :host { --chat-gap: 12px; --fab-size: 52px; }
      .chat {
        width: calc(100vw - 2 * var(--chat-gap));
        height: min(78dvh, 620px);
        /* la fenêtre peut occuper presque tout l'écran : on masque le FAB, la croix est dans l'en-tête */
        max-height: calc(100dvh - 2 * var(--chat-gap));
        border-radius: 16px;
      }
      .is-open .fab { display: none; }
      .chat-body { padding: 12px 12px 10px; }
      .msg { max-width: 86%; }
      /* 16px minimum : évite le zoom automatique d'iOS sur le champ */
      .chat-input input { font-size: 1rem; }
    }
    @media (max-height: 560px) {
      .chat { height: calc(100dvh - var(--fab-size) - 2 * var(--chat-gap) - 12px); min-height: 0; }
      .chat-header { padding-block: 8px; }
      .chat-avatar img { width: 34px; height: 34px; }
    }
    @media (prefers-reduced-motion: reduce) {
      .chat, .msg, .chips { transition: none; animation: none; }
      .msg-typing span, .fab-pulse, .chat-dot { animation: none; }
    }
  `]
})
export class WhatsappFabComponent {
  readonly i18n = inject(I18nService);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('scroller') private scroller?: ElementRef<HTMLElement>;
  @ViewChild('field') private field?: ElementRef<HTMLInputElement>;

  readonly topics = TOPICS;
  readonly agentLabel = AGENT_LABEL;
  readonly typingLabel = 'écrit…';

  readonly open = signal(false);
  readonly typing = signal(false);
  readonly showChips = signal(false);
  readonly unread = signal(1);
  readonly draft = signal('');
  readonly messages = signal<ChatMessage[]>([]);

  private started = false;
  private nextId = 1;
  private lastUserText = '';
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    this.destroyRef.onDestroy(() => this.timers.forEach(clearTimeout));
  }

  get waUrl(): string {
    const text = this.lastUserText || this.i18n.t('wa.greeting');
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) this.toggle();
  }

  toggle(): void {
    const willOpen = !this.open();
    this.open.set(willOpen);
    if (!willOpen) return;

    this.unread.set(0);
    if (!this.started) {
      this.started = true;
      this.say(
        [this.i18n.t('wa.greeting'), 'Que puis-je faire pour vous aujourd’hui ? Choisissez un sujet ou écrivez-moi 👇'],
        () => this.showChips.set(true),
      );
    }
    this.later(() => this.field?.nativeElement.focus(), 280);
    this.scrollDown();
  }

  /** Clic sur une suggestion. */
  pick(topic: Topic): void {
    if (this.typing()) return;
    this.userSays(topic.label);
    this.say(topic.answer, () => this.showChips.set(true), true);
  }

  pickAgent(): void {
    if (this.typing()) return;
    this.userSays(AGENT_LABEL);
    this.handoff();
  }

  /** Envoi d'un message libre. */
  send(): void {
    const text = this.draft().trim();
    if (!text || this.typing()) return;
    this.draft.set('');
    this.userSays(text);

    const q = text.toLowerCase();
    const has = (words: string[]) => words.some((w) => q.includes(w));

    if (has(AGENT_KEYWORDS)) {
      this.handoff();
      return;
    }
    const topic = TOPICS.find((t) => has(t.keywords));
    if (topic) {
      this.say(topic.answer, () => this.showChips.set(true), true);
      return;
    }
    if (has(PRICE_KEYWORDS)) {
      this.say(
        ['Nos tarifs dépendent du service choisi. Un conseiller peut vous envoyer un devis personnalisé, sans engagement.'],
        () => this.showChips.set(true),
        true,
      );
      return;
    }
    if (has(HELLO_KEYWORDS)) {
      this.say(['Bonjour 👋 Ravi de vous voir ! Sur quel sujet puis-je vous aider ?'], () => this.showChips.set(true));
      return;
    }
    this.say(
      ['Merci pour votre message 🙏 Pour vous répondre précisément, le plus simple est de continuer avec un conseiller.'],
      () => this.showChips.set(true),
      true,
    );
  }

  /* ── Internals ───────────────────────────────────────────── */

  private handoff(): void {
    this.say(
      ['Avec plaisir ! Cliquez ci-dessous pour poursuivre la conversation sur WhatsApp avec un conseiller.'],
      () => this.showChips.set(true),
      true,
    );
  }

  private userSays(text: string): void {
    this.lastUserText = text === AGENT_LABEL ? this.i18n.t('wa.greeting') : text.replace(/^\S+\s/u, '');
    this.showChips.set(false);
    this.push('user', text);
  }

  /** Affiche les messages du bot l'un après l'autre avec l'indicateur « écrit… ». */
  private say(texts: string[], done?: () => void, ctaOnLast = false): void {
    this.showChips.set(false);
    let i = 0;
    const next = () => {
      if (i >= texts.length) {
        this.typing.set(false);
        this.scrollDown();
        done?.();
        return;
      }
      const text = texts[i];
      this.typing.set(true);
      this.scrollDown();
      this.later(() => {
        this.push('bot', text, ctaOnLast && i === texts.length - 1);
        i++;
        next();
      }, Math.min(1800, 650 + text.length * 16));
    };
    next();
  }

  private push(from: 'bot' | 'user', text: string, cta = false): void {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.messages.update((list) => [...list, { id: this.nextId++, from, text, time, cta }]);
    this.scrollDown();
  }

  private scrollDown(): void {
    this.later(() => {
      const el = this.scroller?.nativeElement;
      el?.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }, 40);
  }

  private later(fn: () => void, ms: number): void {
    this.timers.push(setTimeout(fn, ms));
  }
}