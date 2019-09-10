import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import * as HeroActions from '../actions';
import { HeroDataService } from '../services';

@Injectable()
export class HeroEffects {
  getHeroes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroActions.getHeroes),
      switchMap(() =>
        this.heroDataService.getHeroes().pipe(
          map(heroes => HeroActions.getHeroesSuccess({ heroes })),
          catchError(error => of(HeroActions.getHeroesError({ error })))
        )
      )
    )
  );

  addHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroActions.addHero),
      concatMap(action =>
        this.heroDataService.addHero(action.hero).pipe(
          map(hero => HeroActions.addHeroSuccess({ hero })),
          catchError(error => of(HeroActions.addHeroError({ error })))
        )
      )
    )
  );

  deleteHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroActions.deleteHero),
      concatMap(action =>
        this.heroDataService.deleteHero(action.hero).pipe(
          map(hero => HeroActions.deleteHeroSuccess({ hero })),
          catchError(error => of(HeroActions.deleteHeroError({ error })))
        )
      )
    )
  );

  updateHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroActions.updateHero),
      concatMap(action =>
        this.heroDataService.updateHero(action.hero).pipe(
          map(hero => HeroActions.updateHeroSuccess({ hero })),
          catchError(error => of(HeroActions.updateHeroError({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private heroDataService: HeroDataService
  ) {}
}
