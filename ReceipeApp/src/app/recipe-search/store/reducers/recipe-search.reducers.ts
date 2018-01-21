import * as fromActions from "../actions";
import * as fromModels from "../../models";
import { createFeatureSelector } from "@ngrx/store";

export interface RecipeSearchState {
  searchString: string;
  selectedPagination: number;
  results: fromModels.SearchResult;
  paginationOptions: Array<number>;
  isLoading: boolean;
  loaded: boolean;
}

export const initialState: RecipeSearchState = {
  searchString: "",
  selectedPagination: 0,
  paginationOptions: [],
  isLoading: false,
  loaded: false,
  results: {
    from: 0,
    to: 0,
    more: false,
    count: 0,
    hits: []
  }
};

export function reducer(
  state: RecipeSearchState = initialState,
  action: fromActions.RecipeActions
): RecipeSearchState {
  switch (action.type) {
    case fromActions.RECIPE_SEARCH: {
      return {
        ...state,
        results: initialState.results,
        searchString: (<fromActions.RecipeSearch>action).payload,
        isLoading: true,
        loaded: false
      };
    }
    case fromActions.RECIPES_SEARCH_SUCCESS: {
      const payload: fromModels.SearchResult = (<fromActions.RecipeSearchSuccess>action).payload;
      const from = payload.from;
      const isLastPage = payload.to >= payload.count;
      const selectedPagination = isLastPage
        ? Math.ceil(payload.count / 10)
        : payload.to / 10;
      const test = Math.ceil(payload.count / 10);
      const paginationOptions = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
        .filter(index => !(!isLastPage && index < -3))
        .map(index => index + selectedPagination)
        .filter(index => index > 0)
        .filter(index => index <= test)
        .slice(0, 5);

      return {
        ...state,
        results: payload,
        selectedPagination,
        paginationOptions,
        isLoading: false,
        loaded: true
      };
    }
    case fromActions.RECIPES_SEARCH_FAILED: {
      return {
        ...state,
        results: initialState.results,
        isLoading: false,
        loaded: false
      };
    }
    case fromActions.RECIPE_SEARCH_PAGANATION: {
      return {
        ...state,
        isLoading: true,
        loaded: false,
        results: initialState.results
      }
    }
    default: {
      return state;
    }
  }
}

export const RECIPE_SEARCH_VIEW = createFeatureSelector("recipe-search");
