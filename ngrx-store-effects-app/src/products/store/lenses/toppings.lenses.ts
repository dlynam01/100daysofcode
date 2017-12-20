import { createSelector } from "@ngrx/store";
import * as fromRoot from "../../../app/store";
import * as fromFeature from "../reducers";
import * as fromToppings from "../reducers/toppings.reducer";

export const toppingsStateLens = createSelector(
  fromFeature.productsState,
  (state: fromFeature.ProductsState) => state.toppings
);

export const toppingsEntitiesLens = createSelector(
  toppingsStateLens,
  fromToppings.toppingsEntities
);

export const allToppingsLens = createSelector(
  toppingsEntitiesLens,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);

export const toppingsLoadedLens = createSelector(
  toppingsStateLens,
  fromToppings.toppingsLoaded
);

export const toppingsLoadingLens = createSelector(
  toppingsStateLens,
  fromToppings.toppingsLoading
);

export const selectedToppingsLens = createSelector(
  toppingsStateLens,
  fromToppings.selectedToppings
);
