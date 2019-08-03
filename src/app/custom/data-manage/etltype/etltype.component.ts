import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EtltypeService } from './etltype.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {JsonEditorService} from "../../../common/json-editor.service";

@Component({
  selector: 'ngx-user',
  templateUrl: './etltype.component.html'
})
export class EtltypeComponent implements OnInit, AfterViewInit {

  constructor(private desenRuleService: EtltypeService,
              private jsonEditorService: JsonEditorService) { }
  settings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      etlType: {
        title: '日志类型',
        type: 'string',
      },
      bodyType: {
        title: '消息格式',
        type: 'string',
      },
      timeFormat: {
        title: '日期格式',
        type: 'string',
        width: "35%",
      },
      timeLocale: {
        title: '日期地区',
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
  }
  showEdit($event) {
    this.type = "edit";
    this.user = $event.data;
    this.isEdit = true;
  }

  saveUser() {
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


}
