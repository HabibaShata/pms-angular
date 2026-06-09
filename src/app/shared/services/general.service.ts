import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITasksCount } from '../Interfaces/general';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private http = inject(HttpClient);

  //Get tasks Statics for Employee
  getTasksCount(): Observable<ITasksCount> {
    return this.http.get<ITasksCount>('Task/count');
  }

}
