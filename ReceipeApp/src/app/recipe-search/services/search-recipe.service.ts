import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class SearchRecipeService {
  constructor(private httpService: Http) {}

  searchRecipe(searchString: string) {
    return this.httpService.get(
      "https://api.edamam.com/search?app_id=ab40f237&app_key=6144a5bc9465b7e0b0a408dd6d8b982c&q=" +
        searchString
    );
  }
}
