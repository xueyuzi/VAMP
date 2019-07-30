import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SourceService } from './source.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-user',
  templateUrl: './source.component.html'
})
export class SourceComponent implements OnInit, AfterViewInit {

  constructor(private desenRuleService: SourceService) { }
  settings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: '名称',
        type: 'string',
      },
      type: {
        title: '类型',
        type: 'string',
      },
      content: {
        title: 'JSON是的配置内容',
        type: 'string',
        width: "200px",
      },
      formatType: {
        title: '格式内容',
        type: 'string',
      },
      formatContent: {
        title: '格式化配置',
        type: 'string',
      },
      timeField: {
        title: '时间属性',
        type: 'string',
      },
      idField: {
        title: '事件ID属性',
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

  delUser(id: number) {
    this.desenRuleService.del(id).subscribe(res => { });
  }
}
