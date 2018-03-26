import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { Hero } from '../../core';
import * as HeroAction from '../actions';
import { HeroicState } from '../reducers';

// selectors
const getHeroicState = createFeatureSelector<HeroicState>('heroic');

const getHeroState = createSelector(
  getHeroicState,
  (state: HeroicState) => state.heroes
);

const getAllHeroes = createSelector(
  getHeroicState,
  (state: HeroicState) => state.heroes.heroes
);

const getHeroesLoading = createSelector(
  getHeroicState,
  (state: HeroicState) => state.heroes.loading
);

@Injectable()
export class HeroSelectors {
  constructor(private store: Store<HeroicState>) {}
  // selectors$
  heroes$ = this.store.select(getAllHeroes);
  heroState$ = this.store.select(getHeroState);
  loading$ = this.store.select(getHeroesLoading);
}
