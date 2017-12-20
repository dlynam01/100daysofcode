import * as fromToppings from "../actions/toppings.actions";
import { Topping } from "../../models/topping.model";

export interface ToppingsState {
  entities: { [id: number]: Topping };
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedToppings: []
};

export function reducer(
  state = initialState,
  action: fromToppings.TOPPINGS_ACTIONS
): ToppingsState {
  switch (action.type) {
    case fromToppings.LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromToppings.LOAD_TOPPINGS_SUCCESS: {
      const toppings = action.payload;
      const entities = toppings.reduce(
        (entities: { [id: number]: Topping }, topping: Topping) => {
          return {
            ...entities,
            [topping.id]: topping
          };
        },
        {
          ...state.entities,
        }
      );
      return {
        ...state,
        loaded: true,
        loading: false,
        entities
      };
    }
    case fromToppings.LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    case fromToppings.VISUALISE_TOPPINGS: {
      const selectedToppings = action.payload;
      return {
        ...state,
        selectedToppings
      };
    }
    default: {
      return state;
    }
  }
}

export const toppingsEntities = (state: ToppingsState) => state.entities;
export const toppingsLoaded = (state: ToppingsState) => state.loaded;
export const toppingsLoading = (state: ToppingsState) => state.loading;
export const selectedToppings = (state: ToppingsState) =>
  state.selectedToppings;
