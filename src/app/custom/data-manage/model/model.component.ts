import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModelService } from './model.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {JsonEditorService} from "../../../common/json-editor.service";

@Component({
  selector: 'ngx-user',
  templateUrl: './model.component.html'
})
export class ModelComponent implements OnInit, AfterViewInit {

  constructor(private desenRuleService: ModelService,
              private jsonEditorService: JsonEditorService) { }
  settings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      tableName: {
        title: '表名',
        type: 'string',
      },
      sourceId: {
        title: '数据源',
        type: 'string',
      },
      tableFields: {
        title: '数据结构',
        type: 'string',
        width: "35%",
      },
      description: {
        title: '描述',
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
    this.setEditor();
  }
  showEdit($event) {
    this.type = "edit";
    this.user = $event.data;
    this.isEdit = true;
    this.setEditor();
  }

  saveUser() {
    this.user.tableFields = this.jsonEditorService.getValue();
    if (this.type === "edit") {
      this.desenRuleService.save(this.user).subscribe(res => { this.isEdit=false;this.userCondition.next()});
    }
    if (this.type === "add") {
      this.desenRuleService.add(this.user).subscribe(res => { this.isEdit=false;this.userCondition.next()});

    }
  }

  delUser($event) {
    this.desenRuleService.del($event.data.id).subscribe(res => {this.userCondition.next()});
  }

  setEditor() {
    setTimeout(() => {
      this.jsonEditorService.createEditor("agent-json-editor");
      this.jsonEditorService.setValue(this.user.tableFields);
    }, 50)
  }
}
