export type LanguageCode = 'fr' | 'en' | 'de' | 'ar';

export type ServiceId =
  | 'languageTraining'
  | 'examPreparation'
  | 'studentVisa'
  | 'universityAdmissions'
  | 'diplomaEquivalence'
  | 'immigration';

export interface ServiceDefinition {
  id: ServiceId;
  path: string;
  translationKey: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  service: ServiceId | '';
  languageLevel: string;
  message: string;
}
