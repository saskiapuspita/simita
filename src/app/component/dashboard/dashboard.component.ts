import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/service/auth.service';

import { User } from 'src/app/model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId!: Pick<User, 'id'>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.userId;
  }
}
