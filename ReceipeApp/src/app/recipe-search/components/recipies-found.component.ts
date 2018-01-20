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
        margin: 30px;
        width: 300px;
    }
    .card:hover {
        box-shadow: 0px 12px 20px 5px rebeccapurple;
        cursor: pointer;
    }

    .card-title {
        padding: 2px 16px;
        color: white;
    }

    .spinner {
        width: 100px;
        height: 100px;
      
        position: relative;
        margin: 100px auto;
      }
      
      .double-bounce1, .double-bounce2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: rebeccapurple;
        opacity: 0.7;
        position: absolute;
        top: 0;
        left: 0;
        
        -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
        animation: sk-bounce 2.0s infinite ease-in-out;
      }
      
      .double-bounce2 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
      }
      
      @-webkit-keyframes sk-bounce {
        0%, 100% { -webkit-transform: scale(0.0) }
        50% { -webkit-transform: scale(1.0) }
      }
      
      @keyframes sk-bounce {
        0%, 100% { 
          transform: scale(0.0);
          -webkit-transform: scale(0.0);
        } 50% { 
          transform: scale(1.0);
          -webkit-transform: scale(1.0);
        }
      }
  `
  ],
  template: `
        <div *ngIf="isLoading$ | async" class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
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
  private isLoading$: Observable<boolean>;
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.recipies$ = this.store.select(fromViews.RECIPIES_VIEW);
    this.isLoading$ = this.store.select(fromViews.LOADING_VIEW);
  }
}
