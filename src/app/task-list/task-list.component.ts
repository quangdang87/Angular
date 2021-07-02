import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddNewTaskService } from '../services/add-new-task.service';
import { Task } from '../model/task';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  constructor(private AddNewTaskService: AddNewTaskService) {}
  @Input() taskList: Task[] = [];
  @Output() taskListChange = new EventEmitter<Task[]>();
  edit: any = {
    _id: '',
    editing: false,
  };
  newTask = '';
  ngOnInit(): void {
    this.AddNewTaskService.getAllTasks().subscribe((data: any) => {
      if (data) {
        this.taskList = data.data;
        this.taskListChange.emit(data.data);
      }
    });
  }

  editTask(_id: string): void {
    this.edit = {
      _id,
      editting: true,
    };
  }
  saveEdit(): void {
    const task: Task = {
      _id: this.edit._id,
      name: this.newTask,
    };
    this.AddNewTaskService.editTask(task).subscribe(
      (data: any) => {
        let current_task = this.taskList.find((t: Task) => t._id === task._id);
        if (current_task) {
          current_task.name = this.newTask;
        }
        this.newTask = '';
        this.edit = {
          _id: '',
          editting: false,
        };
      },
      (err) => {
        console.log(err);
      }
    );
  }
  deleteTask(_id: string): void {
    this.AddNewTaskService.deleteTask(_id).subscribe((data: any) => {
      this.taskList = this.taskList.filter((task: Task) => task._id !== _id);
      this.taskListChange.emit(this.taskList);
    });
  }
}
