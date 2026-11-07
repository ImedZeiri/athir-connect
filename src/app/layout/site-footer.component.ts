import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FooterLink {
  key: string;
  path: string;
}

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss']
})
export class SiteFooterComponent {
  @Input() copy: Record<string, string> = {};
  @Input() language = 'fr';

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

  get direction(): 'rtl' | 'ltr' {
    return this.language === 'ar' ? 'rtl' : 'ltr';
  }
}
