import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';

interface HeaderLink {
  key: string;
  path: string;
}

interface LanguageOption {
  code: string;
  nativeName: string;
}

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnDestroy {
  @Input() copy: Record<string, string> = {};
  @Input() language = 'fr';
  @Input() currentUrl = '/';
  @Output() languageChange = new EventEmitter<string>();
  @ViewChild('menuToggle') private menuToggle?: ElementRef<HTMLButtonElement>;

  readonly links: HeaderLink[] = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.about', path: '/about' },
    { key: 'nav.services', path: '/services' },
    { key: 'nav.contact', path: '/contact' }
  ];

  readonly languages: LanguageOption[] = [
    { code: 'fr', nativeName: 'Français' },
    { code: 'en', nativeName: 'English' },
    { code: 'de', nativeName: 'Deutsch' },
    { code: 'ar', nativeName: 'العربية' }
  ];

  menuOpen = false;
  private readonly navigationSubscription: Subscription;

  constructor(router: Router) {
    this.navigationSubscription = router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentUrl = event.urlAfterRedirects;
        this.menuOpen = false;
      });
  }

  get direction(): 'rtl' | 'ltr' {
    return this.language === 'ar' ? 'rtl' : 'ltr';
  }

  isActive(path: string): boolean {
    if (path === '/') return this.currentUrl === '/';
    return this.currentUrl === path || this.currentUrl.startsWith(`${path}/`);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(restoreFocus = false): void {
    this.menuOpen = false;
    if (restoreFocus) this.menuToggle?.nativeElement.focus();
  }

  handleMenuKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.menuOpen) {
      event.preventDefault();
      this.closeMenu(true);
    }
  }

  selectLanguage(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.languageChange.emit(select.value);
  }

  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe();
  }
}
