import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AgentService } from './agent.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';
import { DesenRuleService } from '../desenRule/desenRule.service';
import { JsonEditorService } from '../../../common/json-editor.service';

@Component({
  selector: 'ngx-user',
  templateUrl: './agent.component.html'
})
export class AgentComponent implements OnInit {

  constructor(private agentService: AgentService,
    private desenRuleService: DesenRuleService,
    private jsonEditorService: JsonEditorService) { }
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
        width: "20%",
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
    pager: {
      perPage: 10
    }
  }
  isEdit: boolean = false;
  user: any = {};
  type: string;
  agentSource: ServerDataSource;
  dRuleList: Array<any>;
  desen_rule_id: any = []
  ngOnInit() {
    this.agentSource = this.agentService.getList();
    this.desenRuleService.getList().subscribe(
      list => this.dRuleList = list
    )
  }

  setEditor() {
    setTimeout(() => {
      this.jsonEditorService.createEditor("agent-json-editor");
      this.jsonEditorService.setValue(this.user.agentConfig);
    }, 50)
  }

  showNew() {
    this.type = "add";
    this.user = { desen_rule_id: [] };
    this.isEdit = true;
    this.setEditor();
  }
  showEdit($event) {
    this.type = "edit";
    this.agentService.getAgent($event.data.id).subscribe(
      data => this.user = data
    )

    this.isEdit = true;
    this.setEditor();
  }

  saveUser() {

    if (this.type === "edit") {
      this.agentService.save(this.user).subscribe(res => { this.isEdit = false; this.agentSource.refresh(); });
    }
    if (this.type === "add") {
      this.agentService.add(this.user).subscribe(res => { this.isEdit = false; this.agentSource.refresh() });

    }
  }

  delUser(id: number) {
    this.agentService.del(id).subscribe(res => { });
  }

  changeDesen(event) {
    console.log(this.desen_rule_id)
  }
}
