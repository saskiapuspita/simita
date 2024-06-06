import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  decodedToken: any;

  constructor(
    // private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.decodedToken = this.authService.decodeToken();
  }
}
