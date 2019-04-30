import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import * as HeroActions from '../actions';
import { HeroDataService } from '../services';
import { EntityState } from '../reducers';

const filterAction = new HeroActions.GetHeroes();
const toAction = HeroActions.toAction();
type HeroAction = HeroActions.HeroAction;

@Injectable()
export class HeroEffects {
  @Effect()
  // this.actions.pipe(
  //   ofType(AuthenticationActionTypes.LOGIN)
  getHeroes$: Observable<Action> = this.actions$.pipe(
    ofType(HeroActions.GET_HEROES),
    switchMap(() =>
      toAction(
        this.heroDataService.getHeroes(),
        HeroActions.GetHeroesSuccess,
        HeroActions.GetHeroesError
      )
    )
  );

  @Effect()
  addHero$: Observable<Action> = this.actions$.pipe(
    ofType(HeroActions.ADD_HERO),
    concatMap((action: HeroAction) =>
      toAction(
        this.heroDataService.addHero(action.payload),
        HeroActions.AddHeroSuccess,
        HeroActions.AddHeroError
      )
    )
  );

  @Effect()
  deleteHero$: Observable<Action> = this.actions$.pipe(
    ofType(HeroActions.DELETE_HERO),
    concatMap((action: HeroAction) =>
      toAction(
        this.heroDataService.deleteHero(action.payload),
        HeroActions.DeleteHeroSuccess,
        HeroActions.DeleteHeroError
      )
    )
  );

  @Effect()
  updateHero$: Observable<Action> = this.actions$.pipe(
    ofType<HeroActions.UpdateHero>(HeroActions.UPDATE_HERO),
    concatMap((action: HeroAction) =>
      toAction(
        this.heroDataService.updateHero(action.payload),
        HeroActions.UpdateHeroSuccess,
        HeroActions.UpdateHeroError
      )
    )
  );

  constructor(
    private store: Store<EntityState>,
    private actions$: Actions,
    private heroDataService: HeroDataService
  ) {}
}
