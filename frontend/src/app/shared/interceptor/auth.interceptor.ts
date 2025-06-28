import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ApiService } from '../service/api.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private api: ApiService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.api.show();

    return next.handle(req).pipe(
      finalize(() => this.api.hide())
    );
  }
}
