import * as fromPizzas from "../reducers/pizzas.reducer";
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";
export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer
};

export const productsState = createFeatureSelector<ProductsState>("products");

export const pizzasLens = createSelector(
  productsState,
  (state: ProductsState) => state.pizzas
);

export const allPizzasLens = createSelector(pizzasLens, fromPizzas.pizzas);
export const pizzasLoadedLens = createSelector(
  pizzasLens,
  fromPizzas.arePizzasLoaded
);
export const pizzasLoadingLens = createSelector(
  pizzasLens,
  fromPizzas.arePizzasLoading
);
