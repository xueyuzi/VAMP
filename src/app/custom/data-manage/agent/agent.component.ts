import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AgentService } from './agent.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';
import { DesenRuleService } from '../desenRule/desenRule.service';

@Component({
  selector: 'ngx-user',
  templateUrl: './agent.component.html'
})
export class AgentComponent implements OnInit {

  constructor(private agentService: AgentService,private desenRuleService:DesenRuleService) { }
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

    },
    pager:{
      perPage:10
    }
  }
  isEdit: boolean = false;
  user: any = {};
  type: string;
  agentSource: ServerDataSource;
  dRuleList: Array<any>;
  ngOnInit() {
    this.agentSource = this.agentService.getList();
    this.desenRuleService.getList().subscribe(
      list => this.dRuleList = list
    )
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
      this.agentService.save(this.user).subscribe(res => { this.isEdit=false;this.agentSource.refresh();});
    }
    if (this.type === "add") {
      this.agentService.add(this.user).subscribe(res => { this.isEdit=false;this.agentSource.refresh()});

    }
  }

  delUser(id: number) {
    this.agentService.del(id).subscribe(res => { });
  }

  changeDesen(event) {
    this.user.desen_rule_id = event;
  }
}
