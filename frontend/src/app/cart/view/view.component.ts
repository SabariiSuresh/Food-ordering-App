import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/component/dialog/dialog.component';

@Component({
  selector: 'app-view',
  standalone: false,
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit {

  cart: any;
  total: number = 0;
  errorMessage = '';
  successMessage = '';
  message = '';

  constructor(private apiService: ApiService, private router: Router, public dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.apiService.getCart().subscribe({
      next: (res: any) => {
        this.cart = res;
        this.total = res?.items?.reduce((sum: number, item: any) => {
          return sum + item.food.price * item.quantity;
        }, 0)
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Error to loding cart';
      }
    })
  }

  clearCart() {
    this.apiService.clearCart().subscribe(() => {
      this.cart = null,
        this.total = 0;
      this.successMessage = this.message
    })
  }

  placeOrder() {

    const dialogRef = this.dialogRef.open(DialogComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(( deliveryAddress : string | null )=>{
      if(deliveryAddress){
        this.apiService.placeOrder({deliveryAddress}).subscribe(()=>{
          this.successMessage = this.message || 'Order placed successfuly';
          this.router.navigate(['/order'])
        })
      }
    })
  }

  

}
