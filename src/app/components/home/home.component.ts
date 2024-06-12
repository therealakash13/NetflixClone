import { Component, inject } from '@angular/core';
import { SignoutService } from '../../services/signout.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  auth = inject(SignoutService);
  dropdownVisible = false;

  userName = JSON.parse(sessionStorage.getItem('LoggedInUser')!).name;
  userProfilePhoto = JSON.parse(sessionStorage.getItem('LoggedInUser')!)
    .picture;
  userEmail = JSON.parse(sessionStorage.getItem('LoggedInUser')!).email;

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  signOut() {
    sessionStorage.removeItem('LoggedInUser');
    this.auth.signOut();
  }
}
