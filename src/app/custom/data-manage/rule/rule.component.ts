import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RuleService } from './rule.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';
import { JsonEditorService } from '../../../common/json-editor.service';

@Component({
  selector: 'ngx-user',
  templateUrl: './rule.component.html'
})
export class RuleComponent implements OnInit {

  constructor(private desenRuleService: RuleService,
              private jsonEditorService: JsonEditorService) { }
  settings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      categoryId: {
        title: '分类ID',
        type: 'string',
      },
      type: {
        title: '类型',
        type: 'string',
      },
      ruleName: {
        title: '规则名称',
        type: 'string',
        width: "200px",
      },
      ruleNo: {
        title: '规则编号',
        type: 'string',
      },
      status: {
        title: '状态',
        type: 'string',
      },
      parallelism: {
        title: '并发度',
        type: 'string',
      },
      sourceId: {
        title: '数据源',
        type: 'string',
      },
      ruleContent: {
        title: '规则明细',
        type: 'string',
        width: "30%",
      }
    },
    actions: {
      add: false,
      edit: false,
      columnTitle: "操作",
      position: "right"
    },
    delete: {
      confirmDelete: true,
      deleteButtonContent: `<i class="icon ion-trash-a"></i>`
    },
    pager: {
      perPage: 10
    },
    hideSubHeader: true
  }
  isEdit: boolean = false;
  user: any = {};
  type: string;
  userList: Observable<any>;
  userCondition = new Subject<any>();
  agentSource: ServerDataSource;
  ngOnInit() {
    this.agentSource = this.desenRuleService.getList();
  }
  ngAfterViewInit() {
    this.userCondition.next({});
  }
  showNew() {
    this.type = "add";
    this.user = {};
    this.isEdit = true;
    this.setEditor();
  }
  showEdit($event) {
    this.type = "edit";
    this.user = $event.data;
    this.isEdit = true;
    this.setEditor();
  }

  saveUser() {
    this.user.ruleContent = this.jsonEditorService.getValue();
    if (this.type === "edit") {
      this.desenRuleService.save(this.user).subscribe(res => { this.isEdit=false;this.agentSource.refresh();});
    }
    if (this.type === "add") {
      this.desenRuleService.add(this.user).subscribe(res => { this.isEdit=false;this.agentSource.refresh();});

    }
  }

  delUser($event) {
    this.desenRuleService.del($event.data.id).subscribe(
      res => {
        this.agentSource.refresh();
      });
  }

  setEditor() {
    setTimeout(() => {
      this.jsonEditorService.createEditor("agent-json-editor");
      this.jsonEditorService.setValue(this.user.ruleContent);
    }, 50)
  }
}
