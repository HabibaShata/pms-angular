import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from '../interface/ilogin';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private router = inject(Router)

  onLogin(data: ILogin): Observable<any> { return this.http.post('Users/Login', data) }

  //Get User Role
  getRole(): string | null {
    return localStorage.getItem('userRole') || null;
  }

  // logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.router.navigate(['/auth/login']);
  }

  onRegister(data: FormData): Observable<any> {
    return this.http.post('Users/Register', data);
  }


}
