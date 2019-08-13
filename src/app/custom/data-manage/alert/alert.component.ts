import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AlertService } from './alert.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';
import {JsonEditorService} from "../../../common/json-editor.service";

@Component({
  selector: 'ngx-user',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {

  constructor(private agentService: AlertService,
              private jsonEditorService: JsonEditorService) { }
  settings = {
    columns: {
      title: {
        title: '标题',
        type: 'string',
        width:'60%',
      },
      owner: {
        title: '所有者',
        type: 'string',
        width:'20%',
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
  }

  showNew() {
    this.user = {};
    this.type = "add";
    this.isEdit = true;
    this.setEditor();
  }
  showEdit($event) {
    this.type = "edit";
    this.agentService.getAgent($event.data.id).subscribe(
      data => this.user = data
    )
    this.isEdit = true;
    this.setEditor();
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

  setEditor() {
    setTimeout(() => {
      this.jsonEditorService.createEditor("agent-json-editor");
      this.jsonEditorService.setValue(this.user.trigger_es_json);
    }, 500)
  }
}
