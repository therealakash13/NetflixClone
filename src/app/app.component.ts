import { Component, WritableSignal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isLoggedIn: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    if (sessionStorage.getItem('LoggedInUser')) {
      this.isLoggedIn.update(() => true);
      console.log('User is logged in');
    } else {
      console.log('User is not logged in');
    }
  }
}
