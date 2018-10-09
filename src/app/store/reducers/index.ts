import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { Store } from '@ngrx/store';

import * as fromActions from '../actions';
import * as fromHeroes from './hero.reducer';
import * as fromVillains from './villain.reducer';

export type Action = fromActions.HeroAction;

export interface EntityState {
  heroes: fromHeroes.HeroState;
  villains: fromVillains.VillainState;
}

export const reducers: ActionReducerMap<EntityState> = {
  heroes: fromHeroes.reducer,
  villains: fromVillains.reducer
  // here is where i put other reducers, when i have them
};
