import { createSelector } from "@ngrx/store";
import * as fromRoot from "../../../app/store";
import * as fromFeature from "../reducers";
import * as fromPizzas from "../reducers/pizzas.reducer";
import { Pizza } from '../../models/pizza.model';

export const pizzasLens = createSelector(
  fromFeature.productsState,
  (state: fromFeature.ProductsState) => state.pizzas
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

export const selectedPizzaLens = createSelector(allPizzaEntitiesLens,
    fromRoot.getRouterState,
    (entities, router): Pizza => {
        return router.state && entities[router.state.params.id]
    }
)

export const allPizzaLens = createSelector(allPizzaEntitiesLens, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});
