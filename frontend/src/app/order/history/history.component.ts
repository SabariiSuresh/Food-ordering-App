import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit{

  orders : any[] = [];

  constructor( private apiService : ApiService , private router : Router ){}

 ngOnInit(): void {
   this.apiService.getOrders().subscribe({
    next : (res:any)=>{
      this.orders = res;
    } ,
    error : err=>{
      alert('Faild to load orders' + err)
    }
   })
 }

}
