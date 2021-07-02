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
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  newUser = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit = () => {
    const { name, email, password } = this.newUser.value;
    console.log('Name: ', name);
    console.log('email: ', email);
    console.log('password: ', password);
    this.auth.register(this.newUser.value).subscribe(
      (data: any) => {
        console.log(data);
        localStorage.setItem('token', data.data);
        this.router.navigate(['/tasks']);
      },
      (err) => {
        console.log('error happened: ', err);
        this.newUser.reset();
        this.router.navigate(['/login']);
      }
    );
  };
}
