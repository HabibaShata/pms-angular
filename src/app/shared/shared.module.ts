import { NgModule } from '@angular/core';

import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
<<<<<<< Updated upstream
=======
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HeaderComponent } from './components/Layout/header/header.component';
>>>>>>> Stashed changes

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { SidebarComponent } from './components/Layout/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
const shared = [
  ReactiveFormsModule,
  MatButtonModule, 
  MatIconModule, 
  MatSelectModule, 
  MatInputModule, 
  MatFormFieldModule,
<<<<<<< Updated upstream
  MatProgressSpinnerModule 
];

@NgModule({
  declarations: [NotFoundPageComponent, AuthHeaderComponent],
  imports: [shared],
  exports: [shared, AuthHeaderComponent],
=======
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatDividerModule,
  MatMenuModule,
  FormsModule
];

@NgModule({
  declarations: [
    NotFoundPageComponent,
    AuthHeaderComponent,
    ChangePasswordComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [shared, RouterModule],
  exports: [shared, AuthHeaderComponent, ChangePasswordComponent, HeaderComponent, SidebarComponent],
>>>>>>> Stashed changes
})
export class SharedModule {}
