import { Component, inject } from '@angular/core';
import { SignoutService } from '../../../shared/services/signout.service';
import { NgClass } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  route = inject(Router);
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
    this.route.navigate(['/']);
  }
}
