import { Action, createReducer, on } from '@ngrx/store';
import { Hero } from '../../core';
import * as HeroActions from '../actions';

export interface HeroState {
  heroes: Hero[];
  loading: boolean;
  error: boolean;
}

export const initialState: HeroState = {
  heroes: [],
  loading: false,
  error: false
};

function modifyHeroState(
  heroState: HeroState,
  heroChanges: Partial<Hero>
): HeroState {
  return {
    ...heroState,
    loading: false,
    heroes: heroState.heroes.map(h => {
      if (h.id === heroChanges.id) {
        return { ...h, ...heroChanges };
      } else {
        return h;
      }
    })
  };
}

const heroReducer = createReducer(
  initialState,
  on(HeroActions.addHero, state => ({ ...state, loading: true })),
  on(HeroActions.addHeroSuccess, (state, { hero }) => ({
    ...state,
    loading: false,
    heroes: [...state.heroes, { ...hero }]
  })),
  on(HeroActions.addHeroError, state => ({ ...state, loading: false })),
  on(HeroActions.getHeroes, state => ({ ...state, loading: true })),
  on(HeroActions.getHeroesError, state => ({ ...state, loading: false })),
  on(HeroActions.getHeroesSuccess, (state, { heroes }) => ({
    ...state,
    loading: false,
    heroes
  })),
  on(HeroActions.deleteHero, (state, { hero }) => ({
    ...state,
    loading: false,
    heroes: state.heroes.filter(h => h !== hero)
  })),
  on(HeroActions.deleteHeroSuccess, state => ({ ...state, loading: false })),
  on(HeroActions.deleteHeroError, (state, { error }) => ({
    ...state,
    heroes: [...state.heroes, error.requestData],
    loading: false
  })),
  on(HeroActions.updateHero, (state, { hero }) => ({
    ...state,
    heroes: state.heroes.map(h => {
      if (h.id === hero.id) {
        state.loading = true;
      }
      return h;
    })
  })),
  on(HeroActions.updateHeroSuccess, (state, { hero }) =>
    modifyHeroState(state, hero)
  ),
  on(HeroActions.updateHeroError, (state, { error }) => ({
    ...state,
    heroes: state.heroes.map(h => {
      if (h.id === error.requestData.id) {
        // Huh? No idea what the error is!
        state.error = true;
      }
      return h;
    }),
    loading: false
  })),
  on(HeroActions.setHeroLoading, (state, { loading }) => ({
    ...state,
    loading: loading == null ? true : loading
  }))
);

export function reducer(state: HeroState | undefined, action: Action) {
  return heroReducer(state, action);
}
