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
import { FormControl } from '@angular/forms';

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
}
