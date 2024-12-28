import { AngularError } from '@shared/models';

export class SharedState {
  angularError = new AngularError();
  isLoading: boolean = false;
  isTokenActive: boolean = false;
  currentLanguage: string = 'es';
}
