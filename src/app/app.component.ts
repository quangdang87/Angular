import { Component } from '@angular/core';
import { Task } from './model/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // taskList: Task[] = [];
  // addTask = (t: Task): void => {
  //   console.log('addTask function in app component is call');
  //   this.taskList.push(t);
  //   console.log(this.taskList);
  // // };
}
