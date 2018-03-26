import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { Villain } from '../../core';
import * as VillainAction from '../actions';
import { HeroicState } from '../reducers';

// selectors
const getHeroicState = createFeatureSelector<HeroicState>('heroic');

const getVillainState = createSelector(
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
  // selectors$
  villains$ = this.store.select(getAllVillains);
  villainState$ = this.store.select(getVillainState);
  loading$ = this.store.select(getVillainsLoading);
}
