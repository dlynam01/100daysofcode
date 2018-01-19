import { Recipe } from "./index";

export interface Hit {
  recipe: Recipe;
  bookmarked: boolean;
  bought: boolean;
}
