import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import * as fromActions from "../actions";
import { SearchRecipeService } from "../../services";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import * as fromModels from "../../models";
import { mergeMap } from "rxjs/operators/mergeMap";

@Injectable()
export class SearchRecipeEffects {
  constructor(
    private actions$: Actions,
    private searchReipeService: SearchRecipeService
  ) {}

  @Effect()
  loadRecipies$ = this.actions$
    .ofType(fromActions.RECIPE_SEARCH)
    .pipe(
      map((action: fromActions.RecipeSearch) => action.payload),
      switchMap(a =>
        this.searchReipeService
          .searchRecipe(a)
          .pipe(
            map(
              (result: fromModels.SearchResult) =>
                new fromActions.RecipeSearchSuccess(result)
            ),
            catchError(err => of(new fromActions.RecipeSearchFailure(err)))
          )
      )
    );

  @Effect()
  paginate$ = this.actions$
    .ofType(fromActions.RECIPE_SEARCH_PAGANATION)
    .pipe(
      switchMap((a: fromActions.RecipeSearchPagination) =>
        this.searchReipeService
          .paginate(a.pageNumber, a.searchString)
          .pipe(
            map(
              (result: fromModels.SearchResult) =>
                new fromActions.RecipeSearchSuccess(result)
            ),
            catchError(err => of(new fromActions.RecipeSearchFailure(err)))
          )
      )
    );
}
