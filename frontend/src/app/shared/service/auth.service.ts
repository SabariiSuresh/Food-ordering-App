import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {jwtDecode} from  'jwt-decode';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private baseUrl = environment.apiUrl+ '/auth'

  constructor( private http : HttpClient , private router : Router ) { }

login(userData : any){
 return this.http.post(`${this.baseUrl}/login`, userData);
}

register(userData : any){
  return this.http.post(`${this.baseUrl}/register` , userData);
}

setToken(token : string){
  sessionStorage.setItem('token' , token);
}

getToken(){
  sessionStorage.getItem('token')
}

getUserId(): string | null {
  const token = localStorage.getItem('token');
  if (!token || token.split('.').length !== 3) {
    return null;
  }

  try {
    const decoded: any = jwtDecode(token);
    return decoded.userId;
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
}

getRole(){

const token = sessionStorage.getItem('token')
  if (!token) return '';
  
  const decode : any = jwtDecode(token);

  return decode.role || '';

}

logOut(){
  sessionStorage.removeItem('token');
  this.router.navigate(['/login'])
}

isLoggedIn(){
  return !! sessionStorage.getItem('token')
}

}
