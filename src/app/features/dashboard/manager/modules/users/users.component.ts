import { Component, inject, ViewChild } from '@angular/core';
import {
  IPerson,
  IResponse,
  IManager as User,
} from '../../interfaces/manger.interface';
import { ViewDialogComponent } from 'src/app/shared/components/view-dialog/view-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { UsersService } from './services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  displayedColumns: string[] = [
    'userName',
    'status',
    'phoneNumber',
    'email',
    'country',
    'actions',
  ];
  selectedStatus: 'all' | 'active' | 'inactive' = 'all';
  pageSize: number = 10;
  pageNumber: number = 1;
  length: number = 0;
  searchQuery: string = '';
  isLoading: boolean = false;
  usersData: User[] = [];
  searchText: string = '';
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  private searchSubject = new Subject<string>();
  private _usersService = inject(UsersService);
  private dialog = inject(MatDialog);
  private toaster = inject(ToastrService);

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

  fetchData() {
    this.isLoading = true;

    this._usersService.getUsers(this.pageNumber, this.pageSize).subscribe({
      next: (res: IResponse<User>) => {
        this.usersData = res.data;
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

  onStatusFilter(value: 'all' | 'active' | 'inactive') {
    this.selectedStatus = value;
    this.applyCombinedFilter();
  }

  applyCombinedFilter() {
    // Always filter from the original full data
    const filtered = this.usersData.filter((user) => {
      console.log(this.searchText);

      const matchesSearch =
        !this.searchText ||
        user.userName.toLowerCase().includes(this.searchText) ||
        user.email.toLowerCase().includes(this.searchText);

      const matchesStatus =
        this.selectedStatus === 'all' ||
        (this.selectedStatus === 'active' && user.isActivated) ||
        (this.selectedStatus === 'inactive' && !user.isActivated);

      return matchesSearch && matchesStatus;
    });

    this.dataSource.data = filtered;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchText = filterValue.trim().toLowerCase();
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.applyCombinedFilter();
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchData();
  }

  private configureDataSource(): void {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'status':
          return item.isActivated;

        default:
          return (item as any)[property];
      }
    };
  }

  toggleUserStatus(user: User): void {
    const payload = { id: user.id };
    this._usersService.toggleUserStatus(user.id, payload).subscribe({
      next: (res) => {
        this.toaster.success('User status updated successfully');
        this.fetchData();
      },
      error: (err) => {
        console.error('Failed to update user status', err);
      },
    });
  }

  //view-project
  openViewDialog(item: IPerson) {
    this.dialog.open(ViewDialogComponent, {
      data: {
        type: 'user',
        item: item,
      },
      width: '600px',
    });
  }
}
