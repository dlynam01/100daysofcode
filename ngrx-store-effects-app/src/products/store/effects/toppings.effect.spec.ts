import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { hot, cold } from "jasmine-marbles";
import { empty } from "rxjs/observable/empty";
import { ToppingsService } from "../../services/toppings.service";
import * as fromActions from "../actions";
import * as fromEffects from "../effects";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { _throw } from "rxjs/observable/throw";
import { effects } from "src/app/store";

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

describe("Toppings Effects", () => {
  let actions$: TestActions;
  let service: ToppingsService;
  let effects$: fromEffects.ToppingsEffects;
  const toppings = [{ id: 1, name: "onion" }, { id: 2, name: "cheese" }];
  let serviceResponse: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ToppingsService,
        fromEffects.ToppingsEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });
    actions$ = TestBed.get(Actions);
    service = TestBed.get(ToppingsService);
    effects$ = TestBed.get(fromEffects.ToppingsEffects);
    serviceResponse = spyOn(service, "getToppings").and.returnValue(
      of(toppings)
    );
  });

  describe("Load Toppings", () => {
    it("should return a completed success actions after a successful load", () => {
      const action = new fromActions.LoadToppings();
      const loadSuccessAction = new fromActions.LoadToppingsSuccess(toppings);
      actions$.stream = hot("-a", { a: action });
      const expected = cold("-b", { b: loadSuccessAction });
      expect(effects$.loadToppings$).toBeObservable(expected);
    });

    it("should return a completed failed actions after a failed load", () => {
      const error = new Error("Failed to Download Toppings");
      serviceResponse.and.returnValue(_throw(error));
      const action = new fromActions.LoadToppings();
      const loadFailAction = new fromActions.LoadToppingsFail(error);
      actions$.stream = hot('-a', {a: action});
      const expected = cold('-b', {b: loadFailAction});
      expect(effects$.loadToppings$).toBeObservable(expected);
    });
  });
});
