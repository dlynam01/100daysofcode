import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as fromModels from "../models";
import { catchError, map } from "rxjs/operators";
import { Observable } from "rxjs/Observable";

@Injectable()
export class SearchRecipeService {
  constructor(private httpService: HttpClient) {}

  searchRecipe(searchString: string): Observable<fromModels.SearchResult> {
    return this.httpService
      .get<fromModels.SearchResult>(
        "https://api.edamam.com/search?app_id=ab40f237&app_key=6144a5bc9465b7e0b0a408dd6d8b982c&q=" +
          searchString
      )
      .pipe(
        catchError((error: any) => Observable.throw(error.json()))
      );
  }
}
