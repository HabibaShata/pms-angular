import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IProject,
  IProjectPayload,
  ITasksCount,
  IUserscount,
} from '../interfaces/manger.interface';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private http = inject(HttpClient);

  getUsersCount(): Observable<IUserscount> {
    return this.http.get<IUserscount>('Users/count');
  }

  getTasksCount(): Observable<ITasksCount> {
    return this.http.get<ITasksCount>('Task/count');
  }
  createProject(data: IProjectPayload): Observable<IProject> {
    return this.http.post<IProject>('Project', data);
  }
  getProjectById(id: number): Observable<IProject> {
    return this.http.get<IProject>(`Project/${id}`);
  }

  updateproject(id: number, data: IProjectPayload): Observable<IProject> {
    return this.http.put<IProject>(`Project/${id}`, data);
  }
}
