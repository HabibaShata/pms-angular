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

import { StatusEnum } from 'src/app/core/enums/general.enum';
import { MatDialog } from '@angular/material/dialog';

import { FormControl } from '@angular/forms';
import { IResponse, ITask } from '../../interfaces/manger.interface';
import { ManagerService } from '../../services/manager.service';
import { MatSelectChange } from '@angular/material/select';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { ViewDialogComponent } from 'src/app/shared/components/view-dialog/view-dialog.component';
import { ToastrService } from 'ngx-toastr';
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
  toppingList: string[] = ['ToDo', 'InProgress', 'Done'];
  pageSize: number = 10;
  pageNumber: number = 1;
  length: number = 0;
  searchQuery: string = '';
  selectedStatusFilter: string = '';
  isLoading: boolean = false;
  status = StatusEnum;
  dataSource: MatTableDataSource<ITask> = new MatTableDataSource();
  private searchSubject = new Subject<string>();
  private _managerService = inject(ManagerService);
  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
    console.log(this.toppings.value);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const searchFilter = filterValue.trim().toLowerCase();
    this.updateDataSourceFilter(searchFilter, this.selectedStatusFilter);
  }

  applySelectFilter(event: MatSelectChange) {
    const selectedStatus = event.value || '';
    this.selectedStatusFilter = selectedStatus;
    const searchInput = document.querySelector(
      'input[matInput]',
    ) as HTMLInputElement;
    const searchFilter = searchInput?.value.trim().toLowerCase() || '';
    this.updateDataSourceFilter(searchFilter, selectedStatus);
  }

  private updateDataSourceFilter(
    searchFilter: string,
    statusFilter: string,
  ): void {
    console.log(searchFilter, statusFilter);

    this.dataSource.filterPredicate = (item: ITask, filter: string) => {
      const statusMatch = !statusFilter || item.status === statusFilter;
      const searchMatch =
        !searchFilter || item.title.toLowerCase().includes(searchFilter);
      return statusMatch && searchMatch;
    };

    this.dataSource.filter = searchFilter + statusFilter;

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchData();
  }

  // view-task
  openViewTaskDialog(item: ITask) {
    this.dialog.open(ViewDialogComponent, {
      data: {
        type: 'task',
        item: item,
      },
      width: '600px',
    });
  }

  //delete-task
  openDeleteTaskDialog(item: ITask) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '550px',
      disableClose: true,
      data: {
        name: item.title,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._managerService.deleteTask(item.id).subscribe({
          next: () => {
            this.toastr.success(
              `This Item is Delated Successfully`,
              '!Success',
            );
            this.fetchData();
          },
          error: (err) => {
            console.error('Delete task failed', err);
          },
        });
      }
    });
  }
}
