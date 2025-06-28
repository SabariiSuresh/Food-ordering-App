import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from './shared/service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  
 isLoading = false;
 
  constructor( private api: ApiService , private cdr: ChangeDetectorRef  ) {
    this.api.loading$.subscribe(loading => {
       setTimeout(() => {
    this.isLoading = loading;
  } , 2000);
       this.cdr.detectChanges();
    });
  }

}
