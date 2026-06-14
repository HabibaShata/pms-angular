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
import { BlockUserComponent } from 'src/app/shared/components/block-user/block-user.component';

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
  // Full dataset fetched once from server
  allUsersData: User[] = [];
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
    this.fetchAllData();  // HTTP call

    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.searchText = (value as string).trim().toLowerCase();
        this.pageNumber = 1;
        if (this.paginator) this.paginator.firstPage();
        this.applyFilterAndPaginate();  // no HTTP call
      });
  }

  applyFilterAndPaginate() {
    // Filter from full dataset
    const filtered = this.allUsersData.filter((user) => {
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

    // Update paginator total to filtered count
    this.length = filtered.length;

    // Slice for current page
    const startIndex = (this.pageNumber - 1) * this.pageSize;
    this.dataSource.data = filtered.slice(startIndex, startIndex + this.pageSize);
  }

  fetchAllData() {
    this.isLoading = true;

    this._usersService.getAllUsers().subscribe({
      next: (res: IResponse<User>) => {
        this.allUsersData = res.data;   // store full dataset once
        this.applyFilterAndPaginate();  // apply initial filter + paginate
        this.isLoading = false;

        setTimeout(() => {
          if (this.sort) this.dataSource.sort = this.sort;
        });
      },
      error: (err) => {
        console.error('Failed to load users', err);
        this.isLoading = false;
      },
    });
  }

  applyFilter(event: Event) {
    this.searchText = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.pageNumber = 1;
    if (this.paginator) this.paginator.firstPage();
    this.applyFilterAndPaginate();   // no HTTP call
  }

  onStatusFilter(value: 'all' | 'active' | 'inactive') {
    this.selectedStatus = value;
    this.pageNumber = 1;
    if (this.paginator) this.paginator.firstPage();
    this.applyFilterAndPaginate();   // no HTTP call
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchAllData();
  }

  private configureDataSource(): void {
    this.dataSource.sortingDataAccessor = (item, property) => {
      console.log(item, property);
      if (property) {
        return (item as any)[property] ?? '';
      }
    };
  }

  toggleUserStatus(user: User): void {
    const payload = { id: user.id };
    this._usersService.toggleUserStatus(user.id, payload).subscribe({
      next: (res) => {
        this.toaster.success('User status updated successfully');
        this.fetchAllData();
      },
      error: (err) => {
        console.error('Failed to update user status', err);
      },
    });
  }

  openConfirmStatusDialog(row: any) {
  const dialogRef = this.dialog.open(BlockUserComponent, {
    width: '400px',
    data: row
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.toggleUserStatus(row);
    }
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
