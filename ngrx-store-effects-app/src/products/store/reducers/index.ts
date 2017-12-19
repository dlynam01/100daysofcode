import * as fromPizzas from "../reducers/pizzas.reducer";
import {
  ActionReducerMap,
  createFeatureSelector
} from "@ngrx/store";
import { pizzaEntities } from "../reducers/pizzas.reducer";
export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer
};

export const productsState = createFeatureSelector<ProductsState>("products");