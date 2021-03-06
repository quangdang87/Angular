import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  taskList: Task[] = [];

  addTask = (t: Task): void => {
    this.taskList.push(t);
    console.log(this.taskList);
  };
  ngOnInit() {}
}
