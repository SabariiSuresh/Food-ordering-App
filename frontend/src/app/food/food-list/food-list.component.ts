import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-food-list',
  standalone: false,
  templateUrl: './food-list.component.html',
  styleUrl: './food-list.component.css'
})
export class FoodListComponent implements OnInit {

  restaurantId!: string;
  foods: any[] = [];
  errorMessage = '';
  message = '';

  constructor(private apiservice: ApiService, private route: ActivatedRoute , private router : Router ) { }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.params['restaurentId'];
    console.log("Restaurant ID:", this.restaurantId);
    console.log("Foods:", this.foods);
    this.apiservice.getFoodByRestaurant(this.restaurantId).subscribe({
      next: (res: any) => {
        this.foods = res;
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Failed to load items';
      }
    })
  }


  addToCart(foodId: string) {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      return;
    }
    this.apiservice.addcart({ foodId, quantity: 1 }).subscribe({
      next: () => {
        alert('Added to cart')
       setTimeout(()=>{
         this.router.navigate(['/cart'])
       },2000)
      },
      error: () => alert('Error to add cart')
    })

  }


}
