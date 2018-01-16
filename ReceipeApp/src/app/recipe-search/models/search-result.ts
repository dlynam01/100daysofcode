import { Recipe } from "./index";

export interface SearchResult {
    from: number,
    to: number,
    more: boolean,
    count: number,
    hits: Array<Recipe>
}