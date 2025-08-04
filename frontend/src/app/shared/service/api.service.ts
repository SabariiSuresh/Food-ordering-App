import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private restaurantUrl = environment.apiUrl+'/restaurent'
  private foodUrl = environment.apiUrl+ '/food'
  private cartUrl = environment.apiUrl+ '/cart'
  private placeOrderUrl = environment.apiUrl+ '/order'

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private loadingCount = 0;

  constructor(private http: HttpClient) { }

  //restaurant-->
  getRestaurants() {
    return this.http.get(`${this.restaurantUrl}/list`);
  }

  addRestaurent(data: any) {
    const headers = this.getAuthHeader();
    return this.http.post(`${this.restaurantUrl}/add`, data, { headers });
  }

  addFood(data: any) {
    const headers = this.getAuthHeader();
    return this.http.post(`${this.foodUrl}/add`, data, { headers })
  }

  getFoodByRestaurant(restaurentId: string) {
    return this.http.get(`${this.foodUrl}/restaurent/${restaurentId}`);
  }

  getAllFood() {
    const headers = this.getAuthHeader();
    return this.http.get(`${this.foodUrl}/all`, { headers })
  }
  //--<

  //cart-->
  addcart(data: any) {
    const headers = this.getAuthHeader();
    return this.http.post(`${this.cartUrl}/add`, data, { headers });
  }


  getCart() {
    const headers = this.getAuthHeader();
    return this.http.get(`${this.cartUrl}/`, { headers })
  }

  clearCart() {
    const headers = this.getAuthHeader();
    return this.http.delete(`${this.cartUrl}/clear`, { headers })
  }
  //--<

  //order-->
  placeOrder(data: any) {
    const headers = this.getAuthHeader();
    return this.http.post(`${this.placeOrderUrl}/place`, data, { headers })
  }

  getOrders() {
    const headers = this.getAuthHeader();
    return this.http.get(`${this.placeOrderUrl}`, { headers })
  }
  //--<


  getAuthHeader() {
    const token = sessionStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`
    }
  }

  show() {
    this.loadingCount++;
    if (this.loadingCount === 1) {
        console.log('Loading started');
      this.loadingSubject.next(true);
    }
  }

  hide() {
    if (this.loadingCount > 0) {
      this.loadingCount--;
    }
    if (this.loadingCount === 0) {
        console.log('Loading stop');
      this.loadingSubject.next(false);
    }
  }

}
