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
      id: {
        title: 'ID',
        type: 'number',
      },
      type: {
        title: '类型',
        type: 'string',
      },
      desenName: {
        title: '规则名称',
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
      switchMap(condition => this.desenRuleService.getList(condition)),
    )
  }
  ngAfterViewInit() {
    this.userCondition.next({});
  }

  setEditor() {
    setTimeout(() => {
      this.jsonEditorService.createEditor("agent-json-editor");
      this.jsonEditorService.setValue(this.user.desenConfig);
    }, 50)
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

    if (this.type === "edit") {
      this.desenRuleService.save(this.user).subscribe(res => { this.isEdit=false;this.userCondition.next()});
    }
    if (this.type === "add") {
      this.desenRuleService.add(this.user).subscribe(res => { this.isEdit=false;this.userCondition.next()});

    }
  }

  delUser(id: number) {
    this.desenRuleService.del(id).subscribe(res => { });
  }
}
