import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusEnum } from 'src/app/core/enums/general.enum';
import {
  IProject,
  IResponse,
  IResponseProjects,
  ITask,
} from '../interfaces/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);

  //Task?status=ToDo&pageSize=1000&pageNumber=1
  getTasksByStatus(
    currentStatus: StatusEnum,
    pageSize: number,
    pageNumber: number,
  ): Observable<IResponse<ITask>> {
    return this.http.get<IResponse<ITask>>('Task', {
      params: {
        status: currentStatus,
        pageSize: pageSize,
        pageNumber: pageNumber,
      },
    });
  }
  //Task/2603/change-status
  changeTaskStatus(taskId: number, updatedStatus: StatusEnum) {
    return this.http.put<IResponse<ITask>>(`Task/${taskId}/change-status`, {
      status: updatedStatus,
    });
  }
  //Project/employee?pageSize=1000&pageNumber=1
  getEmployeeProjects(
    searchName: string,
    pageSize: number,
    pageNumber: number,
  ): Observable<IResponse<IResponseProjects>> {
    return this.http.get<IResponse<IResponseProjects>>('Project/employee', {
      params: {
        pageSize: pageSize,
        pageNumber: pageNumber,
      },
    });
  }
}
