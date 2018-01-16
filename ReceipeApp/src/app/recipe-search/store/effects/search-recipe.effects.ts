import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import * as fromActions from "../actions";
import { SearchRecipeService } from "../../services";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";

@Injectable()
export class SearchRecipeEffects {
  constructor(
    private actions$: Actions,
    private searchReipeService: SearchRecipeService
  ) {}

  @Effect()
  loadReipies$ = this.actions$
    .ofType(fromActions.RECIPE_SEARCH)
    .pipe(
      map((action: fromActions.RecipeSearch) => action.payload),
      switchMap(a =>
        this.searchReipeService
          .searchRecipe(a)
          .pipe(
            map(b => new fromActions.RecipeSearchSuccess(b)),
            catchError(err => of(new fromActions.RecipeSearchFailure(err)))
          )
      )
    );
}
