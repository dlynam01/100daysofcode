import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromStore from "./store";
import * as fromComponents from "./components";
import { SearchForm } from "./components";
import { SearchRecipeService } from "./services";
import { HttpModule } from "@angular/http";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    StoreModule.forFeature("recipe-search", fromStore.reducer),
    EffectsModule.forFeature(fromStore.effects)
  ],
  declarations: [SearchForm],
  providers: [SearchRecipeService],
  exports: [SearchForm]
})
export class RecipeSearchModule {}
