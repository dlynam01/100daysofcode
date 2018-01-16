export interface Recipe {
  uri: string;
  label: string;
  image: string;
  url: string;
  dietLabels: Array<string>;
  healthLabels: Array<string>;
  ingredientLines: Array<string>;
  calories: number;
}
