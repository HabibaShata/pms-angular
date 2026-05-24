import { NgModule } from '@angular/core';

import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
const shared = [MatButtonModule, MatIconModule];

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [shared],
  exports: [shared],
})
export class SharedModule {}
