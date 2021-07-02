import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {
    this.authService.isLoggedIn.subscribe((res) => {
      this.isLoggedIn = res;
    });
    this.authService.name.subscribe((res) => {
      this.name = res;
    });
  }
  isLoggedIn: boolean = false;
  name: string = '';
  ngOnInit(): void {
    //check service to make sure user loggedIn
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.isLoggedIn.next(true);
      this.isLoggedIn = true;
    }
  }

  logOut = () => {
    localStorage.removeItem('token');
    this.authService.isLoggedIn.next(false);
    this.authService.name.next('');
    this.router.navigate(['login']);
  };
}
