import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authServer: AuthService, private router: Router) {}
  email = '';
  password = '';
  ngOnInit(): void {}

  onSubmit = () => {
    console.log('this.email: ', this.email);
    this.authServer
      .login({ email: this.email, password: this.password })
      .subscribe(
        (data: any) => {
          localStorage.setItem('token', data.token);
          this.router.navigate(['tasks']);
        },
        (err) => {
          console.log(err);
        }
      );
  };
}
