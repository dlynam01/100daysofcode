import * as fromPizzas from "../reducers/pizzas.reducer";
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";
import { pizzaEntities } from "../reducers/pizzas.reducer";
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

export const allPizzaEntitiesLens = createSelector(
  pizzasLens,
  fromPizzas.pizzaEntities
);
export const pizzasLoadedLens = createSelector(
  pizzasLens,
  fromPizzas.arePizzasLoaded
);
export const pizzasLoadingLens = createSelector(
  pizzasLens,
  fromPizzas.arePizzasLoading
);

export const allPizzaLens = createSelector(allPizzaEntitiesLens, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});
