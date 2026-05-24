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

const shared = [
  ReactiveFormsModule,
  MatButtonModule, 
  MatIconModule, 
  MatSelectModule, 
  MatInputModule, 
  MatFormFieldModule,
  MatProgressSpinnerModule 
];

@NgModule({
  declarations: [NotFoundPageComponent, AuthHeaderComponent],
  imports: [shared],
  exports: [shared, AuthHeaderComponent],
})
export class SharedModule {}
