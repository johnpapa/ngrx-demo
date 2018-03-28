import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { EntityState } from '../reducers';
import { Villain } from '../../core';
import * as VillainAction from '../actions';
import { VillainState } from '../reducers/villain.reducer';

// selectors
const getEntityState = createFeatureSelector<EntityState>('entityCache');

const getVillainState = createSelector(
  getEntityState,
  (state: EntityState) => state.villains
);

const getAllVillains = createSelector(
  getVillainState,
  (state: VillainState) => state.villains
);

const getVillainsLoading = createSelector(
  getVillainState,
  (state: VillainState) => state.loading
);

@Injectable()
export class VillainSelectors {
  constructor(private store: Store<EntityState>) {}
  // selectors$
  villains$ = this.store.select(getAllVillains);
  villainState$ = this.store.select(getVillainState);
  loading$ = this.store.select(getVillainsLoading);
}
