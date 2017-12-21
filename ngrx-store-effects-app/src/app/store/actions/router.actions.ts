import { Action } from "@ngrx/store";
import { NavigationExtras } from "@angular/router";

export const GO = "[Router] Go";
export const GO_BACK = "[Router] Back";
export const GO_FORWARD = "[Router] Forward";

export class Go implements Action {
  readonly type = GO;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class Back implements Action {
  readonly type = GO_BACK;
}

export class Forward implements Action {
  readonly type = GO_FORWARD;
}

export type Actions = Go | Back | Forward;
