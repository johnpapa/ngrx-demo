import { Action } from '@ngrx/store';

import { Villain } from '../../core';
import { DataServiceError } from '../services';
import { DataAction, DataErrorAction } from './data.actions';

export const ADD_VILLAIN = '[Villain] ADD_VILLAIN';
export const ADD_VILLAIN_ERROR = '[Villain] ADD_VILLAIN_ERROR';
export const ADD_VILLAIN_SUCCESS = '[Villain] ADD_VILLAIN_SUCCESS';

export const GET_VILLAIN = '[Villain] GET_VILLAIN';
export const GET_VILLAIN_SUCCESS = '[Villain] GET_VILLAIN_SUCCESS';
export const GET_VILLAIN_ERROR = '[Villain] GET_VILLAIN_ERROR';

export const UPDATE_VILLAIN = '[Villain] UPDATE_VILLAIN';
export const UPDATE_VILLAIN_SUCCESS = '[Villain] UPDATE_VILLAIN_SUCCESS';
export const UPDATE_VILLAIN_ERROR = '[Villain] UPDATE_VILLAIN_ERROR';

export const GET_VILLAINS = '[Villain] GET_VILLAINS';
export const GET_VILLAINS_SUCCESS = '[Villain] GET_VILLAINS_SUCCESS';
export const GET_VILLAINS_ERROR = '[Villain] GET_VILLAINS_ERROR';

export const DELETE_VILLAIN = '[Villain] DELETE_VILLAIN';
export const DELETE_VILLAIN_SUCCESS = '[Villain] DELETE_VILLAIN_SUCCESS';
export const DELETE_VILLAIN_ERROR = '[Villain] DELETE_VILLAIN_ERROR';

export abstract class VillainAction implements DataAction<Villain> {
  readonly type: string;
  constructor(public readonly payload: Villain) {}
}

export abstract class VillainErrorAction implements DataErrorAction<Villain> {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<Villain>) {}
}

export class GetVillains implements Action {
  readonly type = GET_VILLAINS;
}

export class GetVillainsSuccess implements Action {
  readonly type = GET_VILLAINS_SUCCESS;
  constructor(public readonly payload: Villain[]) {}
}

export class GetVillainsError implements Action {
  readonly type = GET_VILLAINS_ERROR;
  constructor(public readonly payload: any) {}
}

export class AddVillain extends VillainAction {
  readonly type = ADD_VILLAIN;
}

export class AddVillainSuccess extends VillainAction {
  readonly type = ADD_VILLAIN_SUCCESS;
}

export class AddVillainError extends VillainErrorAction {
  readonly type = ADD_VILLAIN_ERROR;
}

export class GetVillain implements Action {
  readonly type = GET_VILLAIN;
  constructor(public readonly payload: string) {}
}

export class GetVillainSuccess extends VillainAction {
  readonly type = GET_VILLAIN_SUCCESS;
}

export class GetVillainError extends VillainErrorAction {
  readonly type = GET_VILLAIN_ERROR;
}

export class UpdateVillain extends VillainAction {
  readonly type = UPDATE_VILLAIN;
}

export class UpdateVillainSuccess extends VillainAction {
  readonly type = UPDATE_VILLAIN_SUCCESS;
}

export class UpdateVillainError extends VillainErrorAction {
  readonly type = UPDATE_VILLAIN_ERROR;
}

export class DeleteVillain extends VillainAction {
  readonly type = DELETE_VILLAIN;
}

export class DeleteVillainSuccess extends VillainAction {
  readonly type = DELETE_VILLAIN_SUCCESS;
}

export class DeleteVillainError extends VillainErrorAction {
  readonly type = DELETE_VILLAIN_ERROR;
}

export type AllVillainActions =
  | GetVillain
  | GetVillainSuccess
  | GetVillainError
  | UpdateVillain
  | UpdateVillainSuccess
  | UpdateVillainError
  | GetVillains
  | GetVillainsSuccess
  | GetVillainsError
  | AddVillain
  | AddVillainSuccess
  | AddVillainError
  | DeleteVillain
  | DeleteVillainSuccess
  | DeleteVillainError;
