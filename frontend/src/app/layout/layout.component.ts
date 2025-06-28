import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../shared/service/auth.service';
import { ApiService } from '../shared/service/api.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(private router: Router, private auth: AuthService, private api: ApiService) { }

  foods: any[] = [];
  originalFoods: any[] = [];
  showCategorySection = true;

  categories = [
    { value: 'biryani', viewValue: 'Biryani', image: 'https://images.pexels.com/photos/7837978/pexels-photo-7837978.jpeg' },
    { value: 'pizaas', viewValue: 'Pizzas', image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg' },
    { value: 'dessarts', viewValue: 'Dessarts', image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg' },
    { value: 'noodles', viewValue: 'Noodles', image: 'https://images.pexels.com/photos/1395319/pexels-photo-1395319.jpeg' },
    { value: 'north_indian', viewValue: 'North Indian', image: 'https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg' },
    { value: 'soup', viewValue: 'Soup', image: 'https://images.pexels.com/photos/1703272/pexels-photo-1703272.jpeg' },
    { value: 'beverages', viewValue: 'Beverages', image: 'https://images.pexels.com/photos/2575835/pexels-photo-2575835.jpeg' }
  ];

  ngOnInit() {

    const currentUrl = this.router.url;
    const showOnRoutes = ['/', '/restaurants'];
    this.showCategorySection = showOnRoutes.includes(currentUrl);

    this.api.getAllFood().subscribe((data: any) => {
      this.foods = data;
      this.originalFoods = [...data]
    })

    this.hide();
  }

  goTo() {

  }

  filterByCategory(category: string) {
    if (category.toLowerCase() === 'all') {
      this.foods = [...this.originalFoods];
    } else {
      this.foods = this.originalFoods.filter(rest => {
        return rest.category.toLowerCase() === category.toLowerCase()
      });
    }
  }

  hide() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      const showOnRoutes = ['/', '/restaurants'];
      this.showCategorySection = showOnRoutes.includes(event.urlAfterRedirects);
    })
  }

  viewMenu(id: string) {
    this.router.navigate(['/foods', id]);
  }


  get isAdmin(): boolean {
    return this.auth.getRole() === 'admin';
  }

  get isUser(): boolean {
    return this.auth.getRole() === 'user';
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

}
