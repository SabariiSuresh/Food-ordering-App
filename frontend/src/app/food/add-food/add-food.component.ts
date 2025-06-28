import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';
import { ApiService } from '../../shared/service/api.service';

@Component({
  selector: 'app-add-food',
  standalone: false,
  templateUrl: './add-food.component.html',
  styleUrl: './add-food.component.css'
})

export class AddFoodComponent implements OnInit {

  addFoodForm !: FormGroup;
  restaurantId = '';
  restaurants: any[] = [];
  categories = [
    { value: 'biryani', viewValue: 'Biryani' },
    { value: 'pizaas', viewValue: 'Pizzas' },
    { value: 'soup', viewValue: 'Soup' },
    { value: 'noodles', viewValue: 'Noodles' },
    { value: 'north_indian', viewValue: 'North Indian' },
    { value: 'desserts', viewValue: 'Desserts' },
    { value: 'beverages', viewValue: 'Beverages' },
    { value: 'chiken', viewValue: 'Chiken' },
    { value: 'burger', viewValue: 'Burger' }
  ];

  constructor(private router: Router, private form: FormBuilder, private authservice: AuthService, private apiService: ApiService) {
    if (this.authservice.getRole() !== 'admin') {
      alert('Access denied')
      this.router.navigate(['/restaurants'])
    }
  }

  ngOnInit(): void {
    this.addFoodForm = this.form.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      restaurent: new FormControl('', [Validators.required])
    })

    this.apiService.getRestaurants().subscribe({
      next : (res : any)=> {
        this.restaurants = res;
      } ,
      error : err=>{
        alert('Failed to get restaurants')
      }
    })

  }

  onsubmit() {
    if (this.addFoodForm.valid) {
      const foodData = this.addFoodForm.value;

      this.apiService.addFood(foodData).subscribe({
        next: () => {
          alert("Items added");
        },

        error: err => {
          alert('Failed to add items')
        }
      })
    }
  }

}
