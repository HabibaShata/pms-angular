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
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { IResponse, ITask } from '../interfaces/manger.interface';
import { ManagerService } from '../services/manager.service';
import { StatusEnum } from 'src/app/core/enums/general.enum';
import { MatDialog } from '@angular/material/dialog';
import { ViewDialogComponent } from '../../../../shared/components/view-dialog/view-dialog.component';
import { DeleteDialogComponent } from '../../../../shared/components/delete-dialog/delete-dialog.component';
type TaskRow = ITask & { numUsers: number };

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'title',
    'status',
    'user',
    'project',
    'creationDate',
    'actions',
  ];
  toppings = new FormControl('');

  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];
  dataSource: MatTableDataSource<ITask> = new MatTableDataSource();
  private searchSubject = new Subject<string>();
  private _managerService = inject(ManagerService);
  private dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSize: number = 10;
  pageNumber: number = 1;
  length: number = 0;
  searchQuery: string = '';
  isLoading: boolean = false;
  status = StatusEnum;

  ngOnInit(): void {
    this.configureDataSource();
    this.fetchData();
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.pageNumber = 1;
        this.searchQuery = (value as string).trim();
        this.fetchData();
      });
  }

  private configureDataSource(): void {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'user':
          return item.employee?.userName ?? '';
        case 'project':
          return item.project?.title ?? '';
        default:
          return (item as any)[property] ?? '';
      }
    };
  }
  fetchData() {
    this.isLoading = true;

    this._managerService.getTasks(this.pageNumber, this.pageSize).subscribe({
      next: (res: IResponse<ITask>) => {
        console.log('Tasks response:', res.data);
        this.dataSource.data = res.data;
        setTimeout(() => {
          if (this.sort) {
            this.dataSource.sort = this.sort;
          }
        });
        this.length = res.totalNumberOfRecords;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load tasks', err);
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

// view-task
  openViewTaskDialog(item: ITask) {
  this.dialog.open(ViewDialogComponent, {
    data: {
      type: 'task',
      item: item
    },
    width: '600px'
  });
}


//delete-task
openDeleteTaskDialog(item: ITask) {
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    width: '550px',
    disableClose: true,
    data: {
      name: item.title
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Delete task confirmed', item.id);

    
    }
  });
}
}
