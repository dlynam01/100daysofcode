import { Action } from "@ngrx/store";
import { SearchResult } from "../../models";

export const RECIPE_SEARCH = "[Recipe Search] Search";
export const RECIPES_SEARCH_SUCCESS = "[Recipe Search] Success";
export const RECIPES_SEARCH_FAILED = "[Recipe Search] Failed";
export const RECIPE_SEARCH_PAGANATION = "[Recipe Search] Pagination";

export class RecipeSearch implements Action {
  type = RECIPE_SEARCH;
  constructor(public payload: string) {}
}

export class RecipeSearchSuccess implements Action {
  type = RECIPES_SEARCH_SUCCESS;
  constructor(public payload: SearchResult) {}
}

export class RecipeSearchFailure implements Action {
  type = RECIPES_SEARCH_FAILED;
  constructor(public payload: any) {}
}

export class RecipeSearchPagination implements Action {
  type = RECIPE_SEARCH_PAGANATION;
  constructor(public pageNumber: number, public searchString: string) {}
}

export type RecipeActions =
  | RecipeSearch
  | RecipeSearchSuccess
  | RecipeSearchFailure
  | RecipeSearchPagination;
