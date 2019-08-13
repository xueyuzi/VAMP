import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActiveListService } from './activeList.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActionComponent } from "./activeListAction/activeListAction.component";
@Component({
  selector: 'ngx-user',
  templateUrl: './activeList.component.html'
})
export class ActiveListComponent implements OnInit {

  constructor(private activeListService: ActiveListService,
    private router: Router) { }
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
      },
      action: {
        title: "操作",
        type: "custom",
        renderComponent: ActionComponent,
        width: "200px"
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      columnTitle: "操作",
      position: "right"
    },
  }
  isEdit: boolean = false;
  isInport: boolean = false;
  active: any = {};
  type: string;
  activeList: Observable<any>;
  ngOnInit() {
    this.activeListService.getList().subscribe();
    this.activeList = this.activeListService.activeList;
  }
  showNew() {
    this.type = "add";
    this.active = {};
    this.isEdit = true;
  }
  showEdit($event) {
    this.type = "edit";
    this.active = $event.data;
    this.isEdit = true;
  }


  save() {
    if (this.type === "edit") {
      this.activeListService.save(this.active).subscribe(res => { this.isEdit = false; });
    }
    if (this.type === "add") {
      this.activeListService.add(this.active).subscribe(res => { this.isEdit = false; });

    }
  }
}
