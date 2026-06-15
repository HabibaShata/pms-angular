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
import { IProject, IResponse } from '../../interfaces/manger.interface';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ManagerService } from '../../services/manager.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewDialogComponent } from '../../../../../shared/components/view-dialog/view-dialog.component';
import { DeleteDialogComponent } from '../../../../../shared/components/delete-dialog/delete-dialog.component';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements AfterViewInit, OnInit {
  displayedAllProjectsColumns = [
    'title',
    'Statues',
    'Manager Name',
    'Date Created',
  ];
  displayedColumns = [
    'title',
    'Statues',
    'Num Tasks',
    'Date Created',
    'Actions',
  ];
  allProjectsDataSource: MatTableDataSource<IProject> =
    new MatTableDataSource<IProject>([]);
  myProjectsDataSource: MatTableDataSource<IProject> =
    new MatTableDataSource<IProject>([]);

  currentTab: number = 0;

  pageSize: number = 10;
  pageNumber: number = 1;
  length: number = 0;
  searchQuery: string = '';
  isLoading: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private searchSubject = new Subject<string>();
  private _managerService = inject(ManagerService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.configureDataSource();
    this.featchAllProjects();
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.pageNumber = 1;
        this.searchQuery = (value as string).trim();

        if (this.currentTab === 0) {
          this.featchAllProjects();
        } else {
          this.fetchManagerProjectsData();
        }
      });
  }
  fetchManagerProjectsData() {
    this.isLoading = true;

    this._managerService
      .getManagerProjects(this.pageNumber, this.pageSize, this.searchQuery)
      .subscribe({
        next: (res: IResponse<IProject>) => {
          this.myProjectsDataSource.data = res.data;

          setTimeout(() => {
            if (this.sort) {
              this.myProjectsDataSource.sort = this.sort;
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
  featchAllProjects() {
    this.isLoading = true;
    this._managerService
      .getAllProjects(this.pageNumber, this.pageSize, this.searchQuery)
      .subscribe({
        next: (res: IResponse<IProject>) => {
          this.allProjectsDataSource.data = res.data;

          setTimeout(() => {
            if (this.sort) {
              this.allProjectsDataSource.sort = this.sort;
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
    this.allProjectsDataSource.sort = this.sort;
    this.myProjectsDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allProjectsDataSource.filter = filterValue.trim().toLowerCase();
    this.myProjectsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    if (this.currentTab === 0) {
      this.featchAllProjects();
    } else {
      this.fetchManagerProjectsData();
    }
  }
  private configureDataSource(): void {
    const sortingAccessor = (item: IProject, property: string) => {
      switch (property) {
        case 'Num Tasks':
          return item.task?.length;
        case 'Date Created':
          return item.creationDate;
        case 'Manager Name':
          return item.manager?.userName;
        default:
          return (item as any)[property];
      }
    };

    this.allProjectsDataSource.sortingDataAccessor = sortingAccessor;
    this.myProjectsDataSource.sortingDataAccessor = sortingAccessor;
  }
  onTabChange(event: MatTabChangeEvent) {
    this.currentTab = event.index;
    this.pageNumber = 1;
    this.searchQuery = '';

    if (this.currentTab === 0) {
      this.featchAllProjects();
    } else {
      this.fetchManagerProjectsData();
    }
  }

  //view-project
  openViewDialog(item: IProject) {
    this.dialog.open(ViewDialogComponent, {
      data: {
        type: 'project',
        item: item,
      },
      width: '600px',
    });
  }

  //delete-project
  openDeleteDialog(item: IProject) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        name: item.title,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._managerService.deleteProject(item.id).subscribe({
          next: () => {
            if (this.currentTab === 0) {
              this.featchAllProjects();
            } else {
              this.fetchManagerProjectsData();
            }
          },
          error: (err) => {
            console.error('Delete failed', err);
          },
        });
      }
    });
  }
}
