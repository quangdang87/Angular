import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class AddNewTaskService {
  constructor(private http: HttpClient) {}
  url: string = 'http://localhost:5000/tasks';

  getAllTasks() {
    //read token
    let token: string | null = localStorage.getItem('token');
    if (!token) token = '';
    return this.http.get<Task[]>(this.url, {
      headers: new HttpHeaders().set('x-auth-token', token),
    });
  }
  addNewTasks(task: any): Observable<Task> {
    let token: string | null = localStorage.getItem('token');
    if (!token) token = '';
    return this.http.post<Task>(this.url, task, {
      headers: new HttpHeaders().set('x-auth-token', token),
    });
  }
  deleteTask(_id: string) {
    let token: string | null = localStorage.getItem('token');
    if (!token) token = '';
    return this.http.delete(`${this.url}/?_id=${_id}`, {
      headers: new HttpHeaders().set('x-auth-token', token),
    });
  }
  editTask(task: Task) {
    let token: string | null = localStorage.getItem('token');
    if (!token) token = '';
    return this.http.put(this.url, task, {
      headers: new HttpHeaders().set('x-auth-token', token),
    });
  }
}
