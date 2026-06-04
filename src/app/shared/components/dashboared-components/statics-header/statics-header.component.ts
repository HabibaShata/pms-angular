import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statics-header',
  templateUrl: './statics-header.component.html',
  styleUrls: ['./statics-header.component.scss']
})
export class StaticsHeaderComponent {
  @Input() title: string = '';
  @Input() description: string = '';
}
