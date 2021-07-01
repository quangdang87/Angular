import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../model/task';
import { AddNewTaskService } from '../services/add-new-task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() addTask = new EventEmitter<Task>();

  task: string = '';
  error: boolean = false;
  addNewTask = () => {
    if (this.task !== '' && this.task) {
      this.AddNewTaskService.addNewTasks({ name: this.task }).subscribe(
        (data: any) => {
          this.addTask.emit(data.data);
          this.task = '';
        },
        (err) => {
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 3000);
        }
      );
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 3000);
    }
  };

  constructor(private AddNewTaskService: AddNewTaskService) {}

  ngOnInit(): void {}
}
