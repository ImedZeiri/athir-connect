import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
  inject
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

interface FooterLink {
  key: string;
  path: string;
}

type TravelMode = 'driving' | 'walking' | 'transit' | 'bicycling';

interface TravelOption {
  mode: TravelMode;
  key: string;
  fallback: string;
  /** Paramètre dirflg de la carte intégrée Google Maps */
  flag: string;
}

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss']
})
export class SiteFooterComponent implements OnInit, OnChanges, OnDestroy {
  @Input() copy: Record<string, string> = {};
  @Input() language = 'fr';

  @ViewChild('closeBtn') private closeBtn?: ElementRef<HTMLButtonElement>;
  @ViewChild('dialog', { static: true }) private dialog!: ElementRef<HTMLDialogElement>;

  private readonly sanitizer = inject(DomSanitizer);
  private readonly document = inject(DOCUMENT);

  readonly exploreLinks: FooterLink[] = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.about', path: '/about' },
    { key: 'nav.services', path: '/services' },
    { key: 'nav.contact', path: '/contact' }
  ];

  readonly serviceLinks: FooterLink[] = [
    { key: 'footer.service.languageTraining', path: '/services/language-training' },
    { key: 'footer.service.examPreparation', path: '/services/exam-preparation' },
    { key: 'footer.service.studentVisa', path: '/services/student-visa' },
    { key: 'footer.service.diplomaEquivalence', path: '/services/diploma-equivalence' },
    { key: 'footer.service.immigration', path: '/services/immigration' }
  ];

  readonly travelOptions: TravelOption[] = [
    { mode: 'driving',   key: 'footer.mode.driving',   fallback: 'Voiture',   flag: 'd' },
    { mode: 'walking',   key: 'footer.mode.walking',   fallback: 'À pied',    flag: 'w' },
    { mode: 'transit',   key: 'footer.mode.transit',   fallback: 'Transport', flag: 'r' },
    { mode: 'bicycling', key: 'footer.mode.bicycling', fallback: 'Vélo',      flag: 'b' }
  ];

  /** Destination : ATHIR CONNECT — Av. des Martyrs, El Mourouj */
  private readonly destination = '36.7268831,10.2106133';

  mapOpen = false;
  travelMode: TravelMode = 'driving';
  origin: string | null = null;
  locating = false;
  status = '';
  statusIsError = false;

  smallMapUrl!: SafeResourceUrl;
  mapUrl!: SafeResourceUrl;

  private lastFocused: HTMLElement | null = null;
  private previousOverflow = '';

  get direction(): 'rtl' | 'ltr' {
    return this.language === 'ar' ? 'rtl' : 'ltr';
  }

  get hasRoute(): boolean {
    return this.origin !== null;
  }

  /** Lien « Ouvrir dans Google Maps » (avec départ et mode si un itinéraire est tracé). */
  get externalUrl(): string {
    const params = new URLSearchParams({
      api: '1',
      destination: this.destination,
      travelmode: this.travelMode
    });
    if (this.origin) {
      params.set('origin', this.origin);
    }
    return `https://www.google.com/maps/dir/?${params.toString()}`;
  }

  ngOnInit(): void {
    this.updateMaps();
  }

  ngOnChanges(): void {
    this.updateMaps();
  }

  ngOnDestroy(): void {
    this.unlockScroll();
  }

  /** Ouvre la carte en modal ; avec autoLocate, détecte la position et trace l'itinéraire. */
  openMap(autoLocate = false): void {
    const el = this.dialog.nativeElement;
    if (!this.mapOpen) {
      this.lastFocused = this.document.activeElement as HTMLElement | null;
      this.mapOpen = true;
      this.lockScroll();
    }
    // <dialog> natif : s'affiche dans la « top layer », au-dessus de tout (pas de souci de z-index)
    if (!el.open) {
      el.showModal();
    }
    if (autoLocate) {
      this.traceFromMyLocation();
    }
    setTimeout(() => this.closeBtn?.nativeElement.focus());
  }

  closeMap(): void {
    const el = this.dialog.nativeElement;
    if (el.open) {
      el.close(); // déclenche onNativeClose()
    }
  }

  /** Appelé à la fermeture du <dialog> (bouton, Échap ou clic sur le fond). */
  onNativeClose(): void {
    this.mapOpen = false;
    this.unlockScroll();
    this.lastFocused?.focus();
  }

  /** Un clic sur le fond sombre (::backdrop) ferme le modal. */
  onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialog.nativeElement) {
      this.closeMap();
    }
  }

  setMode(mode: TravelMode): void {
    this.travelMode = mode;
    this.updateMaps();
  }

  /** Détecte la position de l'utilisateur et trace l'itinéraire sur la carte. */
  traceFromMyLocation(): void {
    if (this.locating) {
      return;
    }

    if (!('geolocation' in navigator)) {
      this.setStatus(
        this.copy['footer.geoUnsupported'] || 'La géolocalisation n’est pas disponible. Saisissez votre adresse de départ.',
        true
      );
      return;
    }

    this.locating = true;
    this.setStatus(this.copy['footer.locating'] || 'Détection de votre position…', false);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.locating = false;
        this.origin = `${pos.coords.latitude},${pos.coords.longitude}`;
        this.setStatus(this.copy['footer.routeFromMine'] || 'Itinéraire tracé depuis votre position.', false);
        this.updateMaps();
      },
      (err) => {
        this.locating = false;
        this.setStatus(
          err.code === err.PERMISSION_DENIED
            ? (this.copy['footer.geoDenied'] || 'Accès à la position refusé. Saisissez votre adresse de départ.')
            : (this.copy['footer.geoError'] || 'Position introuvable. Saisissez votre adresse de départ.'),
          true
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  /** Trace l'itinéraire depuis une adresse saisie manuellement. */
  traceFromAddress(value: string): void {
    const address = value.trim();
    if (!address) {
      this.setStatus(this.copy['footer.enterStart'] || 'Saisissez une adresse de départ.', true);
      return;
    }
    this.origin = address;
    this.setStatus(this.copy['footer.routeFromAddress'] || 'Itinéraire tracé depuis l’adresse saisie.', false);
    this.updateMaps();
  }

  resetRoute(): void {
    this.origin = null;
    this.setStatus('', false);
    this.updateMaps();
  }

  private setStatus(message: string, isError: boolean): void {
    this.status = message;
    this.statusIsError = isError;
  }

  private lockScroll(): void {
    this.previousOverflow = this.document.body.style.overflow;
    this.document.body.style.overflow = 'hidden';
  }

  private unlockScroll(): void {
    this.document.body.style.overflow = this.previousOverflow;
  }

  private updateMaps(): void {
    const hl = encodeURIComponent(this.language || 'fr');

    this.smallMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?q=${this.destination}&z=15&hl=${hl}&output=embed`
    );

    let url: string;
    if (this.origin) {
      const flag = this.travelOptions.find((o) => o.mode === this.travelMode)?.flag ?? 'd';
      url = `https://maps.google.com/maps?saddr=${encodeURIComponent(this.origin)}&daddr=${this.destination}&dirflg=${flag}&hl=${hl}&output=embed`;
    } else {
      url = `https://maps.google.com/maps?q=${this.destination}&z=16&hl=${hl}&output=embed`;
    }
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}