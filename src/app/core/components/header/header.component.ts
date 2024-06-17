import { Component, inject } from '@angular/core';
import { SignoutService } from '../../../shared/services/signout.service';
import { NgClass, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  route = inject(Router);
  auth = inject(SignoutService);

  userName: string = '';
  userProfilePhoto: string = '';
  userEmail: string = '';
  isLoggedIn: boolean = false;

  signOut() {
    sessionStorage.removeItem('LoggedInUser');
    this.auth.signOut();
    this.route.navigate(['/']);
    this.isLoggedIn = false;
  }

  headerData() {
    if (sessionStorage.getItem('LoggedInUser')) {
      this.userName = JSON.parse(sessionStorage.getItem('LoggedInUser')!).name;
      this.userProfilePhoto = JSON.parse(
        sessionStorage.getItem('LoggedInUser')!
      ).picture;
      this.userEmail = JSON.parse(
        sessionStorage.getItem('LoggedInUser')!
      ).email;
    } else {
      this.isLoggedIn = false;
    }
  }

  ngOnInit() {
    this.isLoggedIn = true;
    this.headerData();
  }
}
