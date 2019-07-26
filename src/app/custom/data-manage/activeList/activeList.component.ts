import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActiveListService } from './activeList.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-user',
  templateUrl: './activeList.component.html'
})
export class ActiveListComponent implements OnInit, AfterViewInit {

  constructor(private activeList: ActiveListService) { }
  settings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      listName: {
        title: '名称',
        type: 'string',
      },
      listNo: {
        title: '编号',
        type: 'string',
      },
      type: {
        title: '类型',
        type: 'string',
      },
      status: {
        title: '状态',
        type: 'string',
      },
      maxsize: {
        title: '最大值',
        type: 'string',
      },
      timeout: {
        title: '超时时间',
        type: 'string',
      },
      remark: {
        title: '备注',
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
      switchMap(condition => this.activeList.getList(condition)),
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
      this.activeList.save(this.user).subscribe(res => { this.isEdit=false;this.userCondition.next()});
    }
    if (this.type === "add") {
      this.activeList.add(this.user).subscribe(res => { this.isEdit=false;this.userCondition.next()});

    }
  }

  delUser(id: number) {
    this.activeList.del(id).subscribe(res => { });
  }
}
