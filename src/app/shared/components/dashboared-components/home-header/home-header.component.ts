import { Component, inject, OnInit } from '@angular/core';
import { ICurrentUser } from 'src/app/features/auth/interfaces/auth';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  private authService = inject(AuthService);
  currentUser!: ICurrentUser;

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.authService.getCurrentUserData().subscribe({
      next: (res: ICurrentUser) => {
        this.currentUser = res
      },
      error: (err) => {
        console.log(err)
      },
    })
  }

}
