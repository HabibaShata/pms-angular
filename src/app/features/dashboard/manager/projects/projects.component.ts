import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Iproject, IResponse, ITask } from '../interfaces/manger.interface';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  forkJoin,
  map,
  of,
  Subject,
} from 'rxjs';
import { ManagerService } from '../services/manager.service';

type ProjectRow = Iproject & { numUsers: number };

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'title',
    'Statues',
    'Num Users',
    'Num Tasks',
    'Date Created',
    'Actions',
  ];
  dataSource: MatTableDataSource<ProjectRow> = new MatTableDataSource();
  private searchSubject = new Subject<string>();
  private _managerService = inject(ManagerService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSize: number = 10;
  pageNumber: number = 1;
  length: number = 0;
  searchQuery: string = '';
  isLoading: boolean = false;

  // constructor(private _managerService: ManagerService) {}
  ngOnInit(): void {
    this.fetchData();
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.pageNumber = 1;
        this.searchQuery = (value as string).trim();
        this.fetchData();
      });
  }
  fetchData() {
    this.isLoading = true;

    const tasks$ = this._managerService.getTasks(1, 1000).pipe(
      catchError((err) => {
        console.error('Failed to load tasks for projects', err);
        return of({
          pageNumber: 1,
          pageSize: 0,
          data: [],
          totalNumberOfRecords: 0,
          totalNumberOfPages: 0,
        } as IResponse<ITask>);
      }),
    );

    forkJoin({
      projects: this._managerService.getProjectList(
        this.pageNumber,
        this.pageSize,
        this.searchQuery,
      ),
      tasks: tasks$,
    })
      .pipe(
        map(({ projects, tasks }) => {
          const projectIds = (projects.data || []).map((p: any) => p.id);
          const taskData = tasks?.data || [];
          const filteredTasks = taskData.filter(
            (t: any) => t?.project && projectIds.includes(t.project.id),
          );
          const counts = this.getNumUsersPerProject(filteredTasks);

          return {
            ...projects,
            data: (projects.data as Iproject[]).map((p: Iproject) => ({
              ...p,
              numUsers: counts.get(p.id) ?? 0,
            })),
          } as IResponse<ProjectRow>;
        }),
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: (res: IResponse<ProjectRow>) => {
          this.length = res.totalNumberOfRecords;
          this.pageSize = res.pageSize;
          this.pageNumber = res.pageNumber;
          this.dataSource.data = res.data;
        },
        error: (err: any) => {
          console.error('Failed to load project data', err);
          this.isLoading = false;
        },
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchData();
  }
  // من الـ tasks response، استخرجي unique employees per project
  getNumUsersPerProject(tasks: any[]): Map<number, number> {
    const projectEmployeeMap = new Map<number, Set<number>>();

    tasks.forEach((task) => {
      if (task.employee && task.project) {
        const projectId = task.project.id;

        if (!projectEmployeeMap.has(projectId)) {
          projectEmployeeMap.set(projectId, new Set());
        }
        projectEmployeeMap.get(projectId)!.add(task.employee.id);
      }
    });

    // حوّلي لـ Map<projectId, count>
    const result = new Map<number, number>();
    projectEmployeeMap.forEach((employeeSet, projectId) => {
      result.set(projectId, employeeSet.size);
    });

    return result;
  }
}
