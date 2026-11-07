import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home-page.component').then((module) => module.HomePageComponent),
    data: { titleKey: 'seo.homeTitle', descriptionKey: 'seo.homeDescription' }
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about-page.component').then((module) => module.AboutPageComponent),
    data: { titleKey: 'seo.aboutTitle' }
  },
  {
    path: 'services',
    loadComponent: () => import('./features/services/services-page.component').then((module) => module.ServicesPageComponent),
    data: { titleKey: 'seo.servicesTitle' }
  },
  {
    path: 'services/language-training',
    loadComponent: () => import('./features/language-training/language-training-page.component')
      .then((module) => module.LanguageTrainingPageComponent),
    data: { titleKey: 'service.languageTraining.title', descriptionKey: 'service.languageTraining.short' }
  },
  {
    path: 'services/exam-preparation',
    loadComponent: () => import('./features/exam-preparation/exam-preparation-page.component')
      .then((module) => module.ExamPreparationPageComponent),
    data: { titleKey: 'service.examPreparation.title', descriptionKey: 'service.examPreparation.short' }
  },
  {
    path: 'services/student-visa',
    loadComponent: () => import('./features/student-visa/student-visa-page.component')
      .then((module) => module.StudentVisaPageComponent),
    data: { titleKey: 'service.studentVisa.title', descriptionKey: 'service.studentVisa.short' }
  },
  {
    path: 'services/university-admissions',
    loadComponent: () => import('./features/university-admissions/university-admissions-page.component')
      .then((module) => module.UniversityAdmissionsPageComponent),
    data: { titleKey: 'service.universityAdmissions.title', descriptionKey: 'service.universityAdmissions.short' }
  },
  {
    path: 'services/diploma-equivalence',
    loadComponent: () => import('./features/diploma-equivalence/diploma-equivalence-page.component')
      .then((module) => module.DiplomaEquivalencePageComponent),
    data: { titleKey: 'service.diplomaEquivalence.title', descriptionKey: 'service.diplomaEquivalence.short' }
  },
  {
    path: 'services/immigration',
    loadComponent: () => import('./features/immigration/immigration-page.component')
      .then((module) => module.ImmigrationPageComponent),
    data: { titleKey: 'service.immigration.title', descriptionKey: 'service.immigration.short' }
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact-page.component').then((module) => module.ContactPageComponent),
    data: { titleKey: 'seo.contactTitle' }
  },
  {
    path: 'pre-registration',
    loadComponent: () => import('./features/pre-registration/pre-registration-page.component')
      .then((module) => module.PreRegistrationPageComponent),
    data: { titleKey: 'seo.registrationTitle' }
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found-page.component')
      .then((module) => module.NotFoundPageComponent),
    data: { titleKey: 'seo.notFoundTitle' }
  }
];
