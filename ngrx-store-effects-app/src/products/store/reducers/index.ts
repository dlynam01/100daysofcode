import * as fromPizzas from "../reducers/pizzas.reducer";
import { ActionReducerMap } from "@ngrx/store";
export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer
};
