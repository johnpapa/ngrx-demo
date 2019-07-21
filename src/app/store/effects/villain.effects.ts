import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import * as VillainActions from '../actions';
import { VillainDataService } from '../services';

@Injectable()
export class VillainEffects {
  getVillains$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VillainActions.getVillains),
      switchMap(() =>
        this.villainDataService.getVillains().pipe(
          map(villains => VillainActions.getVillainsSuccess({ villains })),
          catchError(error => of(VillainActions.getVillainsError({ error })))
        )
      )
    )
  );

  addVillain$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VillainActions.addVillain),
      concatMap(action =>
        this.villainDataService.addVillain(action.villain).pipe(
          map(villain => VillainActions.addVillainSuccess({ villain })),
          catchError(error => of(VillainActions.addVillainError({ error })))
        )
      )
    )
  );

  deleteVillain$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VillainActions.deleteVillain),
      concatMap(action =>
        this.villainDataService.deleteVillain(action.villain).pipe(
          map(villain => VillainActions.deleteVillainSuccess({ villain })),
          catchError(error => of(VillainActions.deleteVillainError({ error })))
        )
      )
    )
  );

  updateVillain$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VillainActions.updateVillain),
      concatMap(action =>
        this.villainDataService.updateVillain(action.villain).pipe(
          map(villain => VillainActions.updateVillainSuccess({ villain })),
          catchError(error => of(VillainActions.updateVillainError({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private villainDataService: VillainDataService
  ) {}
}
