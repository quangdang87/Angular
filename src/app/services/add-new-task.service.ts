import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Task[]>(this.url);
  }
  addNewTasks(task: any): Observable<Task> {
    return this.http.post<Task>(this.url, task);
  }
  deleteTask(_id: string) {
    return this.http.delete(`${this.url}/?_id=${_id}`);
  }
  editTask(task: Task) {
    return this.http.put(this.url, task);
  }
}
