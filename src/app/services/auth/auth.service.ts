import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService implements HttpInterceptor {
  public token = localStorage.getItem('Authorization') || '';
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // set hearder authentication
    const authReq = req.clone({
      headers: req.headers.append('Accept', 'application/json').append('Authorization', this.token)
    });
    return next.handle(authReq)
      .catch((error) => {
        console.log('error', error);
        return Observable.throw(error);
      });
  }
}
