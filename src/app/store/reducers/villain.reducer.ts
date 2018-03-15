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

export function reducer(
  state = initialState,
  action: VillainActions.AllVillainActions
): VillainState {
  switch (action.type) {
    case VillainActions.ADD_VILLAIN: {
      return { ...state, loading: true };
    }

    case VillainActions.ADD_VILLAIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        villains: [...state.villains, { ...action.payload }]
      };
    }

    case VillainActions.ADD_VILLAIN_ERROR: {
      return { ...state, loading: false };
    }

    case VillainActions.GET_VILLAINS: {
      return { ...state, loading: true };
    }

    case VillainActions.GET_VILLAINS_ERROR: {
      return {
        ...state,
        loading: false
      };
    }

    case VillainActions.GET_VILLAINS_SUCCESS: {
      return {
        ...state,
        villains: action.payload,
        loading: false
      };
    }

    case VillainActions.DELETE_VILLAIN: {
      return {
        ...state,
        loading: true,
        villains: state.villains.filter(h => h !== action.payload)
      };
    }

    case VillainActions.DELETE_VILLAIN_SUCCESS: {
      const result = { ...state, loading: false };
      return result;
    }

    case VillainActions.DELETE_VILLAIN_ERROR: {
      return {
        ...state,
        villains: [...state.villains, action.payload.requestData],
        loading: false
      };
    }

    case VillainActions.UPDATE_VILLAIN: {
      return {
        ...state,
        villains: state.villains.map(h => {
          if (h.id === action.payload.id) {
            state.loading = true;
          }
          return h;
        })
      };
    }

    case VillainActions.UPDATE_VILLAIN_SUCCESS: {
      return modifyVillainState(state, action.payload);
    }

    case VillainActions.UPDATE_VILLAIN_ERROR: {
      return {
        ...state,
        loading: false,
        villains: state.villains.map(h => {
          if (h.id === action.payload.requestData.id) {
            // Huh? No idea what the error is!
            state.error = true;
          }
          return h;
        })
      };
    }
  }
  return state;
}

function modifyVillainState(
  villainState: VillainState,
  villainChanges: Partial<Villain>
): VillainState {
  return {
    ...villainState,
    loading: false,
    villains: villainState.villains.map(h => {
      if (h.id === villainChanges.id) {
        return { ...h, ...villainChanges };
      } else {
        return h;
      }
    })
  };
}
