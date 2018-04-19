import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { FirebaseTaskService } from '../../services/firebaseTask/firebase-task.service';
import { Task } from '../../services/firebaseTask/task';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FirebaseTaskmodalComponent } from './firebase-taskmodal/firebase-taskmodal.component';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-firebase-task',
  templateUrl: './firebase-task.component.html',
  styleUrls: ['./firebase-task.component.css']
})

export class FirebaseTaskComponent implements OnInit, AfterViewInit {


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  @Input() tasks: Task[];

  bsModalRef: BsModalRef;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private taskSer: FirebaseTaskService, private modalService: BsModalService) { }

  openTaskModal(task) {
    const initialState = {
      dtTrigger: this.dtTrigger,
      tasksdetails: {
        key: task.key, content: task.content, clientname: task.clientname
      },
    };
    this.bsModalRef = this.modalService.show(FirebaseTaskmodalComponent, { initialState });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      columns: [
        { orderable: false, searchable: false },
        { data: 'content', name: 'content' },
        { data: 'clientname', name: 'clientname' },
        { orderable: false, searchable: false }],
      retrieve: true
    };

    this.taskSer.getTaskList().subscribe(respons => {
      this.tasks = respons;
      this.rerender();
    });
  }

  deleteTask(key) {
    this.taskSer.deleteTask(key).subscribe();
  }

  toggleDone(task): void {
    this.taskSer.toggleDone(task.key, { done: !task.done }).subscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}

