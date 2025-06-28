import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';
import { ApiService } from '../../shared/service/api.service';

@Component({
  selector: 'app-add-restaurant',
  standalone: false,
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.css'
})
export class AddRestaurantComponent implements OnInit{

  addForm!:FormGroup

  constructor( private form : FormBuilder , private router : Router , private authService : AuthService , private apiservice : ApiService ){

    if(this.authService.getRole() !== 'admin'){
      alert('Access denied')
      this.router.navigate(['/restaurants'])
    }

  }

  ngOnInit(): void {
   this.addForm = this.form.group({
    name : new FormControl ('' , [Validators.required]),
    address : new FormControl ('' , [Validators.required]),
    image : new FormControl ('' , [Validators.required])
   })
  }

  onSubmit(){
    if(this.addForm.valid){
      this.apiservice.addRestaurent(this.addForm.value).subscribe({
        next : ()=> {
          alert('Restaurent added')
          this.router.navigate(['/restaurants'])
        },
        error : ()=> {
          alert('Failed to add restaurants')
        }
      })
    }
  }

}
