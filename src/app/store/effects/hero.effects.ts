import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { concatMap, switchMap } from 'rxjs/operators';
import * as HeroActions from '../actions';
import { HeroDataService } from '../services';

const toAction = HeroActions.toAction();

@Injectable()
export class HeroEffects {
  @Effect()
  // this.actions.pipe(
  //   ofType(AuthenticationActionTypes.LOGIN)
  getHeroes$ = this.actions$.pipe(
    ofType(HeroActions.getHeroes),
    switchMap(() =>
      toAction(
        this.heroDataService.getHeroes(),
        HeroActions.getHeroesSuccess,
        HeroActions.getHeroesError
      )
    )
  );

  @Effect()
  addHero$ = this.actions$.pipe(
    ofType(HeroActions.addHero),
    concatMap((action: ReturnType<typeof HeroActions.addHero>) =>
      toAction(
        this.heroDataService.addHero(action.hero),
        HeroActions.addHeroSuccess,
        HeroActions.addHeroError
      )
    )
  );

  @Effect()
  deleteHero$ = this.actions$.pipe(
    ofType(HeroActions.deleteHero),
    concatMap((action: ReturnType<typeof HeroActions.deleteHero>) =>
      toAction(
        this.heroDataService.deleteHero(action.hero),
        HeroActions.deleteHeroSuccess,
        HeroActions.deleteHeroError
      )
    )
  );

  @Effect()
  updateHero$ = this.actions$.pipe(
    ofType(HeroActions.updateHero),
    concatMap((action: ReturnType<typeof HeroActions.updateHero>) =>
      toAction(
        this.heroDataService.updateHero(action.hero),
        HeroActions.updateHeroSuccess,
        HeroActions.updateHeroError
      )
    )
  );

  constructor(
    private actions$: Actions,
    private heroDataService: HeroDataService
  ) {}
}
