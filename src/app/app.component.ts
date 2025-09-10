import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AutoCompleteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'project';
}
