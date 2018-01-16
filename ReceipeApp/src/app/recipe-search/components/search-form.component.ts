import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../store";

@Component({
  selector: "search-recipe",
  template: `<input type="text" placeholder="Search a Recipe" #input ><button (click)=search(input.value)>Search</button>`
})
export class SearchForm {
  constructor(private store: Store<fromStore.RecipeSearchState>) {}

  search(input: string) {
    this.store.dispatch(new fromStore.RecipeSearch(input));
  }
}
