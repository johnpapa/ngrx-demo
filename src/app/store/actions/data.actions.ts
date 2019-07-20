// General purpose entity action stuff, good for any entity type

import { Action, ActionCreator } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { DataServiceError } from '../config';

// Function of additional success actions
// that returns a function that returns
// an observable of ngrx action(s) from DataService method observable
export const toAction = (...actions: Action[]) => <T>(
  source: Observable<T>,
  successAction: ActionCreator,
  errorAction: ActionCreator
) =>
  source.pipe(
    mergeMap((data: T) => [successAction(data), ...actions]),
    catchError((err: DataServiceError<T>) => of(errorAction(err)))
  );
