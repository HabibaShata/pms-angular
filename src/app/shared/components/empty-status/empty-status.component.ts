import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-status',
  templateUrl: './empty-status.component.html',
  styleUrls: ['./empty-status.component.scss']
})
export class EmptyStatusComponent {
  @Input() elementName: string = 'This filter'
}
