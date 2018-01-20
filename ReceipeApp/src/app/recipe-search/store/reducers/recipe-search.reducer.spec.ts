import {
  reducer,
  RecipeSearchState,
  initialState
} from "./recipe-search.reducers";
import * as fromActions from "../actions";
import * as fromModels from "../../models";
describe("Recipe Search Reducer", () => {
  describe("Pagination", () => {
    it("should have no pages if there are 0 results", () => {
      const result = reducer(
        initialState,
        new fromActions.RecipeSearchSuccess({
          from: 0,
          to: 0,
          more: false,
          count: 0,
          hits: []
        })
      );
      expect(result.paginationOptions).toEqual([]);
      expect(result.selectedPagination).toEqual(0);
    });

    it("should have max five page options", () => {
      const result: RecipeSearchState = reducer(
        initialState,
        new fromActions.RecipeSearchSuccess({
          from: 0,
          to: 10,
          more: true,
          count: 1000,
          hits: []
        })
      );
      expect(result.paginationOptions).toEqual([1, 2, 3, 4, 5]);
      expect(result.selectedPagination).toEqual(1);
    });

    it("should have three page options if the count less than 30", () => {
      const result: RecipeSearchState = reducer(
        initialState,
        new fromActions.RecipeSearchSuccess({
          from: 0,
          to: 10,
          more: true,
          count: 29,
          hits: []
        })
      );
      expect(result.paginationOptions).toEqual([1, 2, 3]);
      expect(result.selectedPagination).toEqual(1);
    });

    it("should have four page options if the count is 40", () => {
      const result: RecipeSearchState = reducer(
        initialState,
        new fromActions.RecipeSearchSuccess({
          from: 0,
          to: 10,
          more: true,
          count: 40,
          hits: []
        })
      );
      expect(result.paginationOptions).toEqual([1, 2, 3, 4]);
      expect(result.selectedPagination).toEqual(1);
    });

    it("should have 5 page options if the last page is selected", ()=>{
        //1 0 10
        //2 10 20
        //3 20 30
        //4 30 40
        //5 40 50
        //6 50 60
        //7 60 70
        //8 70 80
        //9 80 90
        //10 90 100
        const result: RecipeSearchState = reducer(
            initialState,
            new fromActions.RecipeSearchSuccess({
              from: 90,
              to: 100,
              more: true,
              count: 100,
              hits: []
            })
          );
          expect(result.paginationOptions).toEqual([6,7,8,9,10]);
          expect(result.selectedPagination).toEqual(10);
    })

    it("should have 5 page options if the total number is not an even 10", ()=>{
        const result: RecipeSearchState = reducer(
            initialState,
            new fromActions.RecipeSearchSuccess({
              from: 90,
              to: 100,
              more: true,
              count: 105,
              hits: []
            })
          );
          expect(result.paginationOptions).toEqual([7,8,9,10,11]);
          expect(result.selectedPagination).toEqual(10);
    })

    it("should have all picking of the last page with an un even count", ()=>{
        const result: RecipeSearchState = reducer(
            initialState,
            new fromActions.RecipeSearchSuccess({
              from: 100,
              to: 105,
              more: true,
              count: 105,
              hits: []
            })
          );
          expect(result.paginationOptions).toEqual([7,8,9,10,11]);
          expect(result.selectedPagination).toEqual(11);
    })

    it("should have 5 page options if the second last page is selected",()=>{
        const result: RecipeSearchState = reducer(
            initialState,
            new fromActions.RecipeSearchSuccess({
              from: 80,
              to: 90,
              more: true,
              count: 100,
              hits: []
            })
          );
          expect(result.paginationOptions).toEqual([6,7,8,9,10]);
          expect(result.selectedPagination).toEqual(9);
    })
  });
});
