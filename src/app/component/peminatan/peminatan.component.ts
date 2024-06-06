import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/service/auth.service';

import { User } from 'src/app/model/user';

@Component({
  selector: 'app-peminatan',
  templateUrl: './peminatan.component.html',
  styleUrls: ['./peminatan.component.css'],
})
export class PeminatanComponent implements OnInit {
  decodedToken: any;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.decodedToken = this.authService.decodeToken();
  }
}
