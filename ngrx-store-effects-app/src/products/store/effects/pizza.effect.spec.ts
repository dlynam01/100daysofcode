import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { hot, cold } from "jasmine-marbles";
import { empty } from "rxjs/observable/empty";
import { PizzasService } from "../../services/pizzas.service";
import * as fromActions from "../actions";
import * as fromEffects from "../effects";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { _throw } from "rxjs/observable/throw";
import { effects } from "src/app/store";
import { Pizza } from "../../models/pizza.model";

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe("Pizza Effects", () => {
  let testActions$: TestActions;
  let service: PizzasService;
  let effects$: fromEffects.PizzaEffect;
  const pizzas = [
    { id: 1, name: "Pepperoni", toppings: [{}] },
    { id: 2, name: "Meat Feast", toppings: [] }
  ];
  let serviceResponse: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PizzasService,
        fromEffects.PizzaEffect,
        { provide: Actions, useFactory: getActions }
      ]
    });
    testActions$ = TestBed.get(Actions);
    service = TestBed.get(PizzasService);
    effects$ = TestBed.get(fromEffects.PizzaEffect);
  });

  describe("after getting pizzas", () => {
    beforeEach(() => {
      serviceResponse = spyOn(service, "getPizzas").and.returnValue(of(pizzas));
    });
    it("should send success action after sucessful download of pizzas", () => {
      const loadPizzaAction = new fromActions.LoadPizzas();
      const pizzasLoadedAction = new fromActions.LoadPizzasSuccess(pizzas);
      testActions$.stream = hot("-a", { a: loadPizzaAction });
      const expected = cold("-b", { b: pizzasLoadedAction });
      expect(effects$.loadPizzas$).toBeObservable(expected);
    });

    it("should send pizza failure action after failed download of pizzas", () => {
      serviceResponse.and.returnValue(_throw("Failed to Download Pizzas"));
      const loadPizzaAction = new fromActions.LoadPizzas();
      const pizzasFailedAction = new fromActions.LoadPizzasFail(
        "Failed to Download Pizzas"
      );
      testActions$.stream = hot("-a", { a: loadPizzaAction });
      const expected = cold("-b", { b: pizzasFailedAction });
      expect(effects$.loadPizzas$).toBeObservable(expected);
    });
  });

  describe("after creating a pizza", () => {
    const pizza: Pizza = {
      id: 3,
      name: "Test Pizza",
      toppings: [{ name: "Cheese" }]
    };
    beforeEach(() => {
      serviceResponse = spyOn(service, "createPizza").and.returnValue(
        of(pizza)
      );
    });

    it("should send pizza created action after successfully creating a pizza", () => {
      const createPizzaAction = new fromActions.CreatePizza(pizza);
      const pizzaCreatedAction = new fromActions.CreatePizzaSuccess(pizza);
      testActions$.stream = hot("-a", { a: createPizzaAction });
      const expected = cold("-b", { b: pizzaCreatedAction });
      expect(effects$.createPizza$).toBeObservable(expected);
    });

    it("should send a pizza created action after pizza created failed request", () => {
      serviceResponse.and.returnValue(_throw("Failed to Create Pizza"));
      const createPizzaAction = new fromActions.CreatePizza(pizza);
      const pizzaFailedAction = new fromActions.CreatePizzaFail(
        "Failed to Create Pizza"
      );
      testActions$.stream = hot("-a", { a: createPizzaAction });
      const expected = cold("-b", { b: pizzaFailedAction });
      expect(effects$.createPizza$).toBeObservable(expected);
    });
  });
});
