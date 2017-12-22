import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { reducers, effects } from "./store";
import { EffectsModule } from "@ngrx/effects";

// components
import * as fromComponents from "./components";

// containers
import * as fromContainers from "./containers";

// services
import * as fromServices from "./services";

import * as fromGuards from "./guards";

// routes
export const ROUTES: Routes = [
  {
    path: "",
    canActivate: [fromGuards.PizzaGuard],
    component: fromContainers.ProductsComponent
  },
  {
    path: ":id",
    canActivate: [fromGuards.PizzaExistsGuard, fromGuards.ToppingsGuard],
    component: fromContainers.ProductItemComponent
  },
  {
    path: "new",
    canActivate: [fromGuards.PizzaGuard, fromGuards.ToppingsGuard],
    component: fromContainers.ProductItemComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature("products", reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromServices.services, ...fromGuards.guards],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class ProductsModule {}
