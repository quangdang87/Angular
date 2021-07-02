import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}
  isLoggedIn: boolean = false;
  ngOnInit(): void {
    //check service to make sure user loggedIn
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
    }
  }
  logOut = () => {
    localStorage.removeItem('token');
  };
}
