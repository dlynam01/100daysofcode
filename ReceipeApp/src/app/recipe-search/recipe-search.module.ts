import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromStore from "./store";
import { components } from "./components";
import { SearchRecipeService } from "./services";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature("recipe-search", fromStore.reducer),
    EffectsModule.forFeature(fromStore.effects)
  ],
  declarations: [...components],
  providers: [SearchRecipeService],
  exports: [...components]
})
export class RecipeSearchModule {}
