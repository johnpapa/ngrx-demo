import { ActionReducerMap } from '@ngrx/store';
import * as fromHeroes from './hero.reducer';
import * as fromVillains from './villain.reducer';

export interface EntityState {
  heroes: fromHeroes.HeroState;
  villains: fromVillains.VillainState;
}

export const reducers: ActionReducerMap<EntityState> = {
  heroes: fromHeroes.reducer,
  villains: fromVillains.reducer
  // here is where i put other reducers, when i have them
};
