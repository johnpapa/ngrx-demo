import { createAction, props } from '@ngrx/store';
import { Villain } from '../../core';
import { DataServiceError } from '../config';

export const createVillainAction = (actionType: string) =>
  createAction(actionType, props<{ villain: Villain }>());

export const createVillainErrorAction = (actionType: string) =>
  createAction(actionType, props<{ error: DataServiceError<Villain> }>());

export const getVillains = createAction('[Villain] GET_VILLAINS');

export const getVillainsSuccess = createAction(
  '[Villain] GET_VILLAINS_SUCCESS',
  props<{ villains: Villain[] }>()
);

export const getVillainsError = createAction(
  '[Villain] GET_VILLAINS_ERROR',
  props<{ error: any }>()
);

export const addVillain = createVillainAction('[Villain] ADD_VILLAIN');

export const addVillainSuccess = createVillainAction(
  '[Villain] ADD_VILLAIN_SUCCESS'
);

export const addVillainError = createVillainErrorAction(
  '[Villain] ADD_VILLAIN_ERROR'
);

export const getVillain = createAction(
  '[Villain] GET_VILLAIN',
  props<{ id: string }>()
);

export const getVillainSuccess = createVillainAction(
  '[Villain] GET_VILLAIN_SUCCESS'
);

export const getVillainError = createVillainErrorAction(
  '[Villain] GET_VILLAIN_ERROR'
);

export const updateVillain = createVillainAction('[Villain] UPDATE_VILLAIN');

export const updateVillainSuccess = createVillainAction(
  '[Villain] UPDATE_VILLAIN_SUCCESS'
);

export const updateVillainError = createVillainErrorAction(
  '[Villain] UPDATE_VILLAIN_ERROR'
);

export const deleteVillain = createVillainAction('[Villain] DELETE_VILLAIN');

export const deleteVillainSuccess = createVillainAction(
  '[Villain] DELETE_VILLAIN_SUCCESS'
);

export const deleteVillainError = createVillainErrorAction(
  '[Villain] DELETE_VILLAIN_ERROR'
);
