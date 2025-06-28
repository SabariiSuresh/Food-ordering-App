import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RestaurantListComponent } from './rstaurant/restaurant-list/restaurant-list.component';
import { FoodListComponent } from './food/food-list/food-list.component';
import { HistoryComponent } from './order/history/history.component';
import { ViewComponent } from './cart/view/view.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { AddRestaurantComponent } from './rstaurant/add-restaurant/add-restaurant.component';
import { AddFoodComponent } from './food/add-food/add-food.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-restaurant', component : AddRestaurantComponent, canActivate: [AuthGuard] },
{ path: 'add-food/:restaurantId', component : AddFoodComponent, canActivate: [AuthGuard] },

  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'restaurants', component: RestaurantListComponent },
      { path: 'foods/:restaurentId', component: FoodListComponent },
      { path: 'order', component: HistoryComponent, canActivate: [AuthGuard] },
      { path: 'cart', component: ViewComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'restaurants', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
