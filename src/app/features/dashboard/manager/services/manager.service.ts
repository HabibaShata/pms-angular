import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITasksCount, IUserscount } from '../interfaces/manger.interface';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private http = inject(HttpClient);

  getUsersCount(): Observable<IUserscount> {
    return this.http.get<IUserscount>('Users/count');
  }

  getTasksCount(): Observable<ITasksCount> {
    return this.http.get<ITasksCount>('Task/count');
  }
}
