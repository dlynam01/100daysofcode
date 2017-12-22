import * as fromPizzas from "./pizzas.actions";

describe("Pizzas Actions", () => {
  describe("LoadPizzas Actions", () => {
    describe("LoadPizzas", () => {
      it("should create an action", () => {
        const action = new fromPizzas.LoadPizzas();
        expect({ ...action }).toEqual({
          type: fromPizzas.LOAD_PIZZAS
        });
      });
    });

    describe("LoadPizzasFail", () => {
      it("should create an action", () => {
        const action = new fromPizzas.LoadPizzasFail("Load Error");
        expect({ ...action }).toEqual({
          type: fromPizzas.LOAD_PIZZAS_FAIL,
          payload: "Load Error"
        });
      });
    });

    describe("LoadPizzasSuccess", () => {
      it("should create an action", () => {
        const payload = [
          { id: 1, name: "Pizza 1", toppings: [{ name: "Cheese" }] }
        ];
        const action = new fromPizzas.LoadPizzasSuccess(payload);
        expect({ ...action }).toEqual({
          type: fromPizzas.LOAD_PIZZAS_SUCCESS,
          payload
        });
      });
    });
  });
});
