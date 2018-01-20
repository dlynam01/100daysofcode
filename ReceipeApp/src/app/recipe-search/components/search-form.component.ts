import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../store";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
  selector: "search-recipe",
  styles: [`
  .button {
    display: inline-block;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 250px;
    height: 42px;
    cursor: I-beam;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0 20px;
    overflow: hidden;
    border: none;
    -webkit-border-radius: 21px;
    border-radius:10px;
    font: normal 20px/normal "Antic", Helvetica, sans-serif;
    color: rgba(140, 140, 140, 1);
    text-decoration: normal;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    background: rgba(40, 40, 40, 0.4);
    -webkit-box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.5) inset;
    box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.5) inset;
    -webkit-transition: all 502ms cubic-bezier(0.68, -0.75, 0.265, 1.75);
    -moz-transition: all 502ms cubic-bezier(0.68, -0.75, 0.265, 1.75);
    -o-transition: all 502ms cubic-bezier(0.68, -0.75, 0.265, 1.75);
    transition: all 502ms cubic-bezier(0.68, -0.75, 0.265, 1.75);
  }
  
  input:focus {
    outline: rebeccapurple solid medium;
  }
  
  .button:hover, .button:focus {
    width: 490px;
    cursor: default;
    padding: -13px 20px 0;
    color: rgba(255, 255, 255, 1);
    -webkit-transition: all 601ms cubic-bezier(0.68, -0.75, 0.265, 1.75);
    -moz-transition: all 601ms cubic-bezier(0.68, -0.75, 0.265, 1.75);
    -o-transition: all 601ms cubic-bezier(0.68, -0.75, 0.265, 1.75);
    transition: all 601ms cubic-bezier(0.68, -0.75, 0.265, 1.75);
  }
  `],
  template: `
  <button (click)=search(input.value)>Search</button><input class="button" placeholder="Search an Ingredient, ie Chicken, Ham etc" #input />
  `
})
export class SearchForm {
  constructor(private store: Store<fromStore.RecipeSearchState>) {}

  search(input: string) {
    this.store.dispatch(new fromStore.RecipeSearch(input));
  }
}
