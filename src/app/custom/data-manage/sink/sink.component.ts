import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SinkService } from './sink.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-user',
  templateUrl: './sink.component.html'
})
export class SinkComponent implements OnInit, AfterViewInit {

  constructor(private desenRuleService: SinkService) { }
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
        title: 'JSON配置内容',
        type: 'string',
        width: "200px",
      },
      format_type: {
        title: '格式类型',
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
