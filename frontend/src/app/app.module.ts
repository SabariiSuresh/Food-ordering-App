import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ViewComponent } from './cart/view/view.component';
import { HistoryComponent } from './order/history/history.component';
import { RestaurantListComponent } from './rstaurant/restaurant-list/restaurant-list.component';
import { FoodListComponent } from './food/food-list/food-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { LayoutComponent } from './layout/layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { AddFoodComponent } from './food/add-food/add-food.component';
import { AddRestaurantComponent } from './rstaurant/add-restaurant/add-restaurant.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { DialogComponent } from './shared/component/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingInterceptor } from './shared/interceptor/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ViewComponent,
    HistoryComponent,
    RestaurantListComponent,
    FoodListComponent,
    LayoutComponent,
    AddFoodComponent,
    AddRestaurantComponent,
    DialogComponent
  ],
  imports: [
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule,  
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatCard,
    MatExpansionModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  providers: [ {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
