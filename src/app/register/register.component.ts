import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { emailValidator } from '../directives/email-validator.directive';

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
  RegEmail =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  newUser = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      emailValidator(this.RegEmail),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
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
  get name() {
    return this.newUser.get('name');
  }
  get email() {
    return this.newUser.get('email');
  }
  get password() {
    return this.newUser.get('password');
  }
}
