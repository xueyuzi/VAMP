import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DesenRuleService } from './desenRule.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {JsonEditorService} from "../../../common/json-editor.service";

@Component({
  selector: 'ngx-user',
  templateUrl: './desenRule.component.html'
})
export class DesenRuleComponent implements OnInit, AfterViewInit {

  constructor(private desenRuleService: DesenRuleService,
              private jsonEditorService: JsonEditorService) { }
  settings = {
    columns: {
      desenName: {
        title: '规则名称',
        type: 'string',
      },
      type_name: {
        title: '类型',
        type: 'string',
      },
      patternRegex: {
        title: '匹配规则',
        type: 'string',
        width: "200px",
      },
      desenConfig: {
        title: '脱敏规则配置',
        type: 'string',
      },
      description: {
        title: '规则描述',
        type: 'string',
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
  }
  isEdit: boolean = false;
  user: any = {};
  type: string;
  userList: Observable<any>;
  userCondition = new Subject<any>();
  rule_json: any = {};
  ngOnInit() {
    this.userList = this.userCondition.pipe(
      switchMap(condition => this.desenRuleService.getList(condition)),
    )
  }
  ngAfterViewInit() {
    this.userCondition.next({});
  }

  showNew() {
    this.type = "add";
    this.user = {};
    this.isEdit = true;
    this. rule_json.method = "";
    this. rule_json.flag = "";
    this. rule_json.begin = "";
    this. rule_json.left = "";
    this. rule_json.right = "";
  }
  showEdit($event) {
    this.type = "edit";
    this.user = $event.data;
    this.isEdit = true;
    this. rule_json = JSON.parse(this.user.desenConfig);
  }

  saveUser() {
    this.user.desenConfig=JSON.stringify(this. rule_json);
    if (this.type === "edit") {
      this.desenRuleService.save(this.user).subscribe(res => { this.isEdit=false;this.userCondition.next()});
    }
    if (this.type === "add") {
      this.desenRuleService.add(this.user).subscribe(res => { this.isEdit=false;this.userCondition.next()});

    }
  }

  delUser($event) {
    this.desenRuleService.del($event.data.id).subscribe(res => {this.userCondition.next() });
  }
}
