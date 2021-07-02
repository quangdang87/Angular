import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type NewUser = { name: string; email: string; password: string };
type userInfo = { email: string; password: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  url: string = 'http://localhost:5000/users';

  register = (newUser: NewUser) => {
    return this.http.post<NewUser>(`${this.url}/register`, newUser);
  };

  login = (user: userInfo) => {
    return this.http.post<userInfo>(`${this.url}/login`, user);
  };
}
