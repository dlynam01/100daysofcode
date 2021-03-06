import * as fromPizzas from "./pizzas.reducer";
import * as fromActions from "../actions/pizzas.actions";
import { Pizza } from "../../models/pizza.model";

describe("Pizza Reducers", () => {
  describe("undefined action", () => {
    it("should return the default state", () => {
      const { initialState } = fromPizzas;
      const action = {} as any;
      const state = fromPizzas.reducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });

  describe("LOAD_PIZZA Action", () => {
    it("should set loading to true", () => {
      const { initialState } = fromPizzas;
      const action = new fromActions.LoadPizzas();
      const state = fromPizzas.reducer(initialState, action);
      expect(state.entities).toEqual({});
      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
    });
  });

  describe("LOAD_PIZZA_SUCCESS Action", () => {
    it("should map an array to entities", () => {
      const { initialState } = fromPizzas;
      const pizzas: Pizza[] = [
        { id: 1, name: "Pizza 1", toppings: [] },
        { id: 2, name: "Pizza 2", toppings: [] },
        { id: 3, name: "Pizza 3", toppings: [] }
      ];
      const entities = {
        1: pizzas[0],
        2: pizzas[1],
        3: pizzas[2]
      };
      const action = new fromActions.LoadPizzasSuccess(pizzas);
      const state = fromPizzas.reducer(initialState, action);
      expect(state.entities).toEqual(entities);
      expect(state.loading).toEqual(false);
      expect(state.loaded).toEqual(true);
    });
  });
});
