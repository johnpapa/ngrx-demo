import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { Villain } from '../../core';
import * as VillainAction from '../actions';
import { HeroicState } from '../reducers';

// selectors
const getHeroicState = createFeatureSelector<HeroicState>('heroic');
const getvillainState = createSelector(
  getHeroicState,
  (state: HeroicState) => state.villains
);
const getAllVillains = createSelector(
  getHeroicState,
  (state: HeroicState) => state.villains.villains
);
const getVillainsLoading = createSelector(
  getHeroicState,
  (state: HeroicState) => state.villains.loading
);

@Injectable()
export class VillainSelectors {
  constructor(private store: Store<HeroicState>) {}

  villains$() {
    return this.store.select(getAllVillains);
  }

  villainState$() {
    return this.store
      .select(getvillainState)
      .pipe(tap(villainState => console.log('villainState', villainState)));
  }

  loading$() {
    return this.store
      .select(getVillainsLoading)
      .pipe(tap(loading => console.log('loading', loading)));
  }
}
