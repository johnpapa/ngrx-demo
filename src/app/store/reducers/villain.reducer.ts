import { Action, createReducer, on } from '@ngrx/store';
import { Villain } from '../../core';
import * as VillainActions from '../actions';

export interface VillainState {
  villains: Villain[];
  loading: boolean;
  error: boolean;
}

export const initialState: VillainState = {
  villains: [],
  loading: false,
  error: false
};

function modifyVillainState(
  villainState: VillainState,
  villainChanges: Partial<Villain>
): VillainState {
  return {
    ...villainState,
    loading: false,
    villains: villainState.villains.map(v => {
      if (v.id === villainChanges.id) {
        return { ...v, ...villainChanges };
      } else {
        return v;
      }
    })
  };
}

const villainReducer = createReducer(
  initialState,
  on(VillainActions.addVillain, state => ({ ...state, loading: true })),
  on(VillainActions.addVillainSuccess, (state, { villain }) => ({
    ...state,
    loading: false,
    villains: [...state.villains, { ...villain }]
  })),
  on(VillainActions.addVillainError, state => ({ ...state, loading: false })),
  on(VillainActions.getVillains, state => ({ ...state, loading: true })),
  on(VillainActions.getVillainsError, state => ({ ...state, loading: false })),
  on(VillainActions.getVillainsSuccess, (state, { villains }) => ({
    ...state,
    loading: false,
    villains
  })),
  on(VillainActions.deleteVillain, (state, { villain }) => ({
    ...state,
    loading: false,
    villains: state.villains.filter(v => v !== villain)
  })),
  on(VillainActions.deleteVillainSuccess, state => ({
    ...state,
    loading: false
  })),
  on(VillainActions.deleteVillainError, (state, { error }) => ({
    ...state,
    villains: [...state.villains, error.requestData],
    loading: false
  })),
  on(VillainActions.updateVillain, (state, { villain }) => ({
    ...state,
    villains: state.villains.map(v => {
      if (v.id === villain.id) {
        state.loading = true;
      }
      return v;
    })
  })),
  on(VillainActions.updateVillainSuccess, (state, { villain }) =>
    modifyVillainState(state, villain)
  ),
  on(VillainActions.updateVillainError, (state, { error }) => ({
    ...state,
    villains: state.villains.map(v => {
      if (v.id === error.requestData.id) {
        // Huh? No idea what the error is!
        state.error = true;
      }
      return v;
    }),
    loading: false
  }))
);

export function reducer(state: VillainState | undefined, action: Action) {
  return villainReducer(state, action);
}
