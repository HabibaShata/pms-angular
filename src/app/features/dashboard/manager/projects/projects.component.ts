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
import { IProject, IResponse } from '../interfaces/manger.interface';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'title',
    'Statues',
    'Num Tasks',
    'Date Created',
    'Actions',
  ];
  dataSource: MatTableDataSource<IProject> = new MatTableDataSource();
  private searchSubject = new Subject<string>();
  private _managerService = inject(ManagerService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSize: number = 10;
  pageNumber: number = 1;
  length: number = 0;
  searchQuery: string = '';
  isLoading: boolean = false;

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

    this._managerService
      .getProjectList(this.pageNumber, this.pageSize)
      .subscribe({
        next: (res: IResponse<IProject>) => {
          console.log('projects response:', res.data[1].task.length);
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
  private configureDataSource(): void {
    this.dataSource.sortingDataAccessor = (item, property) => {
      console.log(item, property);
      if (property) {
        return (item as any)[property] ?? '';
      }
    };
  }
}
