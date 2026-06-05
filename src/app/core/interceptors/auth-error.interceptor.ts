import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  private readonly authService = inject(AuthService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

  return next.handle(request).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401 || error.status === 402) {
        // Clear user data
        this.authService.logout();
      }

      return throwError(() => error);
    })
  );
  }
}
