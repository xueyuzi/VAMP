import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AgentService } from './agent.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-user',
  templateUrl: './agent.component.html'
})
export class AgentComponent implements OnInit, AfterViewInit {

  constructor(private agentService: AgentService) { }
  settings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      agentName: {
        title: '名称',
        type: 'string',
      },
      agentAddress: {
        title: 'IP地址',
        type: 'string',
      },
      agentConfig: {
        title: '配置',
        type: 'string',
        width: "200px",
      },
      agentKey: {
        title: '识别key',
        type: 'string',
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
      switchMap(condition => this.agentService.getList(condition)),
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

  saveUser() {

    if (this.type === "edit") {
      this.agentService.save(this.user).subscribe(res => { this.isEdit=false});
    }
    if (this.type === "add") {
      this.agentService.add(this.user).subscribe(res => { this.isEdit=false});

    }
  }

  delUser(id: number) {
    this.agentService.del(id).subscribe(res => { });
  }
}
