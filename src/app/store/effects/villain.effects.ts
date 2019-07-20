import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { concatMap, switchMap } from 'rxjs/operators';
import * as VillainActions from '../actions';
import { VillainDataService } from '../services';

const toAction = VillainActions.toAction();

@Injectable()
export class VillainEffects {
  @Effect()
  getVillains$ = this.actions$.pipe(
    ofType(VillainActions.getVillains),
    switchMap(() =>
      toAction(
        this.villainDataService.getVillains(),
        VillainActions.getVillainsSuccess,
        VillainActions.getVillainsError
      )
    )
  );

  @Effect()
  addVillain$ = this.actions$.pipe(
    ofType(VillainActions.addVillain),
    concatMap(action =>
      toAction(
        this.villainDataService.addVillain(action.villain),
        VillainActions.addVillainSuccess,
        VillainActions.addVillainError
      )
    )
  );

  @Effect()
  deleteVillain$ = this.actions$.pipe(
    ofType(VillainActions.deleteVillain),
    concatMap(action =>
      toAction(
        this.villainDataService.deleteVillain(action.villain),
        VillainActions.deleteVillainSuccess,
        VillainActions.deleteVillainError
      )
    )
  );

  @Effect()
  updateVillain$ = this.actions$.pipe(
    ofType(VillainActions.updateVillain),
    concatMap(action =>
      toAction(
        this.villainDataService.updateVillain(action.villain),
        VillainActions.updateVillainSuccess,
        VillainActions.updateVillainError
      )
    )
  );

  constructor(
    private actions$: Actions,
    private villainDataService: VillainDataService
  ) {}
}
