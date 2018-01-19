import * as fromActions from "../actions";
import * as fromModels from "../../models";
import { createFeatureSelector } from "@ngrx/store";

export interface RecipeSearchState {
  searchString: string;
  results: fromModels.SearchResult;
}

const initialState: RecipeSearchState = {
  searchString: "",
  results: {
    from: 0,
    to: 0,
    more: false,
    count: 0,
    hits: []
  }
};

export function reducer(
  state = initialState,
  action: fromActions.RecipeActions
) {
  switch (action.type) {
    case fromActions.RECIPE_SEARCH: {
      return {
        searchString: action.payload,
        results: initialState.results
      };
    }
    case fromActions.RECIPES_SEARCH_SUCCESS: {
      return {
        ...state,
        results: action.payload
      };
    }
    case fromActions.RECIPES_SEARCH_FAILED: {
      return {
        ...state,
        results: initialState.results
      };
    }
    default: {
      return state;
    }
  }
}

export const RECIPE_SEARCH_VIEW = createFeatureSelector("recipe-search");
