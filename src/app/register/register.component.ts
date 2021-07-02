import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {
    this.auth.isLoggedIn.subscribe((res) => {
      if (res) {
        this.router.navigate(['tasks']);
      }
    });
  }

  ngOnInit(): void {}

  newUser = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit = () => {
    const { name } = this.newUser.value;

    this.auth.register(this.newUser.value).subscribe(
      (data: any) => {
        console.log('registed successed');
        localStorage.setItem('token', data.data);
        this.auth.isLoggedIn.next(true);
        this.auth.name.next(name);
      },
      (err) => {
        console.log('error happened: ', err);
        this.newUser.reset();
        this.router.navigate(['login']);
      }
    );
  };
}
