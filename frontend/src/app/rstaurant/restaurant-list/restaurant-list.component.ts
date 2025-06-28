import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  standalone: false,
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.css'
})
export class RestaurantListComponent implements OnInit{

  restaurants : any[] = [];
  errorMessage = '';
  message = '';

  constructor( private apiService : ApiService , private router : Router ){}

ngOnInit(): void {
  this.apiService.getRestaurants().subscribe({
    next : ( res : any )=> {
      this.restaurants = res;
    },
    error : err=> {
      this.errorMessage = err.error?.message || 'Failed to fetch restaurants'
    }
  })
}

viewMenu( restaurantId : string ){
 this.router.navigate(['/foods' , restaurantId])
}

}
