import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { EntityState } from '../reducers';
import { Hero } from '../../core';
import * as HeroAction from '../actions';
import { HeroState } from '../reducers/hero.reducer';

// selectors
const getEntityState = createFeatureSelector<EntityState>('entityCache');

const getHeroState = createSelector(
  getEntityState,
  (state: EntityState) => state.heroes
);

const getAllHeroes = createSelector(
  getHeroState,
  (state: HeroState) => state.heroes
);

const getHeroesLoading = createSelector(
  getHeroState,
  (state: HeroState) => state.loading
);

@Injectable()
export class HeroSelectors {
  constructor(private store: Store<EntityState>) {}
  // selectors$
  heroes$ = this.store.select(getAllHeroes);
  heroState$ = this.store.select(getHeroState);
  loading$ = this.store.select(getHeroesLoading);
}
