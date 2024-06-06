import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  isAuthenticated = false;
  userDisplayName: any;
  decodedToken: any;

  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
    });

    this.decodedToken = this.authService.decodeToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authService.isUserLoggedIn$.next(false);
    window.location.reload();
  }
}
