import { Action } from "@ngrx/store";

export const RECIPE_SEARCH = "[Recipe Search] Search";
export const RECIPES_SEARCH_SUCCESS = "[Recipe Search] Success";
export const RECIPES_SEARCH_FAILED = "[Recipe Search] Failed";

export class RecipeSearch implements Action {
  type = RECIPE_SEARCH;
  constructor(public payload: string) {}
}

export class RecipeSearchSuccess implements Action {
  type = RECIPES_SEARCH_SUCCESS;
  constructor(public payload: any) {}
}

export class RecipeSearchFailure implements Action {
  type = RECIPES_SEARCH_FAILED;
  constructor(public payload: any) {}
}

export type RecipeActions =
  | RecipeSearch
  | RecipeSearchSuccess
  | RecipeSearchFailure;
