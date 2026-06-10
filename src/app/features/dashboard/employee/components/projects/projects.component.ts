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
import {
  IResponse,
  IResponseProjects,
} from '../../interfaces/employee.interface';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { StatusEnum } from 'src/app/core/enums/general.enum';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'title',
    'Descraption',
    'Num Tasks',
    'creation Date',
    'modification Date',
  ];

  dataSource: MatTableDataSource<IResponseProjects> = new MatTableDataSource();
  private searchSubject = new Subject<string>();
  private _EmployeeService = inject(EmployeeService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSize: number = 10;
  pageNumber: number = 1;
  length: number = 0;
  searchQuery: string = '';
  selectedStatusFilter: string = '';
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
  fetchData() {
    this.isLoading = true;
    this._EmployeeService
      .getEmployeeProjects('', this.pageSize, this.pageNumber)
      .subscribe({
        next: (res: IResponse<IResponseProjects>) => {
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
          console.error('Failed to load projects', err);
          this.isLoading = false;
        },
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const searchFilter = filterValue.trim().toLowerCase();
    this.dataSource.filter = searchFilter;

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  private configureDataSource(): void {
    this.dataSource.sortingDataAccessor = (item, property) => {
      console.log(item, property);
      if (property) {
        return (item as any)[property] ?? '';
      }
    };
  }
  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchData();
  }
}
