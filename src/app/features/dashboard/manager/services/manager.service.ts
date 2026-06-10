import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IPerson,
  IProject,
  IProjectPayload,
  IResponse,
  ITask,
  ITaskPayload,
  IUserscount,
} from '../interfaces/manger.interface';
import { ITasksCount } from 'src/app/shared/Interfaces/general';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private http = inject(HttpClient);

  //Get Users Statics for Manager
  getUsersCount(): Observable<IUserscount> {
    return this.http.get<IUserscount>('Users/count');
  }

  // Project Services
  createProject(data: IProjectPayload): Observable<IProject> {
    return this.http.post<IProject>('Project', data);
  }
  getProjectById(id: number): Observable<IProject> {
    return this.http.get<IProject>(`Project/${id}`);
  }

  updateproject(id: number, data: IProjectPayload): Observable<IProject> {
    return this.http.put<IProject>(`Project/${id}`, data);
  }

  getProjectList(
    pageNumber: number,
    pageSize: number,
    searchQuery?: string,
  ): Observable<IResponse<IProject>> {
    return this.http.get<IResponse<IProject>>('Project/manager', {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
        searchQuery: searchQuery ? searchQuery : '',
      },
    });
  }
  getUsersList(pageNumber: number, pageSize: number) {
    return this.http.get<IResponse<IPerson>>('Users/Manager', {
      params: {
        pageNumber,
        pageSize,
      },
    });
  }
  //Tasks Services
  getTasks(pageNumber: number, pageSize: number): Observable<IResponse<ITask>> {
    return this.http.get<IResponse<ITask>>('Task/manager', {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
  }

  createTask(data: ITaskPayload): Observable<ITask> {
    return this.http.post<ITask>('Task', data);
  }
  getTaskById(id: number): Observable<ITask> {
    return this.http.get<ITask>(`Task/${id}`);
  }

  updateTask(id: number, data: ITaskPayload): Observable<ITask> {
    return this.http.put<ITask>(`Task/${id}`, data);
  }
}
