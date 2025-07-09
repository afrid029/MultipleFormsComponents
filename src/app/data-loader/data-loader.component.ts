import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-loader',
  imports: [CommonModule],
  templateUrl: './data-loader.component.html',
  styleUrl: './data-loader.component.scss',
})
export class DataLoaderComponent {
  @Input() dataLoaded: boolean = false;
}
