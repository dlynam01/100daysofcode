import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Recipe } from "../models/index";
import { Store } from "@ngrx/store";
import * as fromViews from "../store/views";

@Component({
  selector: "recipies-found",
  styles: [
    `
    .container {
        tranition: 0.3s;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
    .card {
        margin-top: 40px;
    }
    .card:hover {
        box-shadow: 0px 12px 20px 5px rebeccapurple;
        cursor: pointer;
    }

    .card-title {
        padding: 2px 16px;
        color: white;
    }
  `
  ],
  template: `
        <div *ngIf="!((recipies$ | async)?.length)">
            No Recipies Found!!
        </div>
        <div class="container">
            <div class="card" *ngFor="let recipe of (recipies$ | async)">
                <img src="{{recipe.image}}" style="width=100%"/>    
                <div class="card-title">
                    <h4>
                        <b>Name: {{recipe.label}}</b>
                    </h4>
                </div>
            </div>
        </div>
    `
})
export class RecipiesFoundComponent implements OnInit {
  private recipies$: Observable<Array<Recipe>>;
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.recipies$ = this.store.select(fromViews.RECIPIES_VIEW);
  }
}
