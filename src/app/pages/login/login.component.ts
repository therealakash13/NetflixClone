declare var google: any;

import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private router = inject(Router);

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response) {
      //decode the response
      const payload = this.decodeToken(response.credential);

      //store the response
      sessionStorage.setItem('LoggedInUser', JSON.stringify(payload));

      //redirect to home page
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:
        '656249677009-b4ul555o5j2cpjio3hkveuhuv0esalan.apps.googleusercontent.com',
      callback: (resp: any) => {
        this.handleLogin(resp);
      },
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      type: 'standard',
      theme: 'filled_blue',
      size: 'large',
      text: 'signin_with',
      shape: 'pill',
      width: 300,
    });
  }
}
