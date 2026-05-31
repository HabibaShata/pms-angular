import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from '../interfaces/ilogin';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CurrentUser } from '../interfaces/current-user';
import { IDecodedToken } from '../interfaces/i-decoded-token';
import { jwtDecode } from 'jwt-decode';
import { IVerify } from '../interfaces/i-verify';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  onLogin(data: ILogin): Observable<any> {
    return this.http.post('Users/Login', data);
  }
  getProfile() {
    let token = localStorage.getItem('PMSToken');
    if (token) {
      let userDecode = jwtDecode<IDecodedToken>(token);
      localStorage.setItem('userRole', userDecode.userGroup);
    }
  }

  //get Current User
  getCurrentUserData(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>('Users/currentUser');
  }

  //Get User Role
  getRole(): string | null {
    return localStorage.getItem('userRole') || null;
  }

  // logout
  logout() {
    localStorage.removeItem('PMSToken');
    localStorage.removeItem('userRole');
    this.router.navigate(['/auth/login']);
  }

  onRegister(data: FormData): Observable<any> {
    return this.http.post('Users/Register', data);
  }
  onVerifyAccount(data: IVerify): Observable<any> {
    return this.http.put('users/verify', data);
  }
  onChangePassword(data: FormData): Observable<any> {
    return this.http.put('Users/ChangePassword', data);
  }
}
