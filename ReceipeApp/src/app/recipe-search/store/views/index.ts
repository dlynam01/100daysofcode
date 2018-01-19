import { RECIPE_SEARCH_VIEW, RecipeSearchState } from "../reducers";
import { createSelector } from "@ngrx/store";

export const RECIPIES_VIEW = createSelector(
  RECIPE_SEARCH_VIEW,
  (state: RecipeSearchState) => {
    return state.results.hits.map(hit=>hit.recipe);
  }
);
