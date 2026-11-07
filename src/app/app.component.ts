import { Component, inject, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { I18nService } from './core/services/i18n.service';
import { SiteHeaderComponent } from './layout/site-header.component';
import { SiteFooterComponent } from './layout/site-footer.component';
import { WhatsappFabComponent } from './shared/components/whatsapp-fab.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SiteHeaderComponent, SiteFooterComponent, WhatsappFabComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  readonly i18n = inject(I18nService);
  currentUrl = '/';
  private readonly sub: Subscription;

  constructor(router: Router) {
    this.sub = router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => (this.currentUrl = e.urlAfterRedirects));
  }

  get headerCopy(): Record<string, string> {
    return this.i18n.copy([
      'nav.home', 'nav.about', 'nav.services', 'nav.contact',
      'nav.apply', 'notFound.home', 'header.eyebrow',
      'header.openMenu', 'header.closeMenu', 'header.navigation', 'header.language',
      'brand.tagline'
    ]);
  }

  get footerCopy(): Record<string, string> {
    return this.i18n.copy([
      'nav.home', 'nav.about', 'nav.services', 'nav.contact',
      'footer.description', 'footer.explore', 'footer.services',
      'footer.contact', 'footer.rights', 'footer.cta',
      'footer.service.languageTraining', 'footer.service.examPreparation',
      'footer.service.studentVisa', 'footer.service.diplomaEquivalence',
      'footer.service.immigration',
      'social.follow', 'social.facebook', 'social.instagram',
      'social.linkedin', 'social.youtube', 'social.tiktok'
    ]);
  }

  onLanguageChange(lang: string): void {
    this.i18n.setLanguage(lang);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
