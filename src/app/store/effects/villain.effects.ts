import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {
  concatMap,
  catchError,
  first,
  map,
  mergeMap,
  switchMap
} from 'rxjs/operators';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { EntityState } from '../reducers';

import * as VillainActions from '../actions';
import { Villain } from '../../core';
import { VillainDataService, DataServiceError } from '../services';

const filterAction = new VillainActions.GetVillains();
const toAction = VillainActions.toAction();
type VillainAction = VillainActions.VillainAction;

@Injectable()
export class VillainEffects {
  @Effect()
  getVillains$: Observable<Action> = this.actions$
    .ofType(VillainActions.GET_VILLAINS)
    .pipe(
      switchMap(() =>
        toAction(
          this.villainDataService.getVillains(),
          VillainActions.GetVillainsSuccess,
          VillainActions.GetVillainsError
        )
      )
    );

  @Effect()
  addVillain$: Observable<Action> = this.actions$
    .ofType(VillainActions.ADD_VILLAIN)
    .pipe(
      concatMap((action: VillainAction) =>
        toAction(
          this.villainDataService.addVillain(action.payload),
          VillainActions.AddVillainSuccess,
          VillainActions.AddVillainError
        )
      )
    );

  @Effect()
  deleteVillain$: Observable<Action> = this.actions$
    .ofType(VillainActions.DELETE_VILLAIN)
    .pipe(
      concatMap((action: VillainAction) =>
        toAction(
          this.villainDataService.deleteVillain(action.payload),
          VillainActions.DeleteVillainSuccess,
          VillainActions.DeleteVillainError
        )
      )
    );

  @Effect()
  updateVillain$: Observable<Action> = this.actions$
    .ofType<VillainActions.UpdateVillain>(VillainActions.UPDATE_VILLAIN)
    .pipe(
      concatMap((action: VillainAction) =>
        toAction(
          this.villainDataService.updateVillain(action.payload),
          VillainActions.UpdateVillainSuccess,
          VillainActions.UpdateVillainError
        )
      )
    );

  constructor(
    private store: Store<EntityState>,
    private actions$: Actions,
    private villainDataService: VillainDataService
  ) {}
}
