import { PizzaGuard } from "./pizzas.guard";
import { PizzaExistsGuard } from "./pizza-exists.guards";
import { ToppingsGuard } from "./toppings.guard";

export const guards: any[] = [PizzaGuard, PizzaExistsGuard, ToppingsGuard];

export * from "./pizzas.guard";
export * from "./pizza-exists.guards";
export * from "./toppings.guard";
