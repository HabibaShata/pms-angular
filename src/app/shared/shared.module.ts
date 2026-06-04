import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HeaderComponent } from './components/Layout/header/header.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { SidebarComponent } from './components/Layout/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { StaticsCardComponent } from './components/dashboared-components/statics-card/statics-card.component';
import { HomeHeaderComponent } from './components/dashboared-components/home-header/home-header.component';
import { StaticsHeaderComponent } from './components/dashboared-components/statics-header/statics-header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { EmptyStatusComponent } from './components/empty-status/empty-status.component';
import { UsersChartComponent } from './components/dashboared-components/users-chart/users-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

const shared = [
  CommonModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatDividerModule,
  MatMenuModule,
  MatBadgeModule,
  FormsModule,
  NgApexchartsModule
];

@NgModule({
  declarations: [
    NotFoundPageComponent,
    AuthHeaderComponent,
    ChangePasswordComponent,
    HeaderComponent,
    SidebarComponent,
    StaticsCardComponent,
    HomeHeaderComponent,
    StaticsHeaderComponent,
    LoaderComponent,
    EmptyStatusComponent,
    UsersChartComponent,
  ],

  imports: [shared, RouterModule],
  exports: [
    shared,
    AuthHeaderComponent,
    ChangePasswordComponent,
    HeaderComponent,
    SidebarComponent,
    StaticsCardComponent,
    HomeHeaderComponent,
    StaticsHeaderComponent,
    LoaderComponent,
    EmptyStatusComponent,
    UsersChartComponent,
  ],
})
export class SharedModule {}
