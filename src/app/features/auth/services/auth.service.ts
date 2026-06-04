import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';
import {
  ICurrentUser,
  IDecodedToken,
  ILogin,
  ILoginResponse,
  IVerify,
} from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private currentUserSubject = new BehaviorSubject<ICurrentUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  onLogin(data: ILogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('Users/Login', data);
  }

  getProfile() {
    let token = localStorage.getItem('PMSToken');
    if (token) {
      let userDecode = jwtDecode<IDecodedToken>(token);
      localStorage.setItem('userGroup', userDecode.userGroup);
    }
  }

  //====== get logged person Data ======
  getCurrentUserData(): Observable<ICurrentUser> {
    return this.http.get<ICurrentUser>('Users/currentUser');
  }

  getRole(): string | null {
    return localStorage.getItem('userGroup') || null;
  }

  logout() {
    localStorage.removeItem('PMSToken');
    localStorage.removeItem('userGroup');
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

  onForgotPass(data: { email: string }): Observable<any> {
    return this.http.post('Users/Reset/Request', data);
  }

  onResetPass(data: FormData): Observable<any> {
    return this.http.post('Users/Reset', data);
  }
}
