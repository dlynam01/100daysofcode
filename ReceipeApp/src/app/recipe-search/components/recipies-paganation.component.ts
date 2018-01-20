import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../store";
import * as fromViews from "../store/views";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "recipies-pagination",
  styles: [
    `
    .container {
        color: rebeccapurple; 
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;

    }
    
    .container a {
        padding: 8px 16px;
        text-decoration: none;
        margin: 10px;
    }
    
    .container a.active {
        background-color: rebeccapurple;
        color: white;
        border-radius: 5px;
    }
    
    .container a:hover:not(.active) {
        background-color: black;
        box-shadow: 0px 3px 4px 2px rebeccapurple;
        cursor: pointer;
    }
        

  `
  ],
  template: `
        <div *ngIf="isLoaded$ | async">
            <div class="container">
                <div>Number of hits: {{(count$ | async)}}</div>
            </div>
            <div class="container">
                <a [ngClass]="{'active' : false }" *ngFor="let number of (paginationNumbers$ | async)">{{number}}</a>
            </div>
        </div>
        

        
    `
})
export class RecipiesPaginationComponent implements OnInit {
  private count$: Observable<number>;
  private from$: Observable<number>;
  private to$: Observable<number>;
  private paginationNumbers$: Observable<Array<number>>;
  private selectedPageNumber$: Observable<number>;
  private isLoaded$: Observable<boolean>;
  constructor(private store: Store<fromStore.RecipeSearchState>) {}

  ngOnInit(): void {
    this.count$ = this.store.select(fromViews.HITS_COUNT_VIEW);
    this.paginationNumbers$ = this.store.select(
      fromViews.PAGINATION_NUMBERS_VIEW
    );
    this.selectedPageNumber$ = this.store.select(
      fromViews.PAGINATION_SELECTION_VIEW
    );
    this.isLoaded$ = this.store.select(fromViews.LOADED_VIEW);
  }
}
