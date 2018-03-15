import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, delay, map } from 'rxjs/operators';

import { api, DataServiceError, fakeDelays } from './data.service';

import { Villain } from '../../core';

@Injectable()
export class VillainDataService {
  constructor(private http: HttpClient) {}

  addVillain(villain: Villain): Observable<Villain> {
    return this.http
      .post<Villain>(`${api}/villain/`, villain)
      .pipe(delay(fakeDelays.save), catchError(this.handleError(villain)));
  }

  deleteVillain(villain: Villain): Observable<Villain> {
    return this.http.delete(`${api}/villain/${villain.id}`).pipe(
      delay(fakeDelays.save),
      map(() => villain), // return the deleted Villain
      catchError(this.handleError(villain))
    );
  }

  getVillains(): Observable<Villain[]> {
    return this.http
      .get<Array<Villain>>(`${api}/villains`)
      .pipe(delay(fakeDelays.select), catchError(this.handleError()));
  }

  updateVillain(villain: Villain): Observable<Villain> {
    return this.http.put<Villain>(`${api}/villain/${villain.id}`, villain).pipe(
      delay(fakeDelays.save),
      map(() => villain), // return the updated Villain
      catchError(this.handleError(villain))
    );
  }

  private handleError<T>(requestData?: T) {
    return (res: HttpErrorResponse) => {
      const error = new DataServiceError(res.error, requestData);
      console.error(error);
      return new ErrorObservable(error);
    };
  }
}
