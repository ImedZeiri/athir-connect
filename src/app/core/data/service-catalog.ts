import { ServiceDefinition, ServiceId } from '../models/site.models';

export const SERVICE_CATALOG: readonly ServiceDefinition[] = [
  { id: 'languageTraining', path: '/services/language-training', translationKey: 'service.languageTraining' },
  { id: 'examPreparation', path: '/services/exam-preparation', translationKey: 'service.examPreparation' },
  { id: 'studentVisa', path: '/services/student-visa', translationKey: 'service.studentVisa' },
  { id: 'universityAdmissions', path: '/services/university-admissions', translationKey: 'service.universityAdmissions' },
  { id: 'diplomaEquivalence', path: '/services/diploma-equivalence', translationKey: 'service.diplomaEquivalence' },
  { id: 'immigration', path: '/services/immigration', translationKey: 'service.immigration' }
];

export const FEATURED_SERVICES: readonly ServiceId[] = [
  'languageTraining',
  'examPreparation',
  'studentVisa',
  'universityAdmissions',
  'diplomaEquivalence',
  'immigration'
];

export function servicePath(id: ServiceId): string {
  return SERVICE_CATALOG.find((service) => service.id === id)?.path ?? '/services';
}
