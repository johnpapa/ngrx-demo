import { createAction, props } from '@ngrx/store';
import { Hero } from '../../core';
import { DataServiceError } from '../config';

export const createHeroAction = (actionType: string) =>
  createAction(actionType, props<{ hero: Hero }>());

export const createHeroErrorAction = (actionType: string) =>
  createAction(actionType, props<{ error: DataServiceError<Hero> }>());

export const getHeroes = createAction('[Hero] GET_HEROES');

export const getHeroesSuccess = createAction(
  '[Hero] GET_HEROES_SUCCESS',
  props<{ heroes: Hero[] }>()
);

export const getHeroesError = createAction(
  '[Hero] GET_HEROES_ERROR',
  props<{ error: any }>()
);

export const addHero = createHeroAction('[Hero] ADD_HERO');

export const addHeroSuccess = createHeroAction('[Hero] ADD_HERO_SUCCESS');

export const addHeroError = createHeroErrorAction('[Hero] ADD_HERO_ERROR');

export const getHero = createAction('[Hero] GET_HERO', props<{ id: string }>());

export const getHeroSuccess = createHeroAction('[Hero] GET_HERO_SUCCESS');

export const getHeroError = createHeroErrorAction('[Hero] GET_HERO_ERROR');

export const updateHero = createHeroAction('[Hero] UPDATE_HERO');

export const updateHeroSuccess = createHeroAction('[Hero] UPDATE_HERO_SUCCESS');

export const updateHeroError = createHeroErrorAction(
  '[Hero] UPDATE_HERO_ERROR'
);

export const deleteHero = createHeroAction('[Hero] DELETE_HERO');

export const deleteHeroSuccess = createHeroAction('[Hero] DELETE_HERO_SUCCESS');

export const deleteHeroError = createHeroErrorAction(
  '[Hero] DELETE_HERO_ERROR'
);

export const setHeroLoading = createAction(
  '[Hero] SET_HERO_LOADING',
  props<{ loading: boolean }>()
);
