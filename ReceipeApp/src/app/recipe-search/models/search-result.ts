import { Recipe } from "./index";
import { Hit } from "./hit";

export interface SearchResult {
  from: number;
  to: number;
  more: boolean;
  count: number;
  hits: Array<Hit>;
}
