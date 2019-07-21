// General purpose entity action stuff, good for any entity type

import { ActionCreator } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { DataServiceError } from '../config';

// Function of additional success actions
// that returns a function that returns
// an observable of ngrx action(s) from DataService method observable
export const toAction = (...actions: ActionCreator[]) => <T>(
  source: Observable<T>,
  successAction: new (data: T) => any,
  errorAction: new (err: DataServiceError<T>) => any
) =>
  source.pipe(
    mergeMap((data: T) => [new successAction(data), ...actions]),
    catchError((err: DataServiceError<T>) => of(new errorAction(err)))
  );
