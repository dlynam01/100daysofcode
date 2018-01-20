import { RECIPE_SEARCH_VIEW, RecipeSearchState } from "../reducers";
import { createSelector } from "@ngrx/store";

export const RECIPIES_VIEW = createSelector(
  RECIPE_SEARCH_VIEW,
  (state: RecipeSearchState) => state.results.hits.map(hit => hit.recipe)
);

export const HITS_COUNT_VIEW = createSelector(
  RECIPE_SEARCH_VIEW,
  (state: RecipeSearchState) => state.results.count
);

export const PAGINATION_NUMBERS_VIEW = createSelector(
  RECIPE_SEARCH_VIEW,
  (state: RecipeSearchState) => state.paginationOptions
);

export const PAGINATION_SELECTION_VIEW = createSelector(
  RECIPE_SEARCH_VIEW,
  (state: RecipeSearchState) => state.selectedPagination
);

export const LOADING_VIEW = createSelector(
  RECIPE_SEARCH_VIEW,
  (state: RecipeSearchState) => state.isLoading
);

export const LOADED_VIEW = createSelector(
    RECIPE_SEARCH_VIEW,
    (state: RecipeSearchState) => state.loaded
  );
