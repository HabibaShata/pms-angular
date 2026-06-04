import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statics-card',
  templateUrl: './statics-card.component.html',
  styleUrls: ['./statics-card.component.scss']
})
export class StaticsCardComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() icon: string = '';
  @Input() bgColor: string = '';
  @Input() imageBgColor: string = '';
}
