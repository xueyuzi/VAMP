import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AgenthbService } from './agenthb.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-user',
  templateUrl: './agenthb.component.html'
})
export class AgenthbComponent implements OnInit, AfterViewInit {

  constructor(private agenthbService: AgenthbService) { }
  settings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      agentId: {
        title: 'agentId',
        type: 'string',
      },
      sysCpu: {
        title: 'sysCpu',
        type: 'string',
      },
      pid: {
        title: "pid",
        type: "string",
      },
      eps: {
        title: 'Eps',
        type: 'string',
      },
      cpu: {
        title: 'cpu',
        type: 'string',
      },
      mem: {
        title: 'mem',
        type: 'string',
      },
      fh: {
        title: 'fh',
        type: 'string',
      },
      createAt: {
        title: 'createAt',
        type: 'text',
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,

    }
  }
  isEdit: boolean = false;
  user: any = {};
  type: string;
  userList: Observable<any>;
  userCondition = new Subject<any>();
  ngOnInit() {
    this.userList = this.userCondition.pipe(
      switchMap(condition => this.agenthbService.getList(condition)),
    )
  }
  ngAfterViewInit() {
    this.userCondition.next({});
  }
  showNew() {
    this.type = "add";
    this.user = {};
    this.isEdit = true;
  }
  showEdit($event) {
    this.type = "edit";
    this.user = $event.data;
    this.isEdit = true;
  }


}
