import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActiveListDetailService } from './ActiveListDetail.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';
import { ActiveListService } from '../activeList/activeList.service';


@Component({
  selector: 'ngx-user',
  templateUrl: './activeListDetail.component.html'
})
export class ActiveListDetailComponent implements OnInit {

  constructor(private agentService: ActiveListDetailService,
    private activeListService: ActiveListService) { }
  settings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      listId: {
        title: '活动列表',
        type: 'string',
      },
      value: {
        title: '值',
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
    pager: {
      perPage: 10
    },
    hideSubHeader: true
  }
  isEdit: boolean = false;
  user: any = {};
  type: string;
  agentSource: ServerDataSource;
  activeList: Array<any>;
  desen_rule_id: any = []
  ngOnInit() {
    this.agentSource = this.agentService.getList();
    this.activeListService.getList().subscribe(
      list => this.activeList = list
    )
  }

  showNew() {
    this.type = "add";
    this.user = { desen_rule_id: [] };
    this.isEdit = true;
  }
  showEdit($event) {
    this.type = "edit";
    this.agentService.getAgent($event.data.id).subscribe(
      data => this.user = data
    )
    this.isEdit = true;
  }

  saveUser() {

    if (this.type === "edit") {
      this.agentService.save(this.user).subscribe(res => { this.isEdit = false; this.agentSource.refresh(); });
    }
    if (this.type === "add") {
      this.agentService.add(this.user).subscribe(res => { this.isEdit = false; this.agentSource.refresh(); });

    }
  }

  delUser($event) {
        this.agentService.del($event.data.id).subscribe(
          res => {
            this.agentSource.refresh();
    });
  }

  changeActive(event) {
    this.user.listId = event;
  }
}
