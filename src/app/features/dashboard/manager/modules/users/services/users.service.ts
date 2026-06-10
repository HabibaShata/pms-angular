import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  IPerson,
  IResponse,
  IManager as User,
} from '../../../interfaces/manger.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  getUsers(pageNumber: number, pageSize: number): Observable<IResponse<User>> {
    return this.http.get<IResponse<User>>('Users/manager', {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
  }

  getAndFilterLoggedUsers() {}

  AddManager(data: FormData): Observable<any> {
    return this.http.post<IResponse<IPerson>>('Users/create', data);
  }

  getUserData(id: number): Observable<any> {
    return this.http.get<IResponse<IPerson>>(`Users/${id}`);
  }

  toggleUserStatus(id: number, data: { id: number }): Observable<any> {
    return this.http.put(`Users/${id}`, data);
  }
}
